<?php


namespace App\Ny\Services;


use App\Employee;
use Carbon\Carbon;

class HolidayTime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        return ['hol' => $employee->tehd];
    }
}