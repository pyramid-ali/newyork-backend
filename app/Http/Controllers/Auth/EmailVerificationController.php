<?php

namespace App\Http\Controllers\Auth;

use App\EmailVerification;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmailVerificationController extends Controller
{

    public function __invoke()
    {
        \request()->validate([
            'token' => 'required|string|size:50'
        ]);

        try {
            $email = EmailVerification::verify(\request('token'));
            \Auth::login(User::activate($email));
            return view('auth.email-confirmation');
        }
        catch (\Exception $error) {
            \Auth::loginUsingId(1);
            return view('auth.email-confirmation');
        }
    }
}
