@extends('moderator.dashboard')

@section('dashboard-content')

    <div class="grid-x">
        <div class="cell">
            <header>
                <h3><i class="fa fa-list"></i> List of Users</h3>
            </header>

            <div class="users-table">
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Company</td>
                            <td>Role</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach($users as $user)
                        <tr>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->email }}</td>
                            @if($company = $user->company)
                                <td><a href="{{ route('companies.show', $company) }}">{{ $company->name }}</a></td>
                            @else
                                <td>-</td>
                            @endif
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

                @if(session('user'))
                    <div class="callout alert" data-closable="slide-out-right">
                        <h5>Success.</h5>
                        <p>{{ session('user') }} Removed successfully</p>
                        <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                @endif
            </div>
            {{ $users->links() }}
        </div>
    </div>

@endsection
