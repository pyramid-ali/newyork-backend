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

class CaseConference implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        return new Work('reg_hours', 1);
//        return ['reg_hours' => 1];
    }
}