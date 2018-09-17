<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Work;

class MileageShowUpVisitOrOfficeStop implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        $mileage = $job['mileage_entry'];
        $multiplier = $employee->reimbursement_rate;
        return new Work('aex', $mileage * $multiplier);
    }


    public function serviceCodeUnits($job, Employee $employee)
    {
        return 0;
    }
}