<?php

namespace App\Http\Controllers\Moderator;

use App\Address;
use App\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::latest()->paginate();
        return view('moderator.companies.index', compact('companies'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('moderator.companies.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validateCompany($request);
        $this->validateAddress($request);

        $company = Company::build($request)
            ->addAddress($request);

        return redirect()->back(201)->with('company', $company->name);
    }

    /**
     * Display the specified resource.
     *
     * @param Company $company
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function show(Company $company)
    {
        return view('moderator.companies.show', compact('company'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Company $company
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function edit(Company $company)
    {
        return view('moderator.companies.edit', compact('company'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Company $company
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function update(Request $request, Company $company)
    {

        $this->validateCompanyForUpdate($request, $company);
        $this->validateAddress($request);

        $company->edit($request);
        $company->updateAddress($request);

        return redirect()->route('companies.edit', $company)->with('company', $company->name);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Company $company
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function destroy(Company $company)
    {
        $company->forceDelete();
        return redirect()->route('companies.index')->with('company', $company->name);
    }

    protected function validateCompany(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:companies,name',
            'code' => 'string|nullable',
            'fulltime_threshold' => 'numeric|nullable',
            'account_number' => 'string|required',
            'review_period' => 'string|nullable|in:weekly,bi-weekly,monthly,bi-monthly',
        ]);
    }

    protected function validateCompanyForUpdate(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'required|string|unique:companies,name,' . $company->id,
            'code' => 'string|nullable',
            'fulltime_threshold' => 'numeric|nullable',
            'account_number' => 'string|required',
            'review_period' => 'string|nullable|in:weekly,bi-weekly,monthly,bi-monthly',
        ]);
    }

    public function validateAddress(Request $request)
    {
        $request->validate([
            'city' => 'string|required',
            'state' => 'string|required',
            'zip_code' => 'string|required',
            'street' => 'string|required'
        ]);
    }
}
