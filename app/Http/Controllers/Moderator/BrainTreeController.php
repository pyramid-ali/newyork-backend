<?php

namespace App\Http\Controllers\Moderator;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Braintree_Plan;
use Illuminate\Support\Facades\Cache;

class BrainTreeController extends Controller
{
    public function index()
    {

        $plans = Cache::remember('braintree_plans', 60, function () {
            return Braintree_Plan::all();
        });
        return view('moderator.braintree.index', compact('plans'));
    }

    public function clearCache()
    {
        Cache::forget('braintree_plans');
        return redirect()->back()->with('clear_cache', true);
    }
}
