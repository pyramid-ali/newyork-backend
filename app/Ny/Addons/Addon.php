<?php

namespace App\Ny\Addons;

use App\Employee;
use App\Ny\Work;

interface Addon
{
    /**
     * @param $works
     * @param Employee $employee
     * @return Work
     */
    public function handle ($works, Employee $employee);

    /**
     * @param Employee $employee
     * @return bool
     */
    public function isRequire(Employee $employee);
}