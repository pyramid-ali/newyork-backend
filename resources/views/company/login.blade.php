@extends('company.layout')

@section('title', 'login')

@section('content')

    <div class="top-bar">
        <div class="top-bar-left">
            <ul class="dropdown menu">
                <li class="menu-text">Homacare - Login to Dashboard</li>
            </ul>
        </div>
    </div>

    <div class="grid-x login-container align-center align-middle">
        <div class="cell large-6">
            <header>
                <h3>Welcome to {{ $company->name }}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto aspernatur, atque beatae consequatur debitis dolore mollitia quod ratione sequi similique, voluptates! Beatae ea optio soluta! Assumenda maiores nobis repellendus!</p>
            </header>
        </div>
        <div class="cell large-4 medium-8 small-12">
            <div class="form-wrapper">
                <header>
                    <h3 class="text-center">Login To System</h3>
                </header>
                <section class="form-container">
                    <form action="{{ route('company.login', ['company' => $company->name]) }}" method="post" class="login-form">
                        {{ csrf_field() }}
                        <div class="input-group">
                            <span class="input-group-label"><i class="fa fa-user-circle-o"></i></span>
                            <input class="input-group-field" type="text" name="email" placeholder="Email@example.com">
                        </div>
                        <div class="input-group">
                            <span class="input-group-label"><i class="fa fa-key"></i></span>
                            <input class="input-group-field" type="password" name="password" placeholder="Your password">
                        </div>

                        <input id="remember-me" type="checkbox" name="remember"><label for="checkbox3">Remember me</label>

                        <button class="button primary float-right">Login</button>
                        <a class="button alert float-right forgot-password">Forgot Password</a>
                    </form>

                </section>
                <div class="errors">
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li><i class="fa fa-times"></i> {{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection