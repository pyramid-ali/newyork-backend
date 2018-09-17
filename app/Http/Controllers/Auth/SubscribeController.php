<?php

namespace App\Http\Controllers\Auth;

use App\ServiceTier;
use Braintree_ClientToken;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class SubscribeController extends Controller
{

    public function show(ServiceTier $serviceTier)
    {
        $token = Braintree_ClientToken::generate();
        return view('auth.subscribe', compact('serviceTier', 'token'));

    }

    public function subscribe(Request $request)
    {
        $user = $request->user();
        $this->validatePayment($request);

        $serviceTier = ServiceTier::findOrFail($request->service_tier);

        $user->newSubscription('main', $serviceTier->braintree_plan)
            ->create($request->payment_method_nonce);

        $user->company->serviceTiers()->sync($request->service_tier);

        return redirect()->route('company.dashboard', $user->company);
    }

    protected function validatePayment(Request $request)
    {
        $request->validate([
            'service_tier' => 'required|exists:service_tiers,id',
            'payment_method_nonce' => 'required|string'
        ]);
    }
}
