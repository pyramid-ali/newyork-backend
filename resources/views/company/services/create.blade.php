@extends('company.dashboard')

@section('dashboard-content')
    <header>
        <h3><i class="fa fa-plus"></i> Create New Service Code</h3>
    </header>

    <div class="create-user-form-wrapper">
        <div class="grid-x">
            <div class="cell">

                <form action="{{ route('service_codes.store', ['company' => $company->name]) }}" method="post">
                    {{ csrf_field() }}
                    <div class="grid-x grid-padding-x align-center">
                        <div class="cell large-4">
                            <label for="name"> Name
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-address-book-o"></i></span>
                                    <input class="input-group-field" id="name" type="text" name="name" placeholder="Service Code Name - Required" value="{{ old('name') }}">
                                </div>
                            </label>
                            <label for="rate"> Rate
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-star-o"></i></span>
                                    <input class="input-group-field" id="rate" type="text" name="rate" placeholder="Rate - For Per Diem Employees" value="{{ old('rate') }}">
                                </div>
                            </label>
                            <label for="unit"> Unit
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-bolt"></i></span>
                                    <input class="input-group-field" id="unit" type="text" name="unit" placeholder="Unit - Required" value="{{ old('unit') }}">
                                </div>
                            </label>
                            <button class="button success float-right input-margin-fix"><i class="fa fa-plus"></i> Create Service Code</button>

                        </div>
                        <div class="cell large-4">
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
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>

@endsection