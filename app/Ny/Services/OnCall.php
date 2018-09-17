<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Services\Helpers\WorkHour;
use App\Ny\Work;


class OnCall implements ServiceWorker
{

    use WorkHour;

    public function work($job, Employee $employee)
    {
        $startTime = $this->startTime($job);
        $rate = ($startTime->dayOfWeek > 0 && $startTime->dayOfWeek < 5) ? 50 : 100;

        return new Work('onc', $rate);
    }

    public function serviceCodeUnits($job, Employee $employee)
    {
        return 0;
    }
}