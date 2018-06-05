<?php

namespace App\Ny;


use App\Employee;
use App\Ny\Services\ServiceWorker;
use App\ServiceCode;
use Maatwebsite\Excel\Facades\Excel;

class ExportInterim
{

    private $serviceWorkersNamespace = 'App\Ny\Services\\';
    public $rows;
    private $exceededTimeEmployee;

    public function __construct()
    {
        $this->rows = collect();
        $this->exceededTimeEmployee = collect();
    }

    public function entry(Employee $employee, $processedWorks, $works)
    {

        // calculate employees that have reg Amount

        foreach ($works as $work) {
            $row = $this->modifyWork($employee, $work);
            $this->rows->push($row);
        }

        $row = $this->additionalRow($employee, $processedWorks, $works);
        $this->rows->push($row);
    }

    private function additionalRow(Employee $employee, $processedWorks, $works)
    {
        $work = $works->first();
        $row = clone collect($work);
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
        $row->put('service_code_units', null);
        $row->put('total_service_code_units', null);
        $row->put('productivity', null);
        $row->put('total_time_off', null);
        $row->put('reg_hours', null);
        $row->put('notes', null);

        $regHours = $processedWorks->get('reg_hours');
        $tempRates = $processedWorks->get('temp_rate', []);
        $units = $this->units($tempRates);
        $totalServiceCodeUnits = $units + $regHours;

        if ($employee->employee_type === 'ft_patient') {
            $fullTimeThreshold = $this->fullTimeThreshold($processedWorks, $employee);
        }
        else {
            $fullTimeThreshold = $employee->fulltime_threshold;
        }

        if ($employee->employee_type === 'ft_patient') {
            $row->put('total_service_code_units', $totalServiceCodeUnits);
            $row->put('productivity', ($totalServiceCodeUnits / $fullTimeThreshold));
        }

        $row->put('total_time_off', $this->timeOff($processedWorks));

        if ($employee->type !== 'pdm') {
            $row->put('reg_hours', $regHours);
        }

        if ($employee->employee_type === 'ft_office') {
            if ($regHours + $this->timeOff($processedWorks) > 10 * $employee->tehd) {
//                $this->exceededTimeEmployee->push($employee);
                $row->put('notes', 'exceeding max hours for the period');
            }
        }



        return $row;

    }

    private function timeOff($processedWorks)
    {
        return $processedWorks->get('hol', 0) +
            $processedWorks->get('per', 0) +
            $processedWorks->get('pto', 0) +
            $processedWorks->get('bvt', 0) +
            $processedWorks->get('sic', 0);
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

    public function export()
    {
//        if ($this->exceededTimeEmployee->count() > 0) {
//            $ids = $this->exceededTimeEmployee->map(function($employee) {
//                return '#' .$employee->employee_id;
//            })->toArray();
//            $message = implode(', ', $ids);
//            throw new \Exception('"FT employee exceeding max hours for the period, employees id ' . $message);
//        }

        $name = uniqid();
        $csv = Excel::create($name, function($excel) {

            // Set the title
            $excel->setTitle('Interim')
                ->setCreator('calcuride.net')
                ->setDescription('interim proccessed');

            $excel->sheet('employees', function($sheet) {

                $sheet->fromArray($this->rows->toArray(), null, 'A1');

            });

        })->store('csv', storage_path('app/public/interim'), true);

        return $name;
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

    private function calcRegHoursMinus($processedWorks)
    {
        $minus = $this->getMinusWorkHour($processedWorks, 'hol') +
            $this->getMinusWorkHour($processedWorks, 'sic') +
            $this->getMinusWorkHour($processedWorks, 'per') +
            $this->getMinusWorkHour($processedWorks, 'pto');

        return $minus;
    }

    private function thresholdMinus($processedWorks, Employee $employee)
    {
        $minus = $this->calcRegHoursMinus($processedWorks);
        $percent = $minus / $employee->tehd;
        // TODO: 10 should must be replace with days in period review
        return $percent * 0.1;
    }

    private function fullTimeThreshold($processedWorks, Employee $employee)
    {
        return $employee->fulltime_threshold - $this->thresholdMinus($processedWorks, $employee);
    }

}
