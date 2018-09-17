<?php

namespace App\Ny\Logger;

use Alish\GoogleDistanceMatrix\GoogleDistance;
use App\Payroll;

class Logger
{

    private $rowsCount = 0;
    private $employeesCount = 0;
    private $apiCalls = 0;

    /**
     * @param $employeeWorks Collection
     */
    public function logEmployeeWorks($employeeWorks)
    {
        $this->employeesCount = $employeeWorks->count();
        $this->rowsCount = $employeeWorks->flatten()->count();
    }

    /**
     * get api calls number
     */
    private function getApiCall()
    {
        $this->apiCalls = GoogleDistance::$apiCall;
    }

    /**
     * @param Payroll $payroll
     * @return $this
     */
    public function saveLog(Payroll $payroll)
    {
        $this->getApiCall();

        if ($payroll->meta) {
            $payroll->meta()->update([
                'rows' => $this->rowsCount,
                'employees' => $this->employeesCount,
                'api_calls' => $this->apiCalls
            ]);
        } else {
            $payroll->meta()->create([
                'rows' => $this->rowsCount,
                'employees' => $this->employeesCount,
                'api_calls' => $this->apiCalls
            ]);
        }

        return $this;
    }

}