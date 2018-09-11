<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/20/17
 * Time: 2:02 AM
 */

namespace App\Ny\Services;


use App\Employee;
use App\Ny\Work;

interface ServiceWorker
{
    /**
     * @param $job
     * @param Employee $employee
     * @return Work
     */
    public function work ($job, Employee $employee);
}