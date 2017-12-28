<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/28/17
 * Time: 6:08 PM
 */

namespace App\Ny;


use App\Employee;
use App\ServiceCode;
use Maatwebsite\Excel\Facades\Excel;

class ExportInterim
{


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

        $row->put('total_service_code_units', $units);
        $row->put('productivity', ($units / $employee->fulltime_threshold));
        $row->put('total_time_off', $this->timeOff($processedWorks));

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
        $row->put('service_code_units', $this->serviceCodeUnit($work));
        $row->put('total_service_code_units', null);
        $row->put('productivity', null);
        $row->put('total_time_off', null);
        $row->put('reg_hours', null);
        return $row;
    }

    private function serviceCodeUnit($work)
    {
        $serviceCode = ServiceCode::where('name', $work['service_code'])->first();
        if ($serviceCode) {
            return $serviceCode->unit;
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

}