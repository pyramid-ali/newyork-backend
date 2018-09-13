<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Services\Helpers\WorkHour;
use App\Ny\Work;

class Overtime implements ServiceWorker
{
    use WorkHour;

    public function work($job, Employee $employee)
    {
        return new Work('ot_hours', $this->exactWorkTime($job));
    }

    public function serviceCodeUnits($job, Employee $employee)
    {
        return 0;
    }
}