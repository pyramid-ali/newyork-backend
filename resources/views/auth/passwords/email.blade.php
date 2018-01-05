@extends('company.layout')

@section('title', 'login')

@section('content')

    <div class="top-bar">
        <div class="top-bar-left">
            <ul class="dropdown menu">
                <li class="menu-text">Forgot Password</li>
            </ul>
        </div>
    </div>

    <div class="wrapper grid-x grid-padding-y align-center">
        <div class="cell medium-8 small-12">
            <div class="forgot-password-container">
                <header>
                    <h6>Reset Password</h6>
                </header>
                <section class="form-container">
                    <form class="login-form" method="POST" action="{{ route('password.email') }}">
                        {{ csrf_field() }}
                        <div class="input-group">
                            <span class="input-group-label">E-mail Address</span>
                            <input class="input-group-field" type="text" name="email" placeholder="Email@example.com" value="{{ $email or old('email') }}">
                        </div>
                        <button class="button primary float-right">Send Password Reset Link</button>

                        <div class="clearfix"></div>
                        @if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                        @if (session('status'))
                            <div class="alert alert-success">
                                {{ session('status') }}
                            </div>
                        @endif
                    </form>

                </section>
            </div>
        </div>
    </div>
@endsection