<?php

namespace App\Ny\Addons;

use Alish\GoogleDistanceMatrix\Facades\GoogleDistance;
use Illuminate\Support\Collection;
use Carbon\Carbon;
use App\Employee;
use App\Ny\Work;

class Miscellaneous implements Addon
{
    public function handle($works, Employee $employee)
    {
        return new Work('cel', $employee->cel);
    }

    public function isRequire(Employee $employee)
    {
        return true;
    }

}