<?php

namespace App\Http\Controllers\Company;

use App\Company;
use App\Office;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Company $company
     * @return \Illuminate\Http\Response
     */
    public function index(Company $company)
    {
        $offices = $company->offices()->orderBy('created_at', 'desc')->paginate();
        return view('company.offices.index', compact('offices', 'company'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Company $company
     * @return \Illuminate\Http\Response
     */
    public function create(Company $company)
    {
        return view('company.offices.create', compact('company'));
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
            'name' => 'string|required',
            'batch_id' => 'required|numeric',
            'rate' => 'required|numeric'
        ]);

        $properties = $request->only(['name', 'batch_id', 'rate']);
        $office = new Office($properties);
        $company->offices()->save($office);

        return redirect('/offices');
    }

    /**
     * Display the specified resource.
     *
     * @param Company $company
     * @param Office $office
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company, Office $office)
    {
        $employees = $office->employees()->orderBy('created_at', 'desc')->paginate();
        return view('company.offices.show', compact('office', 'company', 'employees'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Company $company
     * @param Office $office
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company, Office $office)
    {
        return view('company.offices.edit', compact('office', 'company'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Company $company
     * @param Office $office
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company, Office $office)
    {
        $request->validate([
            'name' => 'string|required',
            'batch_id' => 'required|numeric',
            'rate' => 'required|numeric'
        ]);

        $properties = $request->only(['name', 'batch_id', 'rate']);
        $office->update($properties);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Company $company
     * @param Office $office
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company, Office $office)
    {
        $office->forceDelete();
        return redirect()->back();
    }
}
