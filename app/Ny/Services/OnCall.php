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

class OnCall implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        $startTime = Carbon::parse($job['start_datetime']);
        $rate = 100;
        if ($startTime->dayOfWeek > 0 && $startTime->dayOfWeek < 5) {
            $rate = 50;
        }

        return ['onc' => $rate];
    }
}