@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3><i class="fa fa-user-secret"></i> Managers <a class="button success" href="managers/create"><i class="fa fa-plus"></i> Add New</a></h3>
            </header>

            <div class="users-table">
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach($users as $user)
                        <tr>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->email }}</td>
                            <td><a href="{{ route('managers.edit', ['id' => $user->id, 'company' => $company->id]) }}"><i class="fa fa-pencil"></i></a></td>
                            <td class="alert">
                                <a href="{{ route('managers.destroy', ['id' => $user->id, 'company' => $company->id]) }}"
                                   onclick="event.preventDefault();
                                             document.getElementById('{{ 'delete' . $user->id }}').submit();"><i class="fa fa-trash"></i></a>
                                <form id="{{ 'delete' . $user->id }}" action="{{ route('managers.destroy', ['id' => $user->id, 'company' => $company->id]) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    {{ method_field('delete') }}
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            {{ $users->links() }}
        </div>
    </div>

@endsection
