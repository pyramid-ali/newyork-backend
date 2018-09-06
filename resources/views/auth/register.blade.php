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

            <form class="auth-form" action="{{ route('register') }}" method="post" class="login-form">

                @if(session('email'))
                    <div class="success-box">
                        <h5>A Verification Link has been sent to your email account</h5>
                        <p>please click on the link that has just been sent to your email account to verify your email and continue the registration process.</p>
                    </div>
                @endif

                <div class="form-errors">
                    @if ($errors->any())
                        <div class="form-errors-wrapper">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li><i class="fa fa-times"></i> {{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </div>

                {{ csrf_field() }}

                <input type="text" name="name" placeholder="Full Name" value="{{ old('name') }}" required>
                <input type="text" name="company" placeholder="Company Name" value="{{ old('company') }}" required>
                <p>Company Address</p>
                <input type="text" name="street" placeholder="Street" value="{{ old('street') }}" required>
                <input type="text" name="city" placeholder="City" value="{{ old('city') }}" required>
                <select name="state" id="state" required>
                    <option value="" selected>Select State</option>
                    <option value="ae" {{ old('state') == "ae" ? 'selected' : '' }}>AE</option>
                </select>
                <input type="text" name="zip_code" placeholder="Zip Code" value="{{ old('zip_code') }}" required>
                <hr>
                <input type="text" name="email" placeholder="E-mail Address" value="{{ old('email') }}" required>
                <input type="password" name="password" placeholder="Password" required>
                <input type="password" name="password_confirmation" placeholder="Password Confirmation" required>

                <div class="form-button">
                    <button>Register</button>
                </div>

            </form>

            <div class="other-links">
                <span>Useful Links</span><a href="#">Facebook</a><a href="#">Google</a><a href="#">Linkedin</a>
            </div>

        </div>
    </div>

@endsection