<?php

namespace App\Jobs;

use App\Events\PayrollError;
use App\Ny\ExportInterim;
use App\User;
use Exception;
use App\Company;
use App\Employee;
use App\Events\PayrollProcessed;
use App\Ny\ExportPayrollOutput;
use App\Ny\FullTimePatientModifier;
use App\Ny\Services\ServiceWorker;
use App\Ny\Services\TableServiceCode;
use App\Payroll;
use Carbon\Carbon;
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
    private $miscellaneous;
    private $serviceWorkersNamespace = 'App\Ny\Services\\';
    private $exporter;
    private $payroll;
    private $user;
    private $interimExporter;

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
        $this->miscellaneous = $miscellaneous;
        $this->user = $user;
        $this->exporter = new ExportPayrollOutput();
        $this->interimExporter = new ExportInterim();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $rows = $this->getRows()->groupBy(function ($item, $key) {
            return (string) $item['empid'];
        });
        $this->processEmployees($rows);
    }

    private function getRows()
    {
        $rows = Excel::load($this->file)->get();
        return $this->modifyRows($rows);
    }

    private function modifyRows($rows)
    {
        return $rows;
    }

    private function serviceWorker($serviceCode)
    {
        $escaped = preg_replace('/[!@#$%^&*(),.]/', ' ', $serviceCode);
        $serviceClassName = studly_case($escaped);
        return $this->serviceWorkersNamespace . $serviceClassName;
    }

    private function processEmployees($rows)
    {
        foreach ($rows as $employeeId => $works) {

            $employee = Employee::where('employee_id', $employeeId)->first();
            $processedWorks = $this->processEmployeeWorks($works, $employee);
            $processedWorks = $this->sumTempRates($processedWorks);

            // interim exporter should calculate before modifying ft_patient
            $this->interimExporter->entry($employee, $processedWorks, $works);

            if ($employee->employee_type === 'ft_patient') {
                $modifier = new FullTimePatientModifier($processedWorks, $works, $employee);
                $processedWorks = $modifier->modify();
            }

            if ($this->miscellaneous) {
                $processedWork = $this->includeMiscellaneous($employee);
                $processedWorks = $this->sumUp($processedWorks, $processedWork);
            }

            // export epic file should be done after modifying fulltime patient
            $this->exporter->entry($employee, $processedWorks);

        }

        $export = $this->exporter->export();
        $interim = $this->interimExporter->export();
        $this->payroll->output_path = 'processed/' . $export . '.csv';
        $this->payroll->processing = false;
        $this->payroll->processed = true;
        $this->payroll->interm_path = 'interim/' . $interim . '.csv';
        $this->payroll->save();

        event(new PayrollProcessed($this->company, $this->payroll, $this->user));
    }

    private function processEmployeeWorks($works, Employee $employee)
    {
        $processedWorks = collect();
        foreach ($works as $work) {
            $processedWork = $this->processWork($work, $employee);

            $processedWorks = $this->sumUp($processedWorks, $processedWork);
        }
        return $processedWorks;
    }

    private function processWork($work, $employee)
    {
        $serviceCode = $work['service_code'];
        $serviceWorker = $this->serviceWorker($serviceCode);
        if (!class_exists($serviceWorker)) {
            $serviceWorker = TableServiceCode::class;
        }

        $instance = new $serviceWorker;
        if ($instance instanceof ServiceWorker) {
            return $instance->work($work, $employee);
        }

    }

    public function sumUp($processedWorks, $newProcessedWork)
    {
        $cloned = clone $processedWorks;

        foreach ($newProcessedWork as $key => $value) {
            if ($prop = $cloned->get($key)) {

                if(is_array($prop)) {
                    array_push($prop, $value);
                    $cloned->put($key, $prop);
                }
                else {
                    $cloned->put($key, $prop + $value);
                }
            }
            else {
                if(is_array($value)) {
                    $cloned->put($key, [$value]);
                }
                else {
                    $cloned->put($key, $value);
                }
            }
        }

        return $cloned;
    }

    public function sumTempRates($processedWorks)
    {
        if (!$processedWorks->has('temp_rate')) {
            return $processedWorks;
        }

        $result = array();
        $tempRates = $processedWorks->get('temp_rate');
        foreach ($tempRates as $tempRate) {
            $rate = $tempRate['rate'];
            if(isset($result[$rate])) {
                $result[$rate] += $tempRate['unit'];
            }
            else {
                $result[$rate] = $tempRate['unit'];
            }
        }

        $temps = collect();
        foreach ($result as $rate => $unit) {
            $temps->push(['rate' => $rate, 'unit' => $unit]);
        }

        $processedWorks->put('temp_rate', $temps->toArray());
        return $processedWorks;

    }

    public function includeMiscellaneous(Employee $employee)
    {
        return ['cel' => $employee->cel];
    }

    public function failed(Exception $exception)
    {
        Log::error($exception);
        $this->payroll->error = $exception->getMessage();
        $this->payroll->save();
        event(new PayrollError($this->user, $this->payroll));
    }

}
