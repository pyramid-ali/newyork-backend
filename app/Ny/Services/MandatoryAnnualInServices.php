<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/21/17
 * Time: 2:22 PM
 */

namespace App\Ny\Services;


use App\Employee;
use App\Ny\Work;
use Carbon\Carbon;

class MandatoryAnnualInServices implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        $startTime = Carbon::parse($job['start_datetime']);
        $endTime = Carbon::parse($job['end_datetime']);
        $minutes = $endTime->diffInMinutes($startTime);
        $hours = $endTime->diffInHours($startTime);

        $exactHour = $hours + ($minutes - ($hours * 60)) / 60;

        return new Work('reg_hours', $exactHour / 1.5);
//        return ['reg_hours' => $exactHour / 1.5];
    }
}