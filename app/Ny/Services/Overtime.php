<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/20/17
 * Time: 1:56 AM
 */

namespace App\Ny\Services;


use App\Employee;
use App\Ny\Work;
use Carbon\Carbon;

class Overtime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        $startTime = Carbon::parse($job['start_datetime']);
        $endTime = Carbon::parse($job['end_datetime']);
        $minutes = $endTime->diffInMinutes($startTime);
        $hours = $endTime->diffInHours($startTime);

        $exactHour = $hours + ($minutes - ($hours * 60)) / 60;
        return new Work('ot_hours', $exactHour);
//        return ['ot_hours' => $exactHour];
    }
}