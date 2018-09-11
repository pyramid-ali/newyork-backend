<?php

namespace App\Jobs;

use App\Events\PayrollError;
use App\Ny\Addons\AdjustDedAmount;
use App\Ny\Addons\Miscellaneous;
use App\Ny\Exporter\InterimExporter;
use App\Ny\Modifiers\FullTimeRegularHour;
use App\Ny\Modifiers\FullTimeThreshold;
use App\Ny\Modifiers\MetroCard;
use App\Ny\Modifiers\ResetAex;
use App\Ny\PayrollReader;
use App\Ny\ServiceCodeManager;
use App\Ny\WorkContainer;
use App\User;
use Exception;
use App\Company;
use App\Employee;
use App\Events\PayrollProcessed;
use App\Ny\Exporter\EpicExporter;
use App\Ny\Services\ServiceWorker;
use App\Payroll;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class PayrollProcess implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $file;
    private $company;
    private $epicExporter;
    private $payroll;
    private $user;
    private $interimExporter;

    private $addons = [
        AdjustDedAmount::class
    ];

    private $modifiers = [
        FullTimeRegularHour::class,
        FullTimeThreshold::class
    ];

    /**
     * Create a new job instance.
     *
     * @param Company $company
     * @param Payroll $payroll
     * @param User $user
     * @param $miscellaneous boolean
     */
    public function __construct(Company $company, Payroll $payroll, User $user, $miscellaneous)
    {
        $this->file = 'storage/app/public/' . $payroll->path;
        $this->payroll = $payroll;
        $this->company = $company;
        $this->user = $user;
        $this->epicExporter = new EpicExporter();
        $this->interimExporter = new InterimExporter();


        if ($miscellaneous) {
            $this->addons[] = Miscellaneous::class;
            $this->modifiers[] = MetroCard::class;
        }
        else {
            $this->modifiers[] = ResetAex::class;
        }
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $rows = PayrollReader::read($this->file)
            ->groupByColumns('empid')
            ->get();

        $this->processEmployees($rows);
    }

    /**
     * @param $id
     * @return Employee
     */
    private function retrieveEmployee($id)
    {
        return $this->company->employees()->where('employee_id', $id)->first();
    }

    private function processEmployees($rowGroup)
    {
        foreach ($rowGroup as $employeeId => $rows) {

            $employee = $this->retrieveEmployee($employeeId);
            $works = $this->processAddons(
                $this->processWorks($rows, $employee),
                $rows,
                $employee
            );

            $works = $this->modifyWorks($works, $employee);

            $this->epicExporter->entry($works, $employee);

            $this->interimExporter->entry($employee, $works, $rows);

        }

        $this->epicExporter->store();

        $this->payroll->output_path = 'processed/' . $export . '.csv';
        $this->payroll->processing = false;
        $this->payroll->processed = true;
        $this->payroll->interm_path = 'interim/' . $interim . '.csv';
        $this->payroll->save();

        event(new PayrollProcessed($this->company, $this->payroll, $this->user));
    }

    /**
     * @param $rows
     * @param Employee $employee
     * @return WorkContainer
     */
    private function processWorks($rows, Employee $employee)
    {
        $container = new WorkContainer;
        foreach ($rows as $row) {
            $container->addWork(
                $this->processWork($row, $employee)
            );
        }

        return $container;
    }

    /**
     * @param $row
     * @param Employee $employee
     * @return \App\Ny\Work
     */
    private function processWork($row, Employee $employee)
    {
        $serviceWorker = (new ServiceCodeManager($row->get('service_code')))
            ->getServiceWorker($employee->employee_type !== 'ft_office');

        if ($serviceWorker instanceof ServiceWorker) {
            return $serviceWorker->work($row, $employee);
        }

    }

    /**
     * @param WorkContainer $workContainer
     * @param $rows
     * @param Employee $employee
     * @return WorkContainer
     */
    private function processAddons(WorkContainer $workContainer, $rows, Employee $employee)
    {
        foreach ($this->addons as $addonClass) {
            $addon = new $addonClass;

            if (!$addon->isRequire()) {
                continue;
            }

            $workContainer->addWork(
                $addon->handle($rows, $employee)
            );

        }

        return $workContainer;
    }

    /**
     * @param WorkContainer $workContainer
     * @param Employee $employee
     * @return WorkContainer
     */
    private function modifyWorks(WorkContainer $workContainer, Employee $employee)
    {
        foreach ($this->modifiers as $modifierClass) {
            $modifier = new $modifierClass;

            if (!$modifier->isRequire()) {
                continue;
            }

            $workContainer->replaceWork(
                $modifier->modify($workContainer, $employee)
            );

        }

        return $workContainer;
    }

    /**
     * @param Exception $exception
     */
    public function failed(Exception $exception)
    {
        Log::error($exception);
        $this->payroll->error = $exception->getMessage();
        $this->payroll->save();
        event(new PayrollError($this->user, $this->payroll));
    }

}
