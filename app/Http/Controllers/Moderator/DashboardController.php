<?php

namespace App\Http\Controllers\Moderator;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\View\View;

class DashboardController extends Controller
{
    /**
     * show admin dashboard
     *
     * @return View
     */
    public function __invoke()
    {
        return view('moderator.home');
    }
}
