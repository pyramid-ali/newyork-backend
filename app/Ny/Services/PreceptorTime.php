<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/20/17
 * Time: 1:56 AM
 */

namespace App\Ny\Services;


use App\Employee;
use Carbon\Carbon;

class PreceptorTime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        $startTime = Carbon::parse($job['start_datetime']);
        $endTime = Carbon::parse($job['end_datetime']);
        $minutes = $endTime->diffInMinutes($startTime);
        $hours = $endTime->diffInHours($startTime);

        $divider = 1.5;
        if ($employee->employee_type === 'pdm') {
            $divider = 1;
        }

        $exactHour = $hours + ($minutes - ($hours * 60)) / 60;

        return ['reg_hours' => $exactHour / $divider];
    }
}