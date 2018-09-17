<?php

namespace App\Jobs;

use App\Events\PayrollError;
use App\Ny\Addons\Addon;
use App\Ny\Addons\AdjustDedAmount;
use App\Ny\Addons\Miscellaneous;
use App\Ny\Exporter\InterimExporter;
use App\Ny\Logger\Logger;
use App\Ny\Modifiers\FullTimeRegularHour;
use App\Ny\Modifiers\FullTimeThreshold;
use App\Ny\Modifiers\MetroCard;
use App\Ny\Modifiers\Modifier;
use App\Ny\Modifiers\ResetAex;
use App\Ny\PayrollReader;
use App\Ny\ServiceCodeManager;
use App\Ny\WorkContainer;
use App\User;
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

class PayrollProcess implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $path;
    private $company;
    private $epicExporter;
    private $payroll;
    private $user;
    private $interimExporter;
    private $logger;

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
        $this->path = storage_path('app/public/' . $payroll->path);
        $this->payroll = $payroll;
        $this->company = $company;
        $this->user = $user;
        $this->epicExporter = new EpicExporter();
        $this->interimExporter = new InterimExporter();
        $this->logger = new Logger();

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
        $rows = PayrollReader::read($this->path)
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

    /**
     * @param $rowGroup
     */
    private function processEmployees($rowGroup)
    {
        $this->logger->logEmployeeWorks($rowGroup);

        foreach ($rowGroup as $employeeId => $rows) {

            $employee = $this->retrieveEmployee($employeeId);
            $works = $this->processAddons(
                $this->processWorks($rows, $employee),
                $rows,
                $employee
            );

            $works = $this->modifyWorks($works, $employee);

            $this->epicExporter->entry($works, $employee);
            $this->interimExporter->entry($rows, $works, $employee);
        }



        $this->didPayrollProcessed();
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

            /** @var Addon $addon */
            if (!$addon->isRequire($employee)) {
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

            /** @var Modifier $modifier */
            if (!$modifier->isRequire($employee)) {
                continue;
            }

            $workContainer->replaceWork(
                $modifier->modify($workContainer, $employee)
            );

        }

        return $workContainer;
    }

    /**
     * store
     */
    private function store()
    {

        $this->epicExporter->store();
        $this->interimExporter->store();

        $this->payroll->saveProcessedPayroll($this->epicExporter->storePath() , $this->interimExporter->storePath());
    }

    private function didPayrollProcessed()
    {
        $this->store();
        event(new PayrollProcessed($this->company, $this->payroll, $this->user));
        $this->logger->saveLog($this->payroll);
    }

    /**
     * @param Exception $exception
     */
    public function failed(\Exception $exception)
    {
        $this->payroll->failedToProcessPayroll($exception->getMessage());
        event(new PayrollError($this->user, $this->payroll));
    }



}
