<?php

namespace App\Ny\Services;


use App\Employee;
use Carbon\Carbon;

class OfficeTime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        $startTime = Carbon::parse($job['start_datetime']);
        $endTime = Carbon::parse($job['end_datetime']);
        $minutes = $endTime->diffInMinutes($startTime);
        $hours = $endTime->diffInHours($startTime);

        $divider = 1.3;
        if ($employee->employee_type === 'pdm') {
            $divider = 1;
        }

        $exactHours = $hours + ($minutes - ($hours * 60)) / 60;

        return ['reg_hours' => $exactHours / $divider];
    }
}