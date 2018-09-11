<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/20/17
 * Time: 1:55 AM
 */

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
//        return ['aex' => $mileage * $multiplier];
    }
}