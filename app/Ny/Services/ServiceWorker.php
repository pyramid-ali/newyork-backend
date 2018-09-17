<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Work;

interface ServiceWorker
{
    /**
     * @param $job
     * @param Employee $employee
     * @return Work
     */
    public function work ($job, Employee $employee);

    public function serviceCodeUnits($job, Employee $employee);

}