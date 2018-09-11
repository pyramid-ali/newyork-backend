<?php

namespace App\Ny\Modifiers;

use App\Employee;
use App\Ny\Work;
use App\Ny\WorkContainer;

interface Modifier
{
    /**
     * @param WorkContainer $workContainer
     * @param Employee $employee
     * @return Work
     */
    public function modify(WorkContainer $workContainer, Employee $employee);

    /**
     * @param Employee $employee
     * @return bool
     */
    public function isRequire(Employee $employee);
}