<?php

namespace App\Http\Controllers\Company;

use App\Company;
use App\Office;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeBatchController extends Controller
{


    public function import(Request $request, Company $company)
    {

        $request->validate([
            'file' => 'required|file|mimetypes:text/csv,text/plain'
        ]);

        $rows = Excel::load($request->file('file'))->all();
        $skipped = $this->batchImport($rows, $company);

        return response()->json([
            'success' => $rows->count() - $skipped->count(),
            'errors' => $skipped->count(),
            'employees' => $skipped
        ]);
    }

    public function export(Request $request, Company $company)
    {


        $name = uniqid();
        $csv = Excel::create($name, function($excel) use($company) {

            // Set the title
            $excel->setTitle('Employees')
                ->setCreator('calcuride.net')
                ->setCompany($company->name)
                ->setDescription('description');

            $excel->sheet('employees', function($sheet) use($company) {

                $employees = $company->employees->map(function ($employee) {
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
                });

                $sheet->fromArray($employees);

            });

        })->store('csv', storage_path('employees/export'));

        return response()->json([
            'csv' => $csv
        ]);
    }

    public function showImportForm()
    {
        return view('company.employees.import');
    }

    public function showExportForm()
    {
        return view('company.employees.export');
    }

    private function batchImport($rows, Company $company)
    {

        $skipped = collect();

        $rows->each(function ($row, $index) use($company, $skipped) {
            try {

                \DB::beginTransaction();

                $office = Office::where('batch_id', $row['batch_id'])->firstOrFail();

                $employeeFields = [
                    'first_name' => $row['first_name'],
                    'last_name' => $row['last_name'],
                    'employee_id' => $row['employee_id'],
                    'temp_department' => $row['temp_dept'] ?? $row['temp_department'],
                    'employee_type' => $this->employeeType($row['employment_status']),
                    'tehd' => $this->totalExpectedHour($row['employment_status']),
                ];

                if (isset($row['productivity_threshold'])) {
                    $employeeFields['fulltime_threshold'] = $row['productivity_threshold'];
                }

                $employee = $company->employees()->create($employeeFields);
                $addressFields = [
                    'city' => $row['city'],
                    'state' => $row['state'],
                    'zip_code' => $row['zip_code'],
                    'street' => $row['street'],
                ];

                $employee->address()->create($addressFields);
                $office->employees()->save($employee);
                \DB::commit();
                return;

            }
            catch (\Exception $error) {
                Log::error($error);
                \DB::rollBack();
                $skipped->push($row);
            }
        });

        return $skipped;
    }

    private function employeeType($status)
    {
        $status = strtolower($status);

        if ($status === 'per diem') {
            return 'pdm';
        }

        if (str_contains('office', $status)) {
            return 'ft_office';
        }

        return 'ft_patient';

    }

    private function totalExpectedHour($status)
    {
        preg_match('/\d{2}/', $status, $matches);
        if (isset($matches[0])) {
            return (int)$matches[0] / 10;
        }

        return null;
    }

    public function download(Company $company, $fileName)
    {
        $now = Carbon::now();
        return response()
            ->download(storage_path('employees/export/' . $fileName . '.csv'),
                $company->name.'-employees-('.$now->toDateString().').csv');
    }
    
}
