<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/28/17
 * Time: 6:08 PM
 */

namespace App\Ny;


use App\Employee;
use App\Ny\Services\ServiceWorker;
use App\ServiceCode;
use Maatwebsite\Excel\Facades\Excel;

class ExportInterim
{

    private $serviceWorkersNamespace = 'App\Ny\Services\\';
    public $rows;

    public function __construct()
    {
        $this->rows = collect();
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
        $row = collect([
            'company' => $work->company,
            'top_unit' => $work->top_unit,
            'parent_unit' => $work->company,
            'sub_unit' => $work->sub_unit,
            'employee_name' => $work->employee_name,
            '' => '',
            'empid' => $work->empid,
            'service_code' => null,
            'visit_status' => null,
            'start_datetime' => null,
            'end_datetime' => null,
            'mrn' => null,
            'patient' => null,
            'care_location_street_address_1' => null,
            'care_location_street_address_2' => null,
            'care_location_aptsteunit' => null,
            'care_location_city' => null,
            'care_location_state' => null,
            'mileage_entry' => null,
            'employee_temp' => null,
            'service_code_units' => null

        ]);

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

        if ($employee->employee_type === 'ft_office') {
            if ($regHours + $this->timeOff($processedWorks) > 10 * $employee->tehd) {
                throw new \Exception('"FT employee exceeding max hours for the period, employee id #' . $employee->employee_id);
            }
        }

        if ($employee->type !== 'pdm') {
            $row->put('reg_hours', $regHours);
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