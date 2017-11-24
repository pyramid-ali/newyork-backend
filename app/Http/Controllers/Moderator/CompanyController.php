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
        $companies = Company::paginate();
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

        $request->validate([
            'name' => 'required|string',
            'code' => 'string|nullable',
            'fulltime_threshold' => 'numeric|nullable',
            'account_number' => 'string|required',
            'review_period' => 'string|in:weekly,bi-weekly,monthly,bi-monthly',
            'city' => 'string|required',
            'state' => 'string|required',
            'zip_code' => 'numeric|required',
            'street' => 'string|required'
        ]);

        $address = new Address($request->only(['city', 'state', 'zip_code', 'street']));

        $companyProperties = $request->only(['name', 'code', 'fulltime_threshold', 'review_period', 'account_number']);
        $companyProperties = array_filter($companyProperties);

        $company = Company::create($companyProperties);


        $company->address()->save($address);

        return redirect('/moderator/companies');
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
        $request->validate([
            'name' => 'required|string',
            'code' => 'string|nullable',
            'fulltime_threshold' => 'numeric|nullable',
            'account_number' => 'string|required',
            'review_period' => 'string|in:weekly,bi-weekly,monthly,bi-monthly',
            'city' => 'string|required',
            'state' => 'string|required',
            'zip_code' => 'numeric|required',
            'street' => 'string|required'
        ]);

        $company->address()->update($request->only(['city', 'state', 'zip_code', 'street']));

        $companyProperties = $request->only(['name', 'code', 'fulltime_threshold', 'review_period', 'account_number']);
        $companyProperties = array_filter($companyProperties);

        $company->update($companyProperties);

        return redirect()->back();
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
        return redirect()->back();
    }
}
