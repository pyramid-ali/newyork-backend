<?php

namespace App\Jobs;

use App\Company;
use App\Employee;
use App\Ny\Services\ServiceWorker;
use App\Ny\Services\TableServiceCode;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Maatwebsite\Excel\Facades\Excel;

class PayrollProcess implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $payroll;
    private $company;
    private $serviceWorkersNamespace = 'App\Ny\Services\\';

    /**
     * Create a new job instance.
     *
     * @param $payroll
     */
    public function __construct($payroll, Company $company)
    {
        $this->payroll = base64_decode($payroll);
        $this->company = $company;
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
        $rows = Excel::load($this->payroll)->get();
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
            dd($processedWorks);
        }
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
                    $prop->push($value);
                    $cloned->put($key, $prop);
                }
                else {
                    $cloned->put($key, $prop + $value);
                }
            }
            else {
                if(is_array($value)) {
                    $cloned->put($key, collect([$value]));
                }
                else {
                    $cloned->put($key, $value);
                }
            }
        }

        return $cloned;
    }


}
