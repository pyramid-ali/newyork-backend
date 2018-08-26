@extends('moderator.dashboard')

@section('dashboard-content')
    <header>
        <h3><i class="fa fa-plus"></i> Create New Service Tier</h3>


    </header>

    <div class="create-user-form-wrapper">
        <div class="grid-x">
            <div class="cell">

                <form action="{{ route('service_tiers.store') }}" method="post">
                    {{ csrf_field() }}
                    <div class="grid-x grid-padding-x align-center">
                        <div class="cell large-4">
                            <h5>General Information</h5>
                            <label for="name"> Name
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-user-circle-o"></i></span>
                                    <input class="input-group-field" id="name" type="text" name="name" placeholder="Unique name" value="{{ old('name') }}">
                                </div>
                            </label>
                            <label for="code"> Description
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-envelope"></i></span>
                                    <textarea class="input-group-field" id="code" rows="3" name="description" placeholder="Description - shown for users" >{{ old('description') }}</textarea>
                                </div>
                            </label>
                        </div>
                        <div class="cell large-4">
                            <h5>Options</h5>
                            <label for="name"> Max Employees
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-users"></i></span>
                                    <input class="input-group-field" id="city" type="text" name="max_employees" placeholder="Max Employees" value="{{ old('max_employees') }}">
                                </div>
                            </label>

                            <label>
                                Mileage Calculation
                            </label>
                            <div class="switch">
                                <input class="switch-input" id="mileage" type="checkbox" name="mileage_calculation" {{ old('mileage_calculation') ? 'checked' : '' }}>
                                <label class="switch-paddle" for="mileage">
                                    <span class="show-for-sr">Mileage Calculation</span>
                                </label>
                            </div>

                            <button class="button success float-right input-margin-fix"><i class="fa fa-plus"></i> Create</button>
                        </div>
                    </div>

                </form>

                @if(session('tier'))
                    <div class="callout success" data-closable="slide-out-right">
                        <h5>Success.</h5>
                        <p>"{{ session('tier') }}" Tier created successfully</p>
                        <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                @endif

                @if(count($errors) > 0)
                    <div class="error-form">
                        <ul>
                            @foreach($errors as $key => $error)
                                <ul>
                                    <li>{{ $key }}</li>
                                    @foreach($error as $errorItem)
                                        <li>{{ $errorItem }}</li>
                                    @endforeach
                                </ul>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </div>
        </div>
    </div>
    @if ($errors->any())
        <div class="alert alert-danger">
            <h4>Some Errors occurred during form proccess</h4>
            <ul>
                @foreach ($errors->all() as $error)
                    <li><i class="fa fa-times"></i> {{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
@endsection