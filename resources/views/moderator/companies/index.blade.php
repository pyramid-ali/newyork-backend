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
                        <td>Activation</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($companies as $company)
                        <tr>
                            <td><a href="{{ route('companies.show', $company) }}">{{ $company->name }}</a></td>
                            <td>{{ $company->code }}</td>
                            <td>{{ $company->fulltime_threshold }}</td>
                            <td>{{ $company->review_period }}</td>
                            <td>{{ $company->account_number }}</td>
                            <td>
                                <a href="{{ route('companies.settings.toggle_activation', $company) }}"
                                   onclick="event.preventDefault();
                                           document.getElementById('{{ 'toggleActivation' . $company->id }}').submit();">{{ $company->is_active ? 'Deactivate' : 'Activate' }}</a>
                                <form id="{{ 'toggleActivation' . $company->id }}" action="{{ route('companies.settings.toggle_activation', $company) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </td>
                            <td><a href="{{ route('companies.edit', $company) }}"><i class="fa fa-pencil"></i></a></td>
                            <td class="alert">
                                <a href="{{ route('companies.destroy', $company) }}"
                                   onclick="event.preventDefault();
                                           document.getElementById('{{ 'delete' . $company->id }}').submit();"><i class="fa fa-trash"></i></a>
                                <form id="{{ 'delete' . $company->id }}" action="{{ route('companies.destroy', $company) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    {{ method_field('delete') }}
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>

                @if(session('company'))
                    <div class="callout alert" data-closable="slide-out-right">
                        <h5>Success.</h5>
                        <p>{{ session('company') }} Removed successfully</p>
                        <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                @endif
            </div>
            {{ $companies->links() }}
        </div>
    </div>

@endsection
