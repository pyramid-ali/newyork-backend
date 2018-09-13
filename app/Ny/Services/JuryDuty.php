<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/20/17
 * Time: 1:57 AM
 */

namespace App\Ny\Services;


use App\Employee;
use App\Ny\Services\Helpers\WorkHour;
use App\Ny\Work;
use Carbon\Carbon;

class JuryDuty implements ServiceWorker
{
    use WorkHour;

    public function work($job, Employee $employee)
    {
        return new Work('jur', $this->exactWorkTime($job));
    }

    public function serviceCodeUnits($job, Employee $employee)
    {
        return 0;
    }
}