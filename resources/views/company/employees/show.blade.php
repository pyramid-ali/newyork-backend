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
                            <td>{{ $employee->employee_type ?? 'N/A'}}</td>
                        </tr>
                        <tr>
                            <td>Temp Department</td>
                            <td>{{ $employee->temp_department }}</td>
                        </tr>
                        <tr>
                            <td>Reimbursement Rate</td>
                            <td>${{ $employee->reimbursement_rate }}</td>
                        </tr>
                        <tr>
                            <td>Full Time Threshold</td>
                            <td>{{ $employee->fulltime_threshold }}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{{ $employee->status }}</td>
                        </tr>
                        <tr>
                            <td>Total Hour Expected for the day</td>
                            <td>{{ $employee->tehd or 'N\A' }}</td>
                        </tr>
                        <tr>
                            <td>Payment Rate </td>
                            <td>{{ $employee->rate or 'N\A' }}</td>
                        </tr>
                        <tr>
                            <td>Cell Phone Reimbursement </td>
                            <td>{{ $employee->cel or 'N\A' }}</td>
                        </tr>

                    </tbody>
                </table>

                <hr>
                <h4>Office</h4>
                <table>
                    <thead>
                    <tr>
                        <td>Property</td>
                        <td>Value</td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            @if($employee->office)
                                <td><a href="{{ '/offices/'.$employee->office->id }}">{{ $employee->office->name }}</a></td>
                            @else
                                <td>N/A</td>
                            @endif
                        </tr>
                        <tr>
                            <td>Batch ID</td>
                            @if($employee->office)
                                <td>{{ $employee->office->batch_id}}</td>
                            @else
                                <td>N/A</td>
                            @endif
                        </tr>
                    </tbody>
                </table>

                <hr>
                <h4>Service Codes</h4>
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Rate</td>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach($employee->serviceCodes as $serviceCode)
                            <tr>
                                <td>{{ $serviceCode->name }}</td>
                                <td>{{ ($employee->serviceCodeRate($serviceCode) ? $employee->serviceCodeRate($serviceCode) : 'Default') }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>

                <hr>
                <h4>Address</h4>
                <p>{{ $employee->address->street }} <br> {{ $employee->address->city . ', ' . $employee->address->state . ' ' . $employee->address->zip_code }}</p>
                <hr>
            </div>

        </div>
    </div>

@endsection
