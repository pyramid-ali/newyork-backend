@extends('moderator.layout')

@section('title', 'login')

@section('content')


    <div class="auth-container grid-x align-center align-middle">
        <div class="auth-wrapper">

            <div class="auth-logo">
                <img src="https://kpihs.homacare.net/LOGO.png" alt="logo">
            </div>

            <header class="auth-header">
                <h3 class="auth-title">Get more things done with PaySavvy platform.</h3>
                <p class="auth-subtitle">Access to the most powerfull tool</p>
            </header>

            <form class="auth-form" method="POST" action="{{ url('password/reset') }}">

                <div class="form-errors">
                    @if ($errors->any())
                        <div class="form-errors-wrapper">
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        </div>
                    @endif
                </div>

                {{ csrf_field() }}
                {{--<input type="hidden" name="token" value="{{ $token }}">--}}

                <input id="email" type="email" placeholder="Email" name="email" value="{{ $email or old('email') }}" required autofocus>
                <input id="password" type="password" placeholder="Password" name="password" required>
                <input id="password" type="password" placeholder="Password Confirmation" name="password_confirmation" required>

                <div class="form-button">
                    <button>Reset Password</button>
                </div>

            </form>

        </div>
    </div>

@endsection