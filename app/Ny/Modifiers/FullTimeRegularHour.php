<?php

namespace App\Ny\Modifiers;

use App\Employee;
use App\Ny\Work;
use App\Ny\WorkContainer;

class FullTimeRegularHour implements Modifier
{

    /**
     * @param WorkContainer $workContainer
     * @param Employee $employee
     * @return Work
     */
    public function modify(WorkContainer $workContainer, Employee $employee)
    {
        return new Work('reg_hours', $this->regHours($workContainer, $employee));
    }

    public function isRequire(Employee $employee)
    {
        return $employee->employee_type === 'ft_patient';
    }

    private function regHours(WorkContainer $workContainer, Employee $employee)
    {
        return $employee->tehd * 10 - $this->calcRegHoursMinus($workContainer);
    }

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
}