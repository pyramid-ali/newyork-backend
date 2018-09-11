<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/20/17
 * Time: 1:55 AM
 */

namespace App\Ny\Services;


use App\Employee;
use App\Ny\Work;
use Carbon\Carbon;

class SickTime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        $startTime = Carbon::parse($job['start_datetime']);
        $endTime = Carbon::parse($job['end_datetime']);
        $minutes = $endTime->diffInMinutes($startTime);
        $hours = $endTime->diffInHours($startTime);
        $exactHours = $hours + ($minutes - ($hours * 60)) / 60;
//        $sic = (floor($hours / $employee->tehd) + 1) * $employee->tehd / 2;
        return new Work('sic', $exactHours);
//        return ['sic' => $exactHours];
    }
}