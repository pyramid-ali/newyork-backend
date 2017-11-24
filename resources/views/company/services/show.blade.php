@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3>
                    <i class="fa fa-user"></i> Show Employee
                    <a class="button success" href="employees/create"><i class="fa fa-plus"></i> Add New</a>
                    <a class="button primary" href="{{ route('employees.edit', ['employee' => $employee->id, 'company' => $company->name]) }}"><i class="fa fa-pencil"></i> Edit</a>
                </h3>
                <h4>{{ $employee->first_name . ' ' . $employee->last_name }}</h4>
            </header>

            <div class="users-table">
                <table>
                    <thead>
                        <tr>
                            <td>Property</td>
                            <td>Value</td>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>ID</td>
                            <td>{{ $employee->employee_id }}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{{ $employee->first_name . ' ' . $employee->last_name }}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{{ $employee->employee_type}}</td>
                        </tr>

                        <tr>
                            <td>File Number</td>
                            <td>{{ $employee->file_number }}</td>
                        </tr>
                        <tr>
                            <td>Batch ID</td>
                            <td>{{ $employee->batch_id }}</td>
                        </tr>
                        <tr>
                            <td>Temp Department</td>
                            <td>{{ $employee->temp_department }}</td>
                        </tr>
                        <tr>
                            <td>Reimbursement Rate</td>
                            <td>{{ $employee->reimbursement_rate }} $</td>
                        </tr>
                        <tr>
                            <td>Full Time Threshold</td>
                            <td>{{ $employee->fulltime_threshold or $company->fulltime_threshold }}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{{ $employee->status }}</td>
                        </tr>
                        <tr>
                            <td>Office</td>
                            <td>{{ $employee->office }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    </div>

@endsection
