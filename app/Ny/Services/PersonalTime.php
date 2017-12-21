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
        $hours = $endTime->diffInHours($startTime);
        return ['per' => $hours > 4 ? 8 : 4];
    }
}