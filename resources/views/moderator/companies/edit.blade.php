@extends('moderator.dashboard')

@section('dashboard-content')
    <header>
        <h3><i class="fa fa-pencil"></i> Edit Company - {{ $company->name }}</h3>


    </header>

    <div class="create-user-form-wrapper">
        <div class="grid-x">
            <div class="cell">

                <form action="{{ route('companies.update', $company) }}" method="post">
                    {{ csrf_field() }}
                    {{ method_field('patch') }}
                    <div class="grid-x grid-padding-x align-center">
                        <div class="cell large-4">
                            <h5>General Information</h5>
                            <label for="name">Company Name
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-user-circle-o"></i></span>
                                    <input class="input-group-field" id="name" type="text" name="name" placeholder="Company Name" value="{{ $company->name }}">
                                </div>
                            </label>
                            <label for="code"> Company Code
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-user-circle-o"></i></span>
                                    <input class="input-group-field" id="code" type="text" name="code" placeholder="Code - default is C6H" value="{{ $company->code }}">
                                </div>
                            </label>
                            <label for="threshold"> Full Time Threshold
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-clock-o"></i></span>
                                    <input class="input-group-field" id="threshold" type="text" name="fulltime_threshold" placeholder="Full Time Threshold - default is 58"  value="{{ $company->fulltime_threshold }}">
                                </div>
                            </label>
                            <label for="ac-number"> Account Number
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-sort-numeric-asc"></i></span>
                                    <input class="input-group-field" id="ac-number" type="text" name="account_number" placeholder="Account Number"  value="{{ $company->account_number }}">
                                </div>
                            </label>
                            <label for="review_period">Update Review Period
                                <select name="review_period" id="review_period">
                                    <option value="bi-weekly" {{ $company->review_period === 'bi-weekly' ? 'selected' : '' }}>BiWeekly</option>
                                    <option value="weekly" {{ $company->review_period === 'weekly' ? 'selected' : '' }}>Weekly</option>
                                    <option value="bi-monthly" {{ $company->review_period === 'bi-monthly' ? 'selected' : '' }}>BiMonthly</option>
                                    <option value="monthly" {{ $company->review_period === 'monthly' ? 'selected' : '' }}>Monthly</option>
                                </select>
                            </label>
                        </div>
                        <div class="cell large-4">
                            <h5>Address</h5>
                            <label for="name"> City
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-pencil"></i></span>
                                    <input class="input-group-field" id="city" type="text" name="city" placeholder="City" value="{{ $company->address->city }}">
                                </div>
                            </label>

                            <label for="state"> State
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-pencil"></i></span>
                                    <input class="input-group-field" id="state" type="text" name="state" placeholder="State" value="{{ $company->address->state }}">
                                </div>
                            </label>

                            <label for="name"> Zip Code
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-pencil"></i></span>
                                    <input class="input-group-field" id="zip" type="text" name="zip_code" placeholder="Zip Code" value="{{ $company->address->zip_code }}">
                                </div>
                            </label>

                            <label for="name"> Street
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-street-view"></i></span>
                                    <input class="input-group-field" id="street" type="text" name="street" placeholder="Street" value="{{ $company->address->street }}">
                                </div>
                            </label>

                            <label for="name"> Service Tier
                                <div class="input-group">
                                    <select name="service_tier" id="service_tier">
                                        @foreach($serviceTiers as $serviceTier)
                                            <option value="{{ $serviceTier->id }}" {{ $company->serviceTier->id === $serviceTier->id ? 'selected' : '' }}>{{ $serviceTier->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </label>

                            <button class="button success float-right input-margin-fix"><i class="fa fa-plus"></i> Edit Company</button>
                        </div>
                    </div>

                </form>



                @if(session('company'))
                    <div class="callout success" data-closable="slide-out-right">
                        <h5>Success.</h5>
                        <p>{{ session('company') }} Updated Successfully</p>
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