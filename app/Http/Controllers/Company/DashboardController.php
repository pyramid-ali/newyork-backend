<?php

namespace App\Http\Controllers\Company;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\View\View;

class DashboardController extends Controller
{

    /**
     * show company dashboard
     *
     * @return View
     */
    public function __invoke()
    {
        return view('company.home');
    }
}
