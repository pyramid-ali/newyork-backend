<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Work;

class RejectedStartOfCare implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        return new Work('reg_hours', 1);
//        return ['reg_hours' => 1];
    }
}