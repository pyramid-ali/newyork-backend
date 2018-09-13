<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Services\Helpers\WorkHour;
use App\Ny\Work;

class MandatoryAnnualInServices implements ServiceWorker
{
    use WorkHour;

    public function work($job, Employee $employee)
    {
        return new Work('reg_hours', $this->exactWorkTime($job) / 1.5);
    }

    public function serviceCodeUnits($job, Employee $employee)
    {
        return $this->exactWorkTime($job) / 1.5;
    }
}