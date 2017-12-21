<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/20/17
 * Time: 2:02 AM
 */

namespace App\Ny\Services;


use App\Employee;

interface ServiceWorker
{
    public function work ($job, Employee $employee);
}