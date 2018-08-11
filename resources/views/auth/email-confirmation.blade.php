@extends('layouts.main')

@section('content')
    <div id="main-wrapper" data-layout="horizontal" data-navbarbg="skin1" data-sidebartype="full" data-boxed-layout="boxed">

        @include('components.minimal-header')

        <div class="page-wrapper" style="display: block;">

            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">

                        <card class="text-white bg-success">
                            <card-header>
                                {{ auth()->user()->email }}
                            </card-header>
                            <card-body
                                title="Your Account Verified Successfully"
                                text="You can now define your company and additional information"
                            >
                                <a href="{{ route('wizard') }}" class="btn btn-dark">Continue</a>
                            </card-body>
                        </card>

                    </div>
                </div>

            </div>



            @include('components.minimal-footer')

        </div>


    </div>
@endsection