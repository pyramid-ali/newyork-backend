<?php

namespace App\Ny\Modifiers;

use App\Employee;
use App\Ny\Work;
use App\Ny\WorkContainer;

class MetroCard implements Modifier
{

    /**
     * @param WorkContainer $workContainer
     * @param Employee $employee
     * @return Work
     */
    public function modify(WorkContainer $workContainer, Employee $employee)
    {
        return new Work('aex', $employee->metro_card);
    }

    public function isRequire(Employee $employee)
    {
        return $employee->metro_card;
    }
}
