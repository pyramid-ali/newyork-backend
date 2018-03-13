<?php

namespace App\Ny\Services;


use App\Employee;
use Carbon\Carbon;

class WorkTime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {

        if ($employee->employee_type === 'ft_office') {
            return ['reg_hours' => 8];
        }

        $startTime = Carbon::parse($job['start_datetime']);
        $endTime = Carbon::parse($job['end_datetime']);
        $minutes = $endTime->diffInMinutes($startTime);
        $hours = $endTime->diffInHours($startTime);
        $exactHour = $hours + ($minutes - ($hours * 60)) / 60;

        $multiplier = 0.75;
        if ($employee->employee_type === 'pdm') {
            $multiplier = 1;
        }

        return ['reg_hours' => $exactHour * $multiplier];
    }
}