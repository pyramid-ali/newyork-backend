@extends('moderator.layout')

@section('title', 'login')

@section('content')
    <div class="plans-container grid-x align-center align-middle">

        <div class="columns large-6">

            <header>
                <div class="logo-container">
                    <img src="https://kpihs.homacare.net/LOGO.png" alt="logo">
                </div>

                <div class="title-container">
                    <h3 class="auth-title">Subscribe to any plan to continue</h3>
                    <p class="auth-subtitle">
                        Choose appropriate plan for your use to continue
                    </p>
                </div>
            </header>

            <div class="list-container">
                <ul class="list-wrapper">
                    @foreach($services as $service)
                        <?php $plan = $plans->where('id', $service->braintree_plan)->first() ?>

                        <li class="list-item">
                            <a href="{{ route('subscribe.show', $service) }}">
                                <div class="grid-x align-middle">
                                    <div class="column large-9">
                                        <h4>{{ $service->name }}</h4>
                                        <p>{{ $service->description }}</p>
                                    </div>
                                    <div class="columns large-3">
                                        <p class="price">${{ $plan->price }} <i class="fa fa-angle-right"></i></p>
                                        <p class="price-subtitle">for {{ $plan->billingFrequency }} Month</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>

        </div>
    </div>

@endsection
