<?php

namespace App\Ny\Exporter;


use App\Employee;
use App\Ny\Services\ServiceWorker;
use App\Ny\WorkContainer;
use App\ServiceCode;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;

class InterimExporter implements FromCollection
{
    use Exportable;

    public $rows;

    public $filePath = 'app/public/interim';
    public $writerType = \Maatwebsite\Excel\Excel::CSV;

    public function __construct()
    {
        $this->rows = collect();
    }

    public function entry($rows, WorkContainer $workContainer, Employee $employee)
    {
        foreach ($rows as $row) {
            $row = $this->modifyWork($employee, $row);
            $this->rows->push($row);
        }

        $row = $this->additionalRow($rows, $workContainer, $employee);
        $this->rows->push($row);
    }

    private function additionalRow($rows, WorkContainer $workContainer, Employee $employee)
    {
        $works = $workContainer->works();
        $row = $rows->first();

        $row->put('service_code', 'summary');
        $row->put('visit_status', null);
        $row->put('start_datetime', null);
        $row->put('end_datetime', null);
        $row->put('mrn', null);
        $row->put('patient', null);
        $row->put('care_location_street_address_1', null);
        $row->put('care_location_street_address_2', null);
        $row->put('care_location_aptsteunit', null);
        $row->put('care_location_city', null);
        $row->put('care_location_state', null);
        $row->put('mileage_entry', null);
        $row->put('employee_type', $employee->employee_type);
        $row->put('service_code_units', null);
        $row->put('total_service_code_units', null);
        $row->put('productivity', null);
        $row->put('total_time_off', null);
        $row->put('reg_hours', null);
        $row->put('notes', null);

        $regHours = optional($works->get('reg_hours'))->getValue();
        $tempRates = optional($works->get('temp_rate'))->rawValue();
        $units = $this->units($tempRates);
        $totalServiceCodeUnits = $units + $regHours;

        if ($employee->employee_type === 'ft_patient') {
            $fullTimeThreshold = $this->fullTimeThreshold($workContainer, $employee);
        }
        else {
            $fullTimeThreshold = $employee->fulltime_threshold;
        }

        if ($employee->employee_type === 'ft_patient') {
            $row->put('total_service_code_units', $totalServiceCodeUnits);
            $row->put('productivity', ($totalServiceCodeUnits / $fullTimeThreshold));
        }

        $row->put('total_time_off', $this->timeOff($works));

        if ($employee->type !== 'pdm') {
            $row->put('reg_hours', $regHours);
        }

        if ($employee->employee_type === 'ft_office') {
            if ($regHours + $this->timeOff($works) > 10 * $employee->tehd) {
                $row->put('notes', 'exceeding max hours for the period');
            }
        }

        return $row;

    }

    private function timeOff($works)
    {
        return optional($works->get('hol'))->getValue() +
            optional($works->get('per'))->getValue() +
            optional($works->get('pto'))->getValue() +
            optional($works->get('bvt'))->getValue() +
            optional($works->get('sic'))->getValue();
    }

    private function units($tempRates)
    {
        $result = 0;
        foreach ($tempRates as $tempRate) {
            $result += $tempRate['unit'];
        }

        return $result;
    }

    private function modifyWork(Employee $employee, $work)
    {
        $row = clone collect($work);
        $row->put('employee_type', $employee->employee_type);
        $row->put('service_code_units', $this->serviceCodeUnit($work, $employee));
        $row->put('total_service_code_units', null);
        $row->put('productivity', null);
        $row->put('total_time_off', null);
        $row->put('reg_hours', null);
        return $row;
    }

    private function serviceCodeUnit($work, Employee $employee)
    {
        $serviceCode = ServiceCode::where('name', $work['service_code'])->first();
        if ($serviceCode) {
            return $serviceCode->unit;
        }

        $serviceWorker = $this->serviceWorker($work['service_code']);
        if (class_exists($serviceWorker)) {
            $instance = new $serviceWorker;
            if ($instance instanceof ServiceWorker) {
                $output =  $instance->work($work, $employee);
                if (isset($output['reg_hours'])) {
                    return $output['reg_hours'];
                }
            }
        }

        return null;
    }

    private function serviceWorker($serviceCode)
    {
        $escaped = preg_replace('/[!@#$%^&*(),.]/', ' ', $serviceCode);
        $serviceClassName = studly_case($escaped);
        return $this->serviceWorkersNamespace . $serviceClassName;
    }

    private function getMinusWorkHour($processedWorks, $key)
    {
        return $processedWorks->get($key);
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
     * @return float
     */
    private function thresholdMinus(WorkContainer $workContainer, Employee $employee)
    {
        return ($this->calcRegHoursMinus($workContainer) / $employee->tehd) * 0.1;
    }

    private function fullTimeThreshold(WorkContainer $workContainer, Employee $employee)
    {
        return $employee->fulltime_threshold - $this->thresholdMinus($workContainer, $employee);
    }

    /**
     * @return Collection
     */
    public function collection()
    {
        $this->rows;
    }
}
