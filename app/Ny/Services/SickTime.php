<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Services\Helpers\WorkHour;
use App\Ny\Work;

class SickTime implements ServiceWorker
{
    use WorkHour;

    public function work($job, Employee $employee)
    {
        return new Work('sic', $this->exactWorkTime($job));
    }


    public function serviceCodeUnits($job, Employee $employee)
    {
        return 0;
    }
}