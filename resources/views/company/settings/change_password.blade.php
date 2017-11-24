@extends('company.dashboard')

@section('dashboard-content')
    <header>
        <h3><i class="fa fa-key"></i> Change Password</h3>


    </header>

    <div class="create-user-form-wrapper">
        <div class="grid-x">
            <div class="cell">

                <form action="{{ route('settings.change_password.update', ['company' => $company->name]) }}" method="post">
                    {{ csrf_field() }}
                    {{ method_field('put') }}
                    <div class="grid-x grid-padding-x align-center">
                        <div class="cell large-4">
                            <h5>Change Password</h5>
                            <label for="password">New Password
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-key"></i></span>
                                    <input class="input-group-field" id="password" type="password" name="password" placeholder="Type new Password">
                                </div>
                            </label>
                            <label for="confirm_password"> Confirm Password
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-key"></i></span>
                                    <input class="input-group-field" id="confirm_password" type="password" name="confirm_password" placeholder="Repeat New Password">
                                </div>
                            </label>

                            <button class="button success float-right input-margin-fix"><i class="fa fa-plus"></i> Change Password</button>
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