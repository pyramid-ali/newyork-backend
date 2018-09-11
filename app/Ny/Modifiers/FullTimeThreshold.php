<?php

namespace App\Ny\Modifiers;

use App\Employee;
use App\Ny\TempRateWork;
use App\Ny\Work;
use App\Ny\WorkContainer;

class FullTimeThreshold implements Modifier
{

    /**
     * @param WorkContainer $workContainer
     * @param Employee $employee
     * @return Work
     */
    public function modify(WorkContainer $workContainer, Employee $employee)
    {

        $threshold = $this->beyondThreshold($workContainer, $employee);

        return new TempRateWork($threshold > 0 ?
            [
                ['rate' => $employee->rate, 'unit' => $threshold]
            ] :
            [[]]
        );
    }

    public function isRequire(Employee $employee)
    {
        return $employee->employee_type === 'ft_patient';
    }

    /**
     * @param WorkContainer $workContainer
     * @return int|null
     */
    private function calcRegHoursMinus(WorkContainer $workContainer)
    {
        $works = $workContainer->works();

        $minus = optional($works->get('hol')->getValue()) +
            optional($works->get('sic')->getValue()) +
            optional($works->get('per')->getValue()) +
            optional($works->get('bvt')->getValue()) +
            optional($works->get('pto')->getValue());

        return $minus;
    }

    /**
     * @param WorkContainer $workContainer
     * @param Employee $employee
     * @return float|int
     */
    private function beyondThreshold(WorkContainer $workContainer, Employee $employee)
    {
        $works = $workContainer->works();

        $tempRates = optional($works->get('temp_rate'))->getValue();
        $regHours = optional($works->get('reg_hours'))->getValue();

        return $tempRates + $regHours - ($employee->fulltime_threshold * (1 - $this->thresholdMinus($workContainer, $employee)));
    }

    /**
     * @param WorkContainer $workContainer
     * @param Employee $employee
     * @return float
     */
    private function thresholdMinus(WorkContainer $workContainer, Employee $employee)
    {
        return ($this->calcRegHoursMinus($workContainer) / $employee->tehd) * 0.1;
    }
}