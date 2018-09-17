<?php

namespace App\Ny\Exporter;

use App\Employee;
use App\Ny\ServiceCodeManager;
use App\Ny\Services\ServiceWorker;
use App\Ny\WorkContainer;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class InterimExporter extends Base implements FromCollection
{
    public $path = 'interims/';

    /**
     * @param $rows
     * @param WorkContainer $workContainer
     * @param Employee $employee
     */
    public function entry($rows, WorkContainer $workContainer, Employee $employee)
    {
        foreach ($rows as $row) {
            $row = $this->modifyWork($employee, $row);
            $this->rows->push($row);
        }

        $row = $this->additionalRow($rows, $workContainer, $employee);
        $this->rows->push($row);
    }

    /**
     * @param Employee $employee
     * @param $row
     * @return mixed
     */
    private function modifyWork(Employee $employee, $row)
    {

        return $row->merge([
            'employee_type' => $employee->employee_type,
            'service_code_units' => $this->serviceCodeUnit($row, $employee),
            'total_service_code_units' => null,
            'productivity' => null,
            'total_time_off' => null,
            'reg_hours' => null,
            'notes' => null,
        ]);
    }

    /**
     * @param $row Collection
     * @param Employee $employee
     * @return mixed|null
     */
    private function serviceCodeUnit($row, Employee $employee)
    {
        $serviceWorker = (new ServiceCodeManager($row->get('service_code')))
            ->getServiceWorker(true);

        if ($serviceWorker instanceof ServiceWorker) {
            return $serviceWorker->serviceCodeUnits($row, $employee);
        }

        return null;
    }

    /**
     * @param $rows
     * @param WorkContainer $workContainer
     * @param Employee $employee
     * @return mixed
     */
    private function additionalRow($rows, WorkContainer $workContainer, Employee $employee)
    {
        $works = $workContainer->works();

        return $rows->first()->merge([
            'service_code' => 'summary',
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
            'employee_type' => $employee->employee_type,
            'service_code_units' => null,
            'total_service_code_units' => $this->totalServiceCodeUnits($works, $employee),
            'productivity' => $this->productivity($works, $employee),
            'total_time_off' => $this->timeOff($works),
            'reg_hours' => $this->regHours($works, $employee),
            'notes' => $this->notes($works, $employee),
        ]);
    }

    /**
     * @param $works Collection
     * @param Employee $employee
     * @return null|int|float
     */
    private function totalServiceCodeUnits($works, Employee $employee)
    {
        if ($employee->employee_type === 'ft_patient') {
            return optional($works->get('reg_hours'))->getValue() +
                optional($works->get('temp_rate'))->getValue();
        }

        return null;
    }

    /**
     * @param $works
     * @param Employee $employee
     * @return float|int|null
     */
    private function productivity($works, Employee $employee)
    {
        if ($employee->employee_type === 'ft_patient') {
            return $this->totalServiceCodeUnits($works, $employee) / $this->fullTimeThreshold($works, $employee);
        }

        return null;
    }

    /**
     * @param $works
     * @param Employee $employee
     * @return null
     */
    private function regHours($works, Employee $employee)
    {
        if ($employee->type !== 'pdm') {
            return optional($works->get('reg_hours'))->getValue();
        }

        return null;
    }

    /**
     * @param $works
     * @return mixed
     */
    private function timeOff($works)
    {
        return optional($works->get('hol'))->getValue() +
            optional($works->get('per'))->getValue() +
            optional($works->get('pto'))->getValue() +
            optional($works->get('bvt'))->getValue() +
            optional($works->get('sic'))->getValue();
    }

    /**
     * @param $works
     * @param Employee $employee
     * @return string
     */
    private function notes($works, Employee $employee)
    {
        if (optional($works->get('reg_hours'))->getValue() + $this->timeOff($works) > 10 * $employee->tehd) {
            return 'exceeding max hours for the period';
        }
    }

    /**
     * @param $works
     * @param Employee $employee
     * @return float
     */
    private function thresholdMinus($works, Employee $employee)
    {
        return ($this->timeOff($works) / $employee->tehd) * 0.1;
    }

    /**
     * @param $works
     * @param Employee $employee
     * @return float|mixed
     */
    private function fullTimeThreshold($works, Employee $employee)
    {
        return $employee->fulltime_threshold - $this->thresholdMinus($works, $employee);
    }

    /**
     * @return Collection
     */
    public function collection()
    {
        return $this->rows;
    }
}
