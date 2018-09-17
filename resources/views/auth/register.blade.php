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
                    <option value="AL" {{ old('state') == "AL" ? 'selected' : '' }}>Alabama</option>
                    <option value="AK" {{ old('state') == "AK" ? 'selected' : '' }}>Alaska</option>
                    <option value="AZ" {{ old('state') == "AZ" ? 'selected' : '' }}>Arizona</option>
                    <option value="AR" {{ old('state') == "AR" ? 'selected' : '' }}>Arkansas</option>
                    <option value="CA" {{ old('state') == "CA" ? 'selected' : '' }}>California</option>
                    <option value="CO" {{ old('state') == "CO" ? 'selected' : '' }}>Colorado</option>
                    <option value="CT" {{ old('state') == "CT" ? 'selected' : '' }}>Connecticut</option>
                    <option value="DE" {{ old('state') == "DE" ? 'selected' : '' }}>Delaware</option>
                    <option value="DC" {{ old('state') == "DC" ? 'selected' : '' }}>District Of Columbia</option>
                    <option value="FL" {{ old('state') == "FL" ? 'selected' : '' }}>Florida</option>
                    <option value="GA" {{ old('state') == "GA" ? 'selected' : '' }}>Georgia</option>
                    <option value="HI" {{ old('state') == "HI" ? 'selected' : '' }}>Hawaii</option>
                    <option value="ID" {{ old('state') == "ID" ? 'selected' : '' }}>Idaho</option>
                    <option value="IL" {{ old('state') == "IL" ? 'selected' : '' }}>Illinois</option>
                    <option value="IN" {{ old('state') == "IN" ? 'selected' : '' }}>Indiana</option>
                    <option value="IA" {{ old('state') == "IA" ? 'selected' : '' }}>Iowa</option>
                    <option value="KS" {{ old('state') == "KS" ? 'selected' : '' }}>Kansas</option>
                    <option value="KY" {{ old('state') == "KY" ? 'selected' : '' }}>Kentucky</option>
                    <option value="LA" {{ old('state') == "LA" ? 'selected' : '' }}>Louisiana</option>
                    <option value="ME" {{ old('state') == "ME" ? 'selected' : '' }}>Maine</option>
                    <option value="MD" {{ old('state') == "MD" ? 'selected' : '' }}>Maryland</option>
                    <option value="MA" {{ old('state') == "MA" ? 'selected' : '' }}>Massachusetts</option>
                    <option value="MI" {{ old('state') == "MI" ? 'selected' : '' }}>Michigan</option>
                    <option value="MN" {{ old('state') == "MN" ? 'selected' : '' }}>Minnesota</option>
                    <option value="MS" {{ old('state') == "MS" ? 'selected' : '' }}>Mississippi</option>
                    <option value="MO" {{ old('state') == "MO" ? 'selected' : '' }}>Missouri</option>
                    <option value="MT" {{ old('state') == "MT" ? 'selected' : '' }}>Montana</option>
                    <option value="NE" {{ old('state') == "NE" ? 'selected' : '' }}>Nebraska</option>
                    <option value="NV" {{ old('state') == "NV" ? 'selected' : '' }}>Nevada</option>
                    <option value="NH" {{ old('state') == "NH" ? 'selected' : '' }}>New Hampshire</option>
                    <option value="NJ" {{ old('state') == "NJ" ? 'selected' : '' }}>New Jersey</option>
                    <option value="NM" {{ old('state') == "NM" ? 'selected' : '' }}>New Mexico</option>
                    <option value="NY" {{ old('state') == "NY" ? 'selected' : '' }}>New York</option>
                    <option value="NC" {{ old('state') == "NC" ? 'selected' : '' }}>North Carolina</option>
                    <option value="ND" {{ old('state') == "ND" ? 'selected' : '' }}>North Dakota</option>
                    <option value="OH" {{ old('state') == "OH" ? 'selected' : '' }}>Ohio</option>
                    <option value="OK" {{ old('state') == "OK" ? 'selected' : '' }}>Oklahoma</option>
                    <option value="OR" {{ old('state') == "OR" ? 'selected' : '' }}>Oregon</option>
                    <option value="PA" {{ old('state') == "PA" ? 'selected' : '' }}>Pennsylvania</option>
                    <option value="RI" {{ old('state') == "RI" ? 'selected' : '' }}>Rhode Island</option>
                    <option value="SC" {{ old('state') == "SC" ? 'selected' : '' }}>South Carolina</option>
                    <option value="SD" {{ old('state') == "SD" ? 'selected' : '' }}>South Dakota</option>
                    <option value="TN" {{ old('state') == "TN" ? 'selected' : '' }}>Tennessee</option>
                    <option value="TX" {{ old('state') == "TX" ? 'selected' : '' }}>Texas</option>
                    <option value="UT" {{ old('state') == "UT" ? 'selected' : '' }}>Utah</option>
                    <option value="VT" {{ old('state') == "VT" ? 'selected' : '' }}>Vermont</option>
                    <option value="VA" {{ old('state') == "VA" ? 'selected' : '' }}>Virginia</option>
                    <option value="WA" {{ old('state') == "WA" ? 'selected' : '' }}>Washington</option>
                    <option value="WV" {{ old('state') == "WV" ? 'selected' : '' }}>West Virginia</option>
                    <option value="WI" {{ old('state') == "WI" ? 'selected' : '' }}>Wisconsin</option>
                    <option value="WY" {{ old('state') == "WY" ? 'selected' : '' }}>Wyoming</option>
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