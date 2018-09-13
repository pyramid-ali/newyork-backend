<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Services\Helpers\WorkHour;
use App\Ny\Work;

class OrientationTime implements ServiceWorker
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

    /**
     * @param $job
     * @param Employee $employee
     * @return float
     */
    private function calculateWork($job, Employee $employee)
    {
        $exactWorkTime = $this->exactWorkTime($job);
        return $employee->employee_type === 'pdm' ? $exactWorkTime : $exactWorkTime / 1.5;
    }
}