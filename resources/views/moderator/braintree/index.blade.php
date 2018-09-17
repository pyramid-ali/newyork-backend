@extends('moderator.dashboard')

@section('dashboard-content')

    <div class="grid-x">
        <div class="cell">
            <header>
                <h3><i class="fa fa-list"></i> List of Braintree Plans</h3>
                <p>you can edit these plans at <a href="http://braintreegateway.com">Braintree panel</a></p>
                <p>after each change to the plan id, please update related service tier to this plan</p>
                <p><a href="{{ route('service_tiers.braintree.clear_cache') }}">Clear Cache</a></p>
            </header>

            <div class="users-table">
                <table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>description</td>
                        <td>Billing Frequency</td>
                        <td>Trial Duration</td>
                        <td>created_at</td>
                        <td>updated_at</td>

                    </tr>
                    </thead>
                    <tbody>
                    @foreach($plans as $plan)
                        <tr>
                            <td>{{ $plan->id }}</td>
                            <td>{{ $plan->name }}</td>
                            <td>{{ $plan->price }} ({{ $plan->currencyIsoCode }})</td>
                            <td>{{ $plan->description }}</td>
                            <td>{{ $plan->billingFrequency }} (Month)</td>
                            <td>{{ $plan->trialDuration ?? 'Without trial' }} ({{ $plan->trialDurationUnit ?? '-' }})</td>
                            <td>{{ \Carbon\Carbon::instance($plan->createdAt) }}</td>
                            <td>{{ \Carbon\Carbon::instance($plan->updatedAt) }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>

            @if(session('clear_cache'))
                <div class="callout success" data-closable="slide-out-right">
                    <h5>Success.</h5>
                    <p>Cache Cleared successfully</p>
                    <button class="close-button" aria-label="Dismiss success" type="button" data-close>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @endif



        </div>
    </div>

@endsection
