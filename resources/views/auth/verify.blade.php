@extends('moderator.layout')

@section('title', 'login')

@section('content')
    <div class="auth-container grid-x align-center align-middle">
        <div class="auth-wrapper">

            <div class="auth-logo">
                <img src="https://kpihs.homacare.net/LOGO.png" alt="logo">
            </div>

            <header class="auth-header">

                <h3 class="auth-title">Verify Your Email Address</h3>
                <p class="auth-subtitle">
                    Before proceeding, please check your email for a verification link.
                    If you did not receive the email.
                </p>
            </header>

            <a class="auth-link" href="{{ route('verification.resend') }}">click here to request another</a>

            @if (session('resent'))
                <div class="success-box mt-10">
                    <p>A fresh verification link has been sent to your email address.</p>
                </div>
            @endif

        </div>
    </div>

@endsection
