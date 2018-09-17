<?php

namespace App\Http\Controllers\Company;

use App\ServiceTier;
use Braintree_ClientToken;
use Braintree_Plan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class BillingController extends Controller
{


    public function show()
    {
        $user = auth()->user();
        $token = Braintree_ClientToken::generate();
        $services = ServiceTier::orderBy('name')->get();
        $plans = collect(Cache::remember('braintree_plans', 60, function () {
            return Braintree_Plan::all();
        }));
        return view('company.billing.show', compact('user', 'token', 'services', 'plans'));
    }

    public function updateCard(Request $request)
    {
        $request->validate([
            'payment_method_nonce' => 'required|string'
        ]);

        $request->user()->updateCard($request->payment_method_nonce);


        return redirect()->back()->with('update_card', true);
    }

    public function updatePlan(Request $request)
    {
        $request->validate([
            'service_tier' => 'required|exists:service_tiers,id',
        ]);

        $serviceTier = ServiceTier::findOrFail($request->service_tier);

        $request->user()->subscription('main')
            ->swap($serviceTier->braintree_plan);

        $request->user()->company->serviceTiers()->sync($request->service_tier);

        return redirect()->back()->with('update_plan', $serviceTier->name);
    }
}
