<?php

namespace App\Http\Controllers\Company;

use App\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    //

    public function showChangePasswordForm(Company $company)
    {
        return view('company.settings.change_password', compact('company'));
    }

    public function changePassword(Request $request, Company $company)
    {
        $request->validate([
            'password' => 'string|required|min:6',
            'confirm_password' => 'required|string|same:password'
        ]);

        $user = Auth::user();
        dd($user);

        $user->password = bcrypt($request->password);
        $user->save();

        return redirect()->back();
    }

    public function showGeneralForm(Company $company)
    {
        return view('company.settings.general', compact('company'));
    }

    public function general(Request $request, Company $company)
    {
        $request->validate([
            'code' => 'required|string',
            'review_period' => 'string|required|in:weekly,bi-weekly,monthly,bi-monthly',
            'fulltime_threshold' => 'required|numeric',
            'city' => 'string|required',
            'state' => 'string|required',
            'zip_code' => 'numeric|required',
            'street' => 'string|required'
        ]);

        $company->address()->update($request->only(['city', 'state', 'zip_code', 'street']));

        $companyProperties = $request->only(['code', 'fulltime_threshold', 'review_period']);

        $company->update($companyProperties);

        return redirect()->back();
    }
}
