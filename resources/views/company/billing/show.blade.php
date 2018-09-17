@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3>
                    <i class="fa fa-bitcoin"></i> Billing
                </h3>

            </header>

            <div class="wrapper">
                <h5>Card</h5>
                <table>
                    @if ($user->paypal_email)
                    <tr>
                        <td>Paypal Email</td>
                        <td>{{ $user->paypal_email }}</td>
                    </tr>
                    @elseif ($user->card_brand)
                        <tr>
                            <td>Card</td>
                            <td> ********{{ $user->card_last_four }} | {{ $user->card_brand }}</td>
                        </tr>
                    @else
                        <tr>
                            <td>You are using Free plan</td>
                        </tr>
                    @endif
                </table>

                <hr>
                <div class="update-plan">
                    <h4>Update Plan</h4>
                    <p>When changing plans, the time remaining on the current billing period will be prorated.</p>
                    <form action="/billing/update_plan" method="post">
                        {{ csrf_field() }}
                        @foreach($services as $service)
                            <?php $plan = $plans->where('id', $service->braintree_plan)->first() ?>
                            <input name="service_tier" type="radio" value="{{ $service->id }}" {{ $service->id === $user->company->serviceTier->id ? 'checked' : '' }}> {{ $service->name }} [({{$plan->price}}$) for {{ $plan->billingFrequency }} Month]
                            <br>
                        @endforeach
                        <button class="button primary" type="submit">Update Plan</button>
                    </form>
                </div>
                <hr>

                <div class="update-payment-method">
                    <h4>Update payment method</h4>
                    <form action="/billing/update_card" class="auth-form" method="post">
                        <div id="dropin-container"></div>
                        {{ csrf_field() }}
                        <hr>
                        <div class="form-button">
                            <button id="payment-button" class="is-hidden" type="submit">Update Payment</button>
                        </div>
                    </form>
                </div>


                    @if(session('update_plan'))
                    <div class="success-box">
                        <p>your plan updated to {{ session('update_plan') }} successfully</p>
                    </div>
                    @endif

                    @if(session('update_card'))
                    <div class="success-box">
                        <p>your payment information changed successfully</p>
                    </div>
                    @endif


            </div>
        </div>
    </div>


    @if($user->card_brand)
    <script src="https://js.braintreegateway.com/js/braintree-2.32.1.min.js"></script>
    <script>
        braintree.setup(@json($token) , 'dropin', {
            container: 'dropin-container',
            onReady: function () {
                $('#payment-button').removeClass('is-hidden');
            },
            card: {
                cardholderName: true
            }
        });
    </script>
    @endif

@endsection
