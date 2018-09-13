<?php


namespace App\Ny\Services;


use App\Employee;
use App\Ny\Work;
use Carbon\Carbon;

class HolidayTime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        return new Work('hol', $employee->tehd);
    }

    public function serviceCodeUnits($job, Employee $employee)
    {
        return 0;
    }
}