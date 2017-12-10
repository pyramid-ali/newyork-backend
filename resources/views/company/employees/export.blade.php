@extends('company.dashboard')

@section('dashboard-content')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3><i class="fa fa-users"></i> Export Employees </h3>
            </header>

            <section class="form Container">
                <div id="employee-export"></div>
            </section>

        </div>
    </div>

@endsection
