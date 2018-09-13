<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Services\Helpers\WorkHour;
use App\Ny\Work;

class PreceptorTime implements ServiceWorker
{
    use WorkHour;

    public function work($job, Employee $employee)
    {
        return new Work('reg_hours', $this->calculateWork($job, $employee));
    }


    public function serviceCodeUnits($job, Employee $employee)
    {
        return $this->calculateWork($job, $employee);
    }

    private function calculateWork($job, Employee $employee)
    {
        $exactHour = $this->exactWorkTime($job);
        return $employee->employee_type === 'pdm' ? $exactHour : $exactHour / 1.5;
    }
}