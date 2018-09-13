<?php

namespace App\Ny\Exporter;

use App\Employee;
use App\Ny\WorkContainer;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class EpicExporter extends Base implements FromCollection, WithHeadings
{
    protected $path = 'epics/';

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
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
            19 => 'Amount 3 Code',
            20 => 'Amount 3 Amount',
            21 => 'Adjust Ded Code',
            22 => 'Adjust Ded Amount',
            23 => 'Earnings 3 Code',
            24 => 'Earnings 3 Amount',
            25 => 'Earnings 3 Code',
            26 => 'Earnings 3 Amount',
        ];
    }

    /**
     * @param WorkContainer $workContainer
     * @param Employee $employee
     */
    public function entry(WorkContainer $workContainer, Employee $employee)
    {
        $works = $workContainer->works();

        $row = $this->regHourRow($workContainer, $employee);
        if (!$this->checkEmptyCell($row, 7)) {
            $this->rows->push($row);
        }

        if ($work = $works->get('temp_rate')) {

            $tempRates = $work->rawValue();

            foreach ($tempRates as $tempRate) {
                $row = $this->tempRateHour($employee, $tempRate);
                if ($row) {
                    $this->rows->push($row);
                }
            }
        }
    }

    /**
     * @param $works
     * @param Employee $employee
     * @return array
     */
    private function regHourRow($works, Employee $employee)
    {
        $row = array_fill(0, 25, null);

        $row[0] = $this->companyCode($employee);
        $row[1] = $this->batchId($employee);
        $row[2] = $this->fileNumber($employee);
        $row[3] = $this->pay();
        $row[4] = $this->taxFrequency();
        $row[5] = $this->tempDepartment($employee);
        $row[6] = $this->employeeRate($employee);

        $row[7] = optional($works->get('reg_hours'))->getValue();
        $row[10] = optional($works->get('ot_hours'))->getValue();

        $row[11] = 'PTO';
        $row[12] = optional($works->get('pto'))->getValue();

        $row[13] = 'SIC';
        $row[14] = optional($works->get('sic'))->getValue();

        $row[15] = 'PER';
        $row[16] = optional($works->get('per'))->getValue();

        $row[17] = 'HOL';
        $row[18] = optional($works->get('hol'))->getValue();

        $row[19] = 'BVT';
        $row[20] = optional($works->get('bvt'))->getValue();

        $row[21] = 'AEX';
        $row[22] = optional($works->get('aex'))->getValue();

        $row[23] = 'CEL';
        $row[24] = optional($works->get('cel'))->getValue();

        $row[25] = 'ONC';
        $row[26] = optional($works->get('onc'))->getValue();

        return $row;
    }

    /**
     * @param Employee $employee
     * @param $tempHour
     * @return array|null
     */
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

    /**
     * @param Employee $employee
     * @return string
     */
    private function companyCode(Employee $employee)
    {
        return $employee->company->code;
    }

    /**
     * @param Employee $employee
     * @return string
     */
    private function batchId(Employee $employee)
    {
        return $employee->office->batch_id;
    }

    /**
     * @param Employee $employee
     * @return string
     */
    private function fileNumber(Employee $employee)
    {
        return $employee->employee_id;
    }

    /**
     * @return int
     */
    private function pay()
    {
        return 1;
    }

    /**
     * @return null
     */
    private function taxFrequency()
    {
        return null;
    }

    /**
     * @param Employee $employee
     * @return mixed
     */
    private function tempDepartment(Employee $employee)
    {
        return $employee->temp_department;
    }

    /**
     * @param Employee $employee
     * @return int|null
     */
    private function employeeRate(Employee $employee)
    {
        if ($employee->employee_type === 'pdm') {
            return $employee->rate;
        }

        return null;
    }

    /**
     * @return string
     */
    private function perDiem()
    {
        return 'PDM';
    }

    /**
     * @return Collection
     */
    public function collection()
    {
        return $this->rows;
    }

    /**
     * @param $cell
     * @param null $start
     * @param null $end
     * @return bool
     */
    private function checkEmptyCell($cell, $start = null, $end = null)
    {
        $index = $start ?? 0;
        $endIndex = $end ?? count($cell);
        for ($i = $index; $i < $endIndex; $i++) {
            if ($cell[$i]) {
                return false;
            }
        }
        return true;
    }

}