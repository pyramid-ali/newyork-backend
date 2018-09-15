<?php

namespace App\Http\Controllers\Company;

use App\Company;
use App\Exports\EmployeeExport;
use App\Ny\CSVReader;
use App\Office;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeBatchController extends Controller
{


    public function import(Request $request, Company $company)
    {

        $request->validate([
            'file' => 'required|file|mimetypes:text/csv,text/plain'
        ]);

        $rows = CSVReader::load($request->file('file'))->get();
        $this->checkForImportLimitation($rows, $company);
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
        $path = 'public/employees/export/' . $name . '.csv';

        (new EmployeeExport($company))->store($path);

        return response()->json([
            'csv' => [
                'title' => 'Employees',
                'filename' => $name
            ]
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

                $office = $company->offices()->where('batch_id', $row['batch_id'])->firstOrFail();

                $employeeFields = [
                    'first_name' => $row['first_name'],
                    'last_name' => $row['last_name'],
                    'employee_id' => $row['employee_id'],
                    'temp_department' => $row['temp_dept'] ?? $row['temp_department'],
                    'employee_type' => $this->employeeType($row['employment_status'] ?? $row['status']),
                    'tehd' => $this->totalExpectedHour($row['employment_status'] ?? $row['status']),
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
                $row->put('error',$error->getMessage());
                $row->put('error_code',$error->getCode());
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
            ->download(storage_path('app/public/employees/export/' . $fileName . '.csv'),
                $company->name.'-employees-('.$now->toDateString().').csv');
    }

    protected function checkForImportLimitation($rows, Company $company)
    {
        $employees = $company->employees()->count();
        $maxEmployees = $company->serviceTier->meta->max_employees;
        if ($rows->count() + $employees > $maxEmployees) {
            abort(403, 'You cannot import employees more than your limit, please upgrade your plan or decrease number of rows');
        }
    }
    
}
