<?php

namespace App\Exports;


use App\Company;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EmployeeExport implements FromCollection, WithMapping, WithHeadings
{
    use Exportable;

    public $company;
    protected $writerType = \Maatwebsite\Excel\Excel::CSV;

    public function __construct(Company $company)
    {
        $this->company = $company;
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'first name',
            'last name',
            'file number',
            'temp department' ,
            'employee id',
            'employee type',
            'total hour expected per day',
            'reimbursement rate',
            'fulltime threshold',
            'status',
            'batch_id',
            'city',
            'state',
            'zip code',
            'street'
        ];
    }

    /**
     * @param $employee
     * @return array
     */
    public function map($employee): array
    {
        return [
            'first name' => $employee->first_name,
            'last name' => $employee->last_name,
            'file number' => $employee->file_number,
            'temp department' => $employee->temp_department,
            'employee id' => $employee->employee_id,
            'employee type' => $employee->employee_type,
            'total hour expected per day' => $employee->tehd,
            'reimbursement rate' => $employee->reimbursement_rate,
            'fulltime threshold' => $employee->fulltime_threshold,
            'status' => $employee->status,
            'batch_id' => $employee->office->batch_id,
            'city' => $employee->address->city,
            'state' => $employee->address->state,
            'zip code' => $employee->address->zip_code,
            'street' => $employee->address->street,
        ];
    }

    /**
     * @return Collection
     */
    public function collection()
    {
        return $this->company->employees;
    }
}
