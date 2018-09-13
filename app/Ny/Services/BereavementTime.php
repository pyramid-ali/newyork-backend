<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Services\Helpers\WorkHour;
use App\Ny\Work;
use Carbon\Carbon;

class BereavementTime implements ServiceWorker
{
    use WorkHour;

    public function work($job, Employee $employee)
    {
        return new Work('bvt', $this->workHours($job));
    }

    public function serviceCodeUnits($job, Employee $employee)
    {
        return 0;
    }
}