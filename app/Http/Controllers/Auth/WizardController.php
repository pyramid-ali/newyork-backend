<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WizardController extends Controller
{
    public function __invoke()
    {
        \Auth::loginUsingId(1);
        return view('auth.wizard');
    }
}
