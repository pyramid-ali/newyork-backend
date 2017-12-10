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

    <div class="grid-x login-container align-center align-middle">
        <div class="cell large-4 medium-8 small-12">
            <div class="form-wrapper">
                <header>
                    <h3 class="text-center">Please Enter Your Email</h3>
                </header>
                <section class="form-container">
                    <form method="post" class="login-form">
                        {{ csrf_field() }}
                        <div class="input-group">
                            <span class="input-group-label"><i class="fa fa-envelope"></i></span>
                            <input class="input-group-field" type="text" name="email" placeholder="Email@example.com">
                        </div>
                        <button class="button primary float-right">Send Email Verification</button>
                    </form>

                </section>
            </div>
        </div>
    </div>
@endsection