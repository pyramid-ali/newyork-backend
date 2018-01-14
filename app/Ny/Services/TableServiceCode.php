<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/21/17
 * Time: 2:50 PM
 */

namespace App\Ny\Services;


use App\Employee;
use App\ServiceCode;

class TableServiceCode implements ServiceWorker
{

    public function work($job, Employee $employee)
    {

        $code = explode(' ', $job['service_code'])[0];
        $serviceCode = ServiceCode::where('name', 'like', $code.'%')->first();

        $rate = $employee->rate($serviceCode);
        $unit = $serviceCode->unit;
        if ($employee->employee_type === 'pdm') {
            $unit = 1;
        }

        return [
            'temp_rate' => [
                'rate' => $rate,
                'unit' => $unit
            ]
        ];
    }
}