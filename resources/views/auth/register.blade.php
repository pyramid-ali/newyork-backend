@extends('layouts.main')

@section('content')
    <div class="auth-wrapper d-flex no-block justify-content-center align-items-center" style="background:url({{ asset('images/big/auth-bg.jpg') }}) no-repeat center center;">
        <div class="auth-box">
            <div>
                <div class="logo">
                    <span class="db"><img src="{{ asset('images/logo-icon.png') }}" alt="logo" /></span>
                    <h5 class="font-medium m-b-20 m-t-5">Signup</h5>
                </div>
                <!-- Form -->
                <div class="row">
                    <div class="col-12">
                        <form class="form-horizontal m-t-20" action="{{ route('register') }}" method="post">
                            {{ csrf_field() }}
                            <div class="form-group row ">
                                <div class="col-12 ">
                                    <input name="name" class="form-control form-control-lg" type="text" required=" " placeholder="Name">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-12 ">
                                    <input name="email" class="form-control form-control-lg" type="text" required=" " placeholder="Email">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-12 ">
                                    <input name="password" class="form-control form-control-lg" type="password" required=" " placeholder="Password">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-12 ">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1">
                                        <label class="custom-control-label" for="customCheck1">I agree to all <a href="javascript:void(0)">Terms</a></label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group text-center ">
                                <div class="col-xs-12 p-b-20 ">
                                    <button class="btn btn-block btn-lg btn-info " type="submit ">SIGN UP</button>
                                </div>
                            </div>
                            @if(session('registered'))
                                <div class="form-group m-b-0 m-t-10 ">
                                    <div class="col-sm-12 text-center text-success">
                                        Thanks for your registration, Please check your email inbox for confirmation
                                    </div>
                                </div>
                            @endif

                            @if ($errors->any())
                                <ul class="list-style-none">
                                    @foreach ($errors->all() as $error)
                                        <li class="text-danger"><i class="fa fa-chevron-right"></i> {{ $error }}</li>
                                    @endforeach
                                </ul>
                            @endif
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection