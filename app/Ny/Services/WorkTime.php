<?php

namespace App\Ny\Services;

use App\Employee;
use App\Ny\Services\Helpers\WorkHour;
use App\Ny\Work;

class WorkTime implements ServiceWorker
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
     * @return float|int|mixed
     */
    private function calculateWork($job, Employee $employee)
    {
        $exactHour = $this->exactWorkTime($job);

        if ($employee->employee_type === 'ft_office' && $exactHour > $employee->tehd) {
            $exactHour = $employee->tehd;
        }

        return $employee->employee_type === 'ft_patient' ? $exactHour * 0.75 : $exactHour;
    }
}