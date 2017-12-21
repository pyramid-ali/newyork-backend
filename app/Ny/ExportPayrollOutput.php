<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/21/17
 * Time: 5:01 PM
 */

namespace App\Ny;


use App\Employee;

class ExportPayrollOutput
{

    private $header = [
        0 => 'Co Code',
        1 => 'Batch ID',
        2 => 'File #',
        3 => 'Pay #',
        4 => 'Tax Frequency',
        5 => 'Temp Dept',
        6 => 'Temp Rate',
        7 => 'Reg Amount',
        8 => 'Amount 4 Code',
        9 => 'Amount 4 Amount',
        10 => 'O/T Amount',
        11 => 'Amount 3 Code',
        12 => 'Amount 3 Amount',
        13 => 'Amount 3 Code',
        14 => 'Amount 3 Amount',
        15 => 'Amount 3 Code',
        16 => 'Amount 3 Amount',
        17 => 'Amount 3 Code',
        18 => 'Amount 3 Amount',
        19 => 'Adjust Ded Code',
        20 => 'Adjust Ded Amount',
        21 => 'Earnings 3 Code',
        22 => 'Earnings 3 Amount',
        23 => 'Earnings 3 Code',
        24 => 'Earnings 3 Amount',
    ];

    public $rows;

    public function __construct()
    {
        $rows = collect();
    }

    public function entry(Employee $employee, $processedWorks)
    {

        // calculate employees that have reg Amount
        if ($processedWorks->get('reg_hours')) {

        }

        if ($tempRates = $processedWorks->get('temp_rate')) {
            foreach ($tempRates as $tempRate) {

            }
        }

    }

    private function regHourRow(Employee $employee, $processedWorks)
    {
        $row[0] = $this->companyCode($employee);
        $row[1] = $this->batchId($employee);
        $row[2] = $this->fileNumber($employee);
        $row[3] = $this->pay();
        $row[4] = $this->taxFrequency();
        $row[5] = $this->tempDepartment($employee);
        $row[6] = null;
        $row[7] = $this->regAmount($processedWorks);
        $row[8] = null;
        $row[9] = null;
        $row[10] = $this->otAmount($processedWorks);
        $row[11] = $this->vacationCode($processedWorks);
        $row[12] = $this->vacationAmount($processedWorks);
        $row[13] = $this->sickTimeCode($processedWorks);
        $row[14] = $this->sickTimeAmount($processedWorks);
        $row[15] = $this->personalCode($processedWorks);
        $row[16] = $this->personalAmount($processedWorks);
        $row[17] = $this->holidayCode($processedWorks);
        $row[18] = $this->holidayAmount($processedWorks);
        $row[19] = $this->adjustDedCode($processedWorks);
        $row[20] = $this->adjustDedAmount($processedWorks);
        $row[21] = $this->celCode($processedWorks);
        $row[22] = $this->celAmount($processedWorks);
        $row[23] = $this->onCallCode($processedWorks);
        $row[24] = $this->onCallAmount($processedWorks);

        return $row;
    }

    private function tempRateHour()
    {
        
    }

    private function companyCode(Employee $employee)
    {
        return $employee->company->code;
    }

    private function batchId(Employee $employee)
    {
        return $employee->office->batch_id;
    }

    private function fileNumber(Employee $employee)
    {
        return $employee->employee_id;
    }

    private function pay()
    {
        return 1;
    }

    private function taxFrequency()
    {
        return null;
    }

    private function tempDepartment(Employee $employee)
    {
        return $employee->temp_department;
    }

    private function regAmount($processedWorks)
    {
        return $processedWorks->get('reg_Amount');
    }

    private function otAmount($processedWorks)
    {
        return $processedWorks->get('ot_Amount');
    }

    private function vacationCode($processedWorks)
    {
        return $this->vacationAmount($processedWorks) ? 'PTO' : null;
    }

    private function vacationAmount($processedWorks)
    {
        return $processedWorks->get('pto');
    }

    private function sickTimeCode($processedWorks)
    {
        return $this->sickTimeAmount($processedWorks) ? 'SIC' : null;
    }

    private function sickTimeAmount($processedWorks)
    {
        return $processedWorks->get('sic');
    }

    private function personalCode($processedWorks)
    {
        return $this->personalAmount($processedWorks) ? 'PER' : null;
    }

    private function personalAmount($processedWorks)
    {
        return $processedWorks->get('per');
    }


    private function holidayCode($processedWorks)
    {
        return $this->holidayAmount($processedWorks) ? 'HOL' : null;
    }

    private function holidayAmount($processedWorks)
    {
        return $processedWorks->get('hol');
    }

    private function adjustDedCode($processedWorks)
    {
        return $this->adjustDedAmount($processedWorks) ? 'AEX' : null;
    }

    private function adjustDedAmount($processedWorks)
    {
        return $processedWorks->get('ded');
    }

    private function celCode($processedWorks)
    {
        return $this->celAmount($processedWorks) ? 'CEL' : null;
    }

    private function celAmount($processedWorks)
    {
        return $processedWorks->get('cel');
    }

    private function onCallCode($processedWorks)
    {
        return $this->onCallAmount($processedWorks) ? 'ONC' : null;
    }

    private function onCallAmount($processedWorks)
    {
        return $processedWorks->get('onc');
    }

}