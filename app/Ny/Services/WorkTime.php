<?php

namespace App\Ny\Services;


use App\Employee;

class WorkTime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        return ['reg_hours' => 8];
    }
}