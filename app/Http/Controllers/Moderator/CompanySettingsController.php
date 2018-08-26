<?php

namespace App\Http\Controllers\Moderator;

use App\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompanySettingsController extends Controller
{

    public function toggleActivation(Company $company)
    {
        $company->toggleActivation();
        return redirect()->back();
    }

}
