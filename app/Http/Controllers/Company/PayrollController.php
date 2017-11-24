<?php

namespace App\Http\Controllers\Company;

use App\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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

    }
}
