<?php

namespace App\Http\Controllers\Auth;

use App\ServiceTier;
use Braintree_Plan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class PlanController extends Controller
{
    public function show()
    {
        $services = ServiceTier::orderBy('name', 'asc')->get();
        $plans = collect(Cache::remember('braintree_plans', 60, function () {
            return Braintree_Plan::all();
        }));

        return view('auth.plans', compact('services', 'plans'));
    }
}
