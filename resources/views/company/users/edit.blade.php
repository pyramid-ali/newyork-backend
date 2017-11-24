@extends('company.dashboard')

@section('dashboard-content')
    <header>
        <h3><i class="fa fa-plus"></i> Create New Manager</h3>
    </header>

    <div class="create-user-form-wrapper">
        <div class="grid-x">
            <div class="cell">

                <form action="{{ route('managers.update', ['company' => $company->name, 'id' => $user->id]) }}" method="post">
                    {{ csrf_field() }}
                    {{ method_field('patch') }}
                    <div class="grid-x grid-padding-x align-center">
                        <div class="cell large-4">
                            <label for="name"> Full Name
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-user-circle-o"></i></span>
                                    <input class="input-group-field" id="name" type="text" name="name" placeholder="Full Name" value="{{ $user->name }}">
                                </div>
                            </label>
                            <label for="email"> Email
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-envelope"></i></span>
                                    <input class="input-group-field" id="email" type="text" name="email" placeholder="Email@example.com" value="{{ $user->email }}">
                                </div>
                            </label>
                            <label for="password"> Password
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-key"></i></span>
                                    <input class="input-group-field" id="password" type="password" name="password" placeholder="User password, blank to auto generate">
                                </div>
                            </label>
                            <button class="button success float-right input-margin-fix"><i class="fa fa-plus"></i> Edit Manager</button>
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