<?php

namespace App\Ny;


use App\Employee;
use Maatwebsite\Excel\Facades\Excel;

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
        $this->rows = collect();
        $this->rows->push($this->header);
    }

    public function entry(Employee $employee, $processedWorks)
    {

        // calculate employees that have reg Amount
        if ($processedWorks->get('reg_hours')) {
            $this->rows->push(
                $this->regHourRow($employee, $processedWorks)
            );
        }

        if ($tempRates = $processedWorks->get('temp_rate')) {
            foreach ($tempRates as $tempRate) {
                $row = $this->tempRateHour($employee, $tempRate);
                if ($row) {
                    $this->rows->push($row);
                }

            }
        }
    }

    public function export()
    {
        $name = uniqid();
        $csv = Excel::create($name, function($excel) {

            // Set the title
            $excel->setTitle('Payroll Grid')
                ->setCreator('calcuride.net')
                ->setDescription('Payroll proccessed');

            $excel->sheet('employees', function($sheet) {

                $sheet->fromArray($this->rows->toArray(), null, 'A1', false, false);

            });

        })->store('csv', storage_path('app/public/processed'), true);

        return $name;
    }

    private function regHourRow(Employee $employee, $processedWorks)
    {
        $row = array_fill(0, 25, null);

        $row[0] = $this->companyCode($employee);
        $row[1] = $this->batchId($employee);
        $row[2] = $this->fileNumber($employee);
        $row[3] = $this->pay();
        $row[4] = $this->taxFrequency();
        $row[5] = $this->tempDepartment($employee);

        if ($employee->employee_type === 'pdm') {
            $row[6] = $this->employeeRate($employee);
        }


        $row[7] = $this->regAmount($processedWorks);
        $row[10] = $this->otAmount($processedWorks);
        $row[11] = $this->vacationCode($processedWorks);
        $row[12] = $this->vacationAmount($processedWorks);
        $row[13] = $this->sickTimeCode($processedWorks);
        $row[14] = $this->sickTimeAmount($processedWorks);
        $row[15] = $this->personalCode($processedWorks);
        $row[16] = $this->personalAmount($processedWorks);
        $row[17] = $this->holidayCode($processedWorks);
        $row[18] = $this->holidayAmount($processedWorks);
        $row[19] = $this->bereavementCode($processedWorks);
        $row[20] = $this->bereavementAmount($processedWorks);
        $row[21] = $this->adjustDedCode($processedWorks);
        $row[22] = $this->adjustDedAmount($processedWorks);
        $row[23] = $this->celCode($processedWorks);
        $row[24] = $this->celAmount($processedWorks);
        $row[25] = $this->onCallCode($processedWorks);
        $row[26] = $this->onCallAmount($processedWorks);

        return $row;
    }

    private function tempRateHour(Employee $employee, $tempHour)
    {
        if ($tempHour['unit'] && $tempHour['rate']) {
            $row = array_fill(0, 25, null);
            $row[0] = $this->companyCode($employee);
            $row[1] = $this->batchId($employee);
            $row[2] = $this->fileNumber($employee);
            $row[3] = $this->pay();
            $row[4] = $this->taxFrequency();
            $row[5] = $this->tempDepartment($employee);
            $row[6] = $tempHour['rate'];
            $row[8] = $this->perDiem();
            $row[9] = round($tempHour['unit'], 2);

            return $row;
        }

        return null;

    }

    private function perDiem()
    {
        return 'PDM';
    }

    private function employeeRate($employee)
    {
        return $employee->rate;
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
        return $processedWorks->get('reg_hours');
    }

    private function otAmount($processedWorks)
    {
        return $processedWorks->get('ot_hours');
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
        $amount = $processedWorks->get('aex', null);
        if ($amount) {
            return -$amount;
        }

        return null;
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

    private function bereavementCode($processedWorks)
    {
        return $this->bereavementAmount($processedWorks) ? 'BVT' : null;
    }

    private function bereavementAmount($processedWorks)
    {
        return $processedWorks->get('bvt');
    }

}