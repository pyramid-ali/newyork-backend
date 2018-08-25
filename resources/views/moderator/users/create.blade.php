@extends('moderator.dashboard')

@section('dashboard-content')
    <header>
        <h3><i class="fa fa-plus"></i> Create New User</h3>
        <h5>Notes</h5>
        <ul>
            <li>in this section you can define new users in any role</li>
            <li>For creating admin user for specific company please first create company then create admin for it</li>
            <li>also you can create manager for companies here, but this ability has for company admins also</li>
        </ul>

    </header>

    <div class="create-user-form-wrapper">
        <div class="grid-x">
            <div class="cell">

                <form action="{{ route('users.store') }}" method="post">
                    {{ csrf_field() }}
                    <div class="grid-x grid-padding-x align-center">
                        <div class="cell large-4">
                            <label for="name"> Full Name
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-user-circle-o"></i></span>
                                    <input class="input-group-field" id="name" type="text" name="name" placeholder="Full Name" value="{{ old('name') }}">
                                </div>
                            </label>
                            <label for="email"> Email
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-envelope"></i></span>
                                    <input class="input-group-field" id="email" type="text" name="email" placeholder="Email@example.com" value="{{ old('email') }}">
                                </div>
                            </label>
                            <label for="password"> Password
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-key"></i></span>
                                    <input class="input-group-field" id="password" type="password" name="password" placeholder="User password, blank to auto generate">
                                </div>
                            </label>
                        </div>
                        <div class="cell large-4">
                            <label id="company">Select Company
                                <select name="company" id="company">
                                    <option value="">None</option>
                                    @foreach($companies as $company)
                                        <option value="{{ $company->id }}" {{ old('company') == $company->id ? 'selected' : '' }}>{{ $company->name }}</option>
                                    @endforeach
                                </select>
                            </label>
                            <label id="role">Select User Role
                                <select name="role" id="role">
                                    @foreach($roles as $role)
                                        <option value="{{ $role->name }}" {{ old('role') == $role->id ? 'selected' : '' }}>{{ ucfirst($role->name) }}</option>
                                    @endforeach
                                </select>
                            </label>

                            <button class="button success float-right input-margin-fix"><i class="fa fa-plus"></i> Create New User</button>
                        </div>
                    </div>

                </form>

                @if(session('user'))
                    <div class="callout success" data-closable="slide-out-right">
                        <h5>Success.</h5>
                        <p>{{ session('user') }} created successfully</p>
                        <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                @endif

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
    </div>

@endsection