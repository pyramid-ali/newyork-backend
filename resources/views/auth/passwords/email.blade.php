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

            <nav>
                <ul class="menu align-center align-middle">
                    <li class="{{ Route::currentRouteName() === 'login.form' ? 'is-active' : '' }}"><a href="{{ route('login.form') }}">Login</a></li>
                    <li class="{{ Route::currentRouteName() === 'register.form' ? 'is-active' : '' }}"><a href="{{ route('register.form') }}">Register</a></li>
                </ul>
            </nav>

            <form class="auth-form" method="POST" action="{{ route('password.email') }}">

                @if(session('email'))
                    <div class="success-box">
                        <p>{{ session('status') }}</p>
                    </div>
                @endif

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

                <input type="text" name="email" placeholder="Email@example.com" value="{{ $email or old('email') }}">

                <div class="form-button">
                    <button>Send Password Reset Link</button>
                </div>

            </form>

            <div class="other-links">
                <span>Useful Links</span><a href="#">Facebook</a><a href="#">Google</a><a href="#">Linkedin</a>
            </div>

        </div>
    </div>

@endsection