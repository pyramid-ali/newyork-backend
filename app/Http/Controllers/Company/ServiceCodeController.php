<?php

namespace App\Http\Controllers\Company;

use App\Company;
use App\ServiceCode;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ServiceCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Company $company)
    {
        $serviceCodes = ServiceCode::paginate();
        return view('company.services.index', compact('serviceCodes', 'company'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Company $company)
    {
        return view('company.services.create', compact('company'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'string|required',
            'rate' => 'nullable|numeric',
            'unit' => 'required|numeric'
        ]);

        $properties = $request->only(['name', 'rate', 'unit']);

        $company->serviceCodes()->create($properties);

        return redirect('/service_codes');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company, ServiceCode $serviceCode)
    {
        return view('company.services.show', compact('company', 'serviceCode'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Company $company, ServiceCode $serviceCode)
    {
        return view('company.services.edit', compact('company', 'serviceCode'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company, ServiceCode $serviceCode)
    {
        $request->validate([
            'name' => 'string|required',
            'rate' => 'nullable|numeric',
            'unit' => 'required|numeric'
        ]);

        $properties = $request->only(['name', 'rate', 'unit']);

        $serviceCode->update($properties);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company, ServiceCode $serviceCode)
    {
        $serviceCode->forceDelete();
        return redirect()->back();
    }
}
