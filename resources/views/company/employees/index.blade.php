@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3>
                    <i class="fa fa-user"></i> Employees
                    <a class="button success" href="employees/create"><i class="fa fa-plus"></i> Add New</a>
                    <a class="button primary" href="employees/import"><i class="fa fa-plus"></i> Batch Import</a>
                </h3>
            </header>


            <div class="search-container">

                <form action="{{ route('employees.search', ['company' => $company->name]) }}" method="get">
                    <div class="grid-x grid-padding-x">
                        <div class="cell large-4 medium-6 small-12">
                            <label for="first-name"> First Name
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-user-circle-o"></i></span>
                                    <input class="input-group-field" id="first-name" type="text" name="first_name" placeholder="First Name - Required" value="{{ request('first_name') }}">
                                </div>
                            </label>
                        </div>
                        <div class="cell large-4 medium-6 small-12">
                            <label for="last-name"> Last Name
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-user-circle-o"></i></span>
                                    <input class="input-group-field" id="last-name" type="text" name="last_name" placeholder="Last Name - Required" value="{{ request('last_name') }}">
                                </div>
                            </label>
                        </div>
                        <div class="cell large-4 medium-6 small-12">
                            <label for="employee_id"> Employee Id
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-universal-access"></i></span>
                                    <input class="input-group-field" id="employee_id" type="text" name="employee_id" placeholder="Employee Id - Required" value="{{ request('employee_id') }}">
                                </div>
                            </label>
                            <button class="button success float-right input-margin-fix"><i class="fa fa-search"></i> Search</button>
                        </div>
                    </div>

                </form>

            </div>


            <div class="users-table">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Type</td>
                            <td>See More</td>
                            <td>Assign Service Codes</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach($employees as $employee)
                        <tr>
                            <td>{{ $employee->employee_id }}</td>
                            <td>{{ $employee->first_name . ' ' . $employee->last_name }}</td>
                            <td>{{ $employee->employee_type ?? 'N\A' }}</td>
                            <td><a href="{{ route('employees.show', ['employee' => $employee->id, 'company' => $company->name]) }}"><i class="fa fa-eye"></i></a></td>
                            <td><a href="{{ route('employees.service_codes.show', ['employee' => $employee->id, 'company' => $company->name]) }}"><i class="fa fa-plus-circle"></i></a></td>
                            <td><a href="{{ route('employees.edit', ['employee' => $employee->id, 'company' => $company->name]) }}"><i class="fa fa-pencil"></i></a></td>
                            <td class="alert">
                                <a href="{{ route('employees.destroy', ['employee' => $employee->id, 'company' => $company->name]) }}"
                                   onclick="event.preventDefault();
                                             document.getElementById('{{ 'delete' . $employee->id }}').submit();"><i class="fa fa-trash"></i></a>
                                <form id="{{ 'delete' . $employee->id }}" action="{{ route('employees.destroy', ['employee' => $employee->id, 'company' => $company->name]) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    {{ method_field('delete') }}
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            {{ $employees->links() }}
        </div>
    </div>

@endsection
