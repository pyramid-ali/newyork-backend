<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/20/17
 * Time: 1:55 AM
 */

namespace App\Ny\Services;


use App\Employee;

class CaseConference implements ServiceWorker
{

    public function work($job, Employee $employee)
    {
        return ['reg_hours' => 1];
    }
}