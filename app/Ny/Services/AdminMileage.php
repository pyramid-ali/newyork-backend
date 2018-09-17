<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/20/17
 * Time: 1:57 AM
 */

namespace App\Ny\Services;


use App\Employee;
use App\Ny\Work;

class AdminMileage implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        return new Work('aex',
            $job['mileage_entry'] * $employee->reimbursement_rate);
    }

    public function serviceCodeUnits($job, Employee $employee)
    {
        return 0;
    }
}