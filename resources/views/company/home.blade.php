@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center align-middle">
        <div class="cell large-8 medium-10 small-12">
            <h4>Welcome, For Navigation Use left Menu</h4>

            <div class="container">
                <div class="grid-x">
                    <div class="cell large-4">
                        @if (Auth::user()->isAdmin())
                            <h5>Managers</h5>
                            <ul>
                                <li><a href="/managers">View All Managers</a></li>
                                <li><a href="/managers/create">Add New Manager</a></li>
                            </ul>
                        @endif
                        <h5>Offices</h5>
                        <ul>
                            <li><a href="/offices">View All Offices</a></li>
                            <li><a href="/offices/create">Add New Office</a></li>
                        </ul>
                    </div>
                    <div class="cell large-4">
                        <h5>Employees</h5>
                        <ul>
                            <li><a href="/employees">View All Employees</a></li>
                            <li><a href="/employees/create">Add New Employee</a></li>
                            <li><a href="/employees/import">Import Batch Employees From CSV File</a></li>
                            <li><a href="/employees/export">Export Batch Employees to CSV File</a></li>
                        </ul>
                        <h5>Payrolls</h5>
                        <ul>
                            <li><a href="/payroll/history">View Histories</a></li>
                            <li><a href="/payroll/process">Process new payroll</a></li>
                        </ul>
                    </div>
                    <div class="cell large-4">
                        <h5>Service Codes</h5>
                        <ul>
                            <li><a href="/service_codes">View All Service Codes</a></li>
                            <li><a href="/service_codes/create">Add New Service Code</a></li>
                        </ul>
                        <h5>Settings</h5>
                        <ul>
                            <li><a href="/settings/change_password">Change Password</a></li>
                            @if (Auth::user()->isAdmin())
                                <li><a href="/settings/general">Change Company General Settings</a></li>
                            @endif
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
