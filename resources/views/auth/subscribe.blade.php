@extends('moderator.layout')

@section('title', 'login')

@section('content')
    <div class="plans-container grid-x align-center align-middle">

        <div class="columns large-4">

            <header>
                <div class="logo-container">
                    <img src="https://kpihs.homacare.net/LOGO.png" alt="logo">
                </div>

                <div class="title-container">
                    <h3 class="auth-title">Payment Information</h3>
                    <p class="auth-subtitle">
                        please select an option to payment
                    </p>
                </div>
            </header>

            <form class="auth-form" action="{{ route('subscribe') }}" method="post">
                <div id="dropin-container"></div>
                <input type="hidden" name="service_tier" value="{{ $serviceTier->id }}">
                {{ csrf_field() }}
                <hr>
                <div class="form-button">
                    <button id="payment-button" class="is-hidden" type="submit">Pay now</button>
                </div>
            </form>

        </div>
    </div>

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

@endsection
