<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\TempRateWork;
use App\ServiceCode;

class TableServiceCode implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        $serviceCode = $this->serviceCode($job);

        return new TempRateWork([[
            'rate' => $employee->rate($serviceCode),
            'unit' => $this->unit($serviceCode, $employee)
        ]]);

    }

    public function serviceCodeUnits($job, Employee $employee)
    {
//        return $this->unit($this->serviceCode($job), $employee);
        return $this->serviceCode($job)->unit;
    }

    /**
     * @param $job
     * @return ServiceCode
     */
    private function serviceCode($job)
    {
        $code = explode(' ', $job['service_code'])[0];
        return ServiceCode::where('name', 'like', $code.'%')->first();
    }

    /**
     * @param ServiceCode $serviceCode
     * @param Employee $employee
     * @return int|mixed
     */
    private function unit(ServiceCode $serviceCode, Employee $employee)
    {
        return $employee->employee_type === 'pdm' ? 1 : $serviceCode->unit;
    }


}