@extends('moderator.dashboard')

@section('dashboard-content')

    <div class="grid-x">
        <div class="cell">
            <header>
                <h3><i class="fa fa-list"></i> List of Companies</h3>
            </header>

            <div class="users-table">
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Code</td>
                        <td>Full Time Threshold</td>
                        <td>Update Review Period</td>
                        <td>Account Number</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($companies as $company)
                        <tr>
                            <td><a href="{{ route('companies.show', ['id' => $company->id]) }}">{{ $company->name }}</a></td>
                            <td>{{ $company->code }}</td>
                            <td>{{ $company->fulltime_threshold }}</td>
                            <td>{{ $company->review_period }}</td>
                            <td>{{ $company->account_number }}</td>
                            <td><a href="{{ route('companies.edit', ['id' => $company->id]) }}"><i class="fa fa-pencil"></i></a></td>
                            <td class="alert">
                                <a href="{{ route('companies.destroy', ['id' => $company->id]) }}"
                                   onclick="event.preventDefault();
                                           document.getElementById('{{ 'delete' . $company->id }}').submit();"><i class="fa fa-trash"></i></a>
                                <form id="{{ 'delete' . $company->id }}" action="{{ route('companies.destroy', ['id' => $company->id]) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    {{ method_field('delete') }}
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            {{ $companies->links() }}
        </div>
    </div>

@endsection
