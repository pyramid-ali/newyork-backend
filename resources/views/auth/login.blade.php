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

            <form class="auth-form" action="{{ route('login') }}" method="post" class="login-form">
                {{ csrf_field() }}

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

                <input type="text" name="email" placeholder="E-mail Address">
                <input type="password" name="password" placeholder="Password">

                <div class="form-button">
                    <button>Login</button>
                    <a href="{{ action('Auth\ForgotPasswordController@showLinkRequestForm') }}">Forget Password?</a>
                </div>


            </form>

            <div class="other-links">
                <span>Useful Links</span><a href="#">Facebook</a><a href="#">Google</a><a href="#">Linkedin</a>
            </div>

        </div>
    </div>

@endsection