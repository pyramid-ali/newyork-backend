<?php

namespace App\Http\Controllers\Company;

use App\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InactiveCompanyController extends Controller
{


    public function __invoke(Company $company)
    {
        $this->authorize('inactive', Company::class);
        return view('company.inactive', compact('company'));
    }
}
