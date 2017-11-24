@extends('moderator.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3><i class="fa fa-list"></i> Company - {{ $company->name }}</h3>
            </header>

            <div class="users-table">

                <h4>Information</h4>
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Code</td>
                        <td>Full Time Threshold</td>
                        <td>Update Review Period</td>
                        <td>Account Number</td>
                        <td>Edit</td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ $company->name }}</td>
                            <td>{{ $company->code }}</td>
                            <td>{{ $company->fulltime_threshold }}</td>
                            <td>{{ $company->review_period }}</td>
                            <td>{{ $company->account_number }}</td>
                            <td><a href="{{ route('companies.edit', ['id' => $company->id]) }}"><i class="fa fa-pencil"></i></a></td>
                        </tr>
                    </tbody>
                </table>

                <hr>

                <h4>Address</h4>
                <p>{{ $company->address->street }}</p>
                <p>{{ $company->address->city }}, {{ $company->address->state }} {{ $company->address->zip_code }}</p>

                <hr>

                <h4>Users</h4>
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Role</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($company->users as $user)
                        <tr>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->email }}</td>
                            <td>{{ $user->roles->first()->name }}</td>
                            <td><a href="{{ route('users.edit', ['id' => $user->id]) }}"><i class="fa fa-pencil"></i></a></td>
                            <td class="alert">
                                <a href="{{ route('users.destroy', ['id' => $user->id]) }}"
                                   onclick="event.preventDefault();
                                           document.getElementById('{{ 'delete' . $user->id }}').submit();"><i class="fa fa-trash"></i></a>
                                <form id="{{ 'delete' . $user->id }}" action="{{ route('users.destroy', ['id' => $user->id]) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    {{ method_field('delete') }}
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

@endsection
