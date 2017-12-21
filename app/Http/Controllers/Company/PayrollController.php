<?php

namespace App\Http\Controllers\Company;

use App\Company;
use App\Employee;
use App\Jobs\PayrollProcess;
use App\ServiceCode;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;

class PayrollController extends Controller
{
    //

    public function history(Company $company)
    {
        return view('company.payroll.history', compact('company'));
    }

    public function showProcessForm(Company $company)
    {
        return view('company.payroll.process', compact('company'));
    }

    public function process(Request $request, Company $company)
    {
        $request->validate([
            'file' => 'file'
        ]);

        $file = $request->file('file');
        $rows = Excel::load($file)->get();

        $missingEmployees = $this->missingEmployees($rows);
        $missingServiceCodes = $this->missingServiceCodes($rows);

        if ($missingEmployees->count() > 0 || $missingServiceCodes->count() > 0) {
            return response()->json(
                [
                    'employees' => $missingEmployees->toArray(),
                    'service_codes' => $missingServiceCodes->toArray()
                ], 444
            );
        }

        PayrollProcess::dispatch(base64_encode($file), $company);
    }

    private function missingEmployees($rows)
    {
        $employeeIDs = $rows->groupBy(function ($item, $key) {
            return (string) $item['empid'];
        })->keys()->toArray();

        $missingEmployees = collect();
        foreach ($employeeIDs as $employeeID) {
            if (!Employee::where('employee_id', $employeeID)->exists()) {
                $missingEmployees->push($employeeID);
            }
        }

        return $missingEmployees;
    }

    private function missingServiceCodes($rows)
    {
        $serviceCodes = $rows->groupBy('service_code')->keys()->toArray();

        $missingServiceCodes = collect();
        foreach ($serviceCodes as $serviceCode) {
            if (!ServiceCode::where('name', $serviceCode)->exists()) {
                $serviceWorker = $this->serviceWorker($serviceCode);
                if (!class_exists($serviceWorker)) {
                    $missingServiceCodes->push($serviceCode);
                }
            }
        }

        return $missingServiceCodes;
    }

    private function serviceWorker($serviceCode)
    {
        $escaped = preg_replace('/[!@#$%^&*(),.]/', ' ', $serviceCode);
        $serviceClassName = studly_case($escaped);
        return 'App\Ny\Services\\' . $serviceClassName;
    }


}
