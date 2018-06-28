<?php

namespace App\Ny\Services;


use App\Employee;
use Carbon\Carbon;

class PersonalTime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        $startTime = Carbon::parse($job['start_datetime']);
        $endTime = Carbon::parse($job['end_datetime']);
        $minutes = $endTime->diffInMinutes($startTime);
        $hours = $endTime->diffInHours($startTime);
        $exactHours = $hours + ($minutes - ($hours * 60)) / 60;
//        $per = (floor($hours / $employee->tehd) + 1) * $employee->tehd / 2;
        return ['per' => $exactHours];
    }
}