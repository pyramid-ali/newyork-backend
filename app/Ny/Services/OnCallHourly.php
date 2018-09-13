<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Services\Helpers\WorkHour;
use App\Ny\Work;

class OnCallHourly implements ServiceWorker
{
    use WorkHour;

    public function work($job, Employee $employee)
    {
        return new Work('onc', ceil($this->exactWorkTime($job)) * 35);
    }

    public function serviceCodeUnits($job, Employee $employee)
    {
        return 0;
    }
}