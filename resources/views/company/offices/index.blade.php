@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3>
                    <i class="fa fa-user"></i> Service Codes
                    <a class="button success" href="offices/create"><i class="fa fa-plus"></i> Add New</a>
                </h3>
            </header>

            <div class="users-table">
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Batch Id</td>
                        <td>Rate</td>
                        <td>Show</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($offices as $office)
                        <tr>
                            <td>{{ $office->name }}</td>
                            <td>{{ $office->batch_id }}</td>
                            <td>{{ $office->rate }}</td>
                            <td><a href="{{ route('offices.show', ['office' => $office->id, 'company' => $company->name]) }}"><i class="fa fa-eye"></i></a></td>
                            <td><a href="{{ route('offices.edit', ['office' => $office->id, 'company' => $company->name]) }}"><i class="fa fa-pencil"></i></a></td>
                            <td class="alert">
                                <a href="{{ route('offices.destroy', ['office' => $office->id, 'company' => $company->name]) }}"
                                   onclick="event.preventDefault();
                                           document.getElementById('{{ 'delete' . $office->id }}').submit();"><i class="fa fa-trash"></i></a>
                                <form id="{{ 'delete' . $office->id }}" action="{{ route('offices.destroy', ['office' => $office->id, 'company' => $company->name]) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    {{ method_field('delete') }}
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            {{ $offices->links() }}
        </div>
    </div>

@endsection
