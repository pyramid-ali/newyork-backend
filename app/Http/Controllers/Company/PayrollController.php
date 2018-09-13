<?php

namespace App\Http\Controllers\Company;

use App\Company;
use App\Employee;
use App\Jobs\PayrollProcess;
use App\Payroll;
use App\ServiceCode;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class PayrollController extends Controller
{
    //

    public function history(Company $company)
    {
        $payrolls = $company->payrolls()->orderBy('created_at', 'desc')->paginate();
        return view('company.payroll.history', compact('company', 'payrolls'));
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
        $zeroExpectedTime = $this->zeroExpectedTime($rows);

        if ($missingEmployees->count() > 0 || $missingServiceCodes->count() > 0 || $zeroExpectedTime->count() > 0) {
            return response()->json(
                [
                    'employees' => $missingEmployees->toArray(),
                    'service_codes' => $missingServiceCodes->toArray(),
                    'zero_tehd' => $zeroExpectedTime->toArray()
                ], 444
            );
        }

        $filename = uniqid().'.csv';
        $path = 'payrolls';
        Storage::putFileAs('public/' . $path, $file, $filename);

        $payroll = $company->payrolls()->create([
            'path' => $path.'/'.$filename
        ]);

        return response()->json([
            'payroll' => $payroll
        ]);
    }

    public function generateOutput(Request $request, Company $company, Payroll $payroll)
    {
        try {
            $miscellaneous = $request->miscellaneous;
            PayrollProcess::dispatch($company, $payroll, Auth::user(), $miscellaneous);
            $payroll->processing = true;
            $payroll->save();
            return response()->json([
                'ok' => true
            ]);
        }
        catch (\Exception $error) {
            Log::error($error);
            return response()->json([
                'ok' => false,
                'error' => $error->getMessage()
            ], 444);
        }

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

    private function zeroExpectedTime($rows) {

        $employeeIDs = $rows->groupBy(function ($item, $key) {
            return (string) $item['empid'];
        })->keys()->toArray();

        $missingEmployees = collect();
        foreach ($employeeIDs as $employeeID) {
            if($employee = Employee::where('employee_id', $employeeID)->first()) {
                if ($employee->employee_type !== 'pdm' && !$employee->tehd) {
                    $missingEmployees->push($employeeID);
                }
            }
        }

        return $missingEmployees;
    }

    private function missingServiceCodes($rows)
    {
        $serviceCodes = $rows->groupBy('service_code')->keys()->toArray();

        $missingServiceCodes = collect();
        foreach ($serviceCodes as $serviceCode) {
            $code = explode(' ', $serviceCode)[0];
            if (!ServiceCode::where('name', 'like', $code.'%')->exists()) {
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

    public function downloadPayroll(Company $company, Payroll $payroll)
    {
        $this->authorize('download', $payroll);
        $path = 'storage/' . $payroll->path;
        $name = $this->nameGenerator($payroll, 'PAYROLL');
        return response()->download($path, $name);
    }

    public function downloadOutput(Company $company, Payroll $payroll)
    {
        $this->authorize('download', $payroll);
        $name = $this->nameGenerator($payroll, 'EPI');
        return response()->download('storage/' . $payroll->output_path, $name);
    }

    public function downloadInterm(Company $company, Payroll $payroll)
    {
        $this->authorize('download', $payroll);
        $name = $this->nameGenerator($payroll, 'INTERIM');
        return response()->download('storage/' . $payroll->interim_path, $name);
    }

    public function nameGenerator(Payroll $payroll, $prefix)
    {
        return
            $prefix .
            $payroll->created_at->format('ymd') .
            str_pad($payroll->id, 6, '0', STR_PAD_LEFT) .
            '.csv';
    }

}
