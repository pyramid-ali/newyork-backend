<?php

namespace App\Http\Controllers\Company;

use App\Address;
use App\Company;
use App\Employee;
use App\Office;
use App\ServiceCode;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Company $company
     * @return \Illuminate\Http\Response
     */
    public function index(Company $company)
    {
        $employees = $company->employees()->orderBy('employee_id', 'asc')->paginate();
        return view('company.employees.index', compact('employees', 'company'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Company $company
     * @return \Illuminate\Http\Response
     */
    public function create(Company $company)
    {
        $offices = $company->offices;
        return view('company.employees.create', compact('company', 'offices'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Company $company
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Company $company)
    {

        $request->validate([
            'last_name' => 'required|string',
            'first_name' => 'required|string',
            'employee_type' => 'required|string',
            'employee_id' => 'required|numeric|unique:employees,id',
            'temp_department' => 'required|numeric',
            'reimbursement_rate' => 'nullable|numeric',
            'fulltime_threshold' => 'nullable|numeric',
            'status' => 'required|in:active,inactive',
            'office_id' => 'required|exists:offices,id',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'street' => 'required|string',
            'cel' => 'nullable|numeric',
            'metro_card' => 'nullable|numeric',
            'tehd' => 'nullable|numeric',
            'rate' => 'nullable|numeric'
        ]);

        $properties = $request->only([
            'last_name',
            'first_name',
            'employee_type',
            'employee_id',
            'temp_department',
            'reimbursement_rate',
            'fulltime_threshold',
            'status',
            'office_id',
            'cel',
            'metro_card',
            'tehd',
            'rate'
        ]);

        $properties = array_filter($properties);

        $employee = new Employee($properties);
        $company->employees()->save($employee);

        $addressFields = $request->only([
            'city',
            'state',
            'zip_code',
            'street'
        ]);

        $address = new Address($addressFields);

        $employee->address()->save($address);

        return redirect('/employees');

    }

    /**
     * Display the specified resource.
     *
     * @param Company $company
     * @param Employee $employee
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company, Employee $employee)
    {
        return view('company.employees.show', compact('company', 'employee'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Company $company
     * @param Employee $employee
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company, Employee $employee)
    {
        $offices = $company->offices;
        return view('company.employees.edit', compact('employee', 'company', 'offices'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Company $company
     * @param Employee $employee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company, Employee $employee)
    {

        $request->validate([
            'last_name' => 'required|string',
            'first_name' => 'required|string',
            'employee_type' => 'required|string',
            'employee_id' => 'required|numeric|unique:employees,id',
            'temp_department' => 'required|numeric',
            'reimbursement_rate' => 'nullable|numeric',
            'fulltime_threshold' => 'nullable|numeric',
            'status' => 'required|in:active,inactive',
            'office_id' => 'required|exists:offices,id',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip_code' => 'required|string',
            'street' => 'required|string',
            'cel' => 'nullable|numeric',
            'metro_card' => 'nullable|numeric',
            'tehd' => 'nullable|numeric',
            'rate' => 'nullable|numeric'
        ]);

        $properties = $request->only([
            'last_name',
            'first_name',
            'employee_type',
            'employee_id',
            'temp_department',
            'reimbursement_rate',
            'fulltime_threshold',
            'status',
            'office_id',
            'cel',
            'metro_card',
            'tehd',
            'rate'
        ]);

        $employee->update($properties);

        $addressFields = $request->only([
            'city',
            'state',
            'zip_code',
            'street'
        ]);

        $employee->address->update($addressFields);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Company $company
     * @param Employee $employee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company, Employee $employee)
    {
        $employee->forceDelete();
        return redirect()->back();
    }

    public function serviceCodes(Company $company, Employee $employee)
    {
        $serviceCodes = ServiceCode::orderBy('name', 'asc')->get();
        return view('company.employees.service_codes', compact('serviceCodes', 'company', 'employee'));
    }

    public function assignServiceCodes(Request $request, Company $company, Employee $employee)
    {
        $request->validate([
            'services' => 'array'
        ]);

        $employee->serviceCodes()->sync($request->services);

        return redirect()->back();
    }

    public function setRate(Request $request, Company $company, Employee $employee)
    {
        $request->validate([
            'rate' => 'nullable|numeric',
            'service_code' => 'required|exists:service_codes,id'
        ]);

        $serviceCode = $employee->serviceCodes()->find($request->service_code);
        $serviceCode->pivot->rate = $request->rate;
        $serviceCode->pivot->save();

        return redirect()->back();
    }

    public function search(Request $request, Company $company)
    {

        $firstName = $request['first_name'];
        $lastName = $request['last_name'];
        $employeeId = $request['employee_id'];

        $employees = Employee::query();

        if ($firstName) {
            $employees = $employees->where('first_name', $firstName);
        }

        if ($lastName) {
            $employees = $employees->where('last_name', $lastName);
        }

        if ($employeeId) {
            $employees = $employees->where('employee_id', $employeeId);
        }

        $employees = $employees->paginate();

        return view('company.employees.index', compact('employees', 'company'));
    }


}
