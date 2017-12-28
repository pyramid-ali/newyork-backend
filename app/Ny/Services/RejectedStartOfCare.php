<?php

namespace App\Ny\Services;

use App\Employee;

class RejectedStartOfCare implements ServiceWorker
{

    public function work($job, Employee $employee)
    {

        return ['reg_hours' => 1];
    }
}