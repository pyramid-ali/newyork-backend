<?php

namespace App\Ny\Services;


use App\Employee;
use Carbon\Carbon;

class WorkTime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {

        $startTime = Carbon::parse($job['start_datetime']);
        $endTime = Carbon::parse($job['end_datetime']);
        $minutes = $endTime->diffInMinutes($startTime);
        $hours = $endTime->diffInHours($startTime);
        $exactHour = $hours + ($minutes - ($hours * 60)) / 60;

        return ['reg_hours' => $exactHour * 0.75];
    }
}