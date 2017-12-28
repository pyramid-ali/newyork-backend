<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/20/17
 * Time: 1:55 AM
 */

namespace App\Ny\Services;


use App\Employee;
use Carbon\Carbon;

class SickTime implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        $startTime = Carbon::parse($job['start_datetime']);
        $endTime = Carbon::parse($job['end_datetime']);
        $hours = $endTime->diffInHours($startTime);
        $sic = (floor($hours / $employee->tehd) + 1) * $employee->tehd / 2;
        return ['sic' => $sic];
    }
}