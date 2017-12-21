@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3><i class="fa fa-user-secret"></i> Processed Payroll <a class="button success" href="/payroll/process"><i class="fa fa-plus"></i> Process New</a></h3>
            </header>

            <div class="users-table">
                <table>
                    <thead>
                    <tr>
                        <td>File Name</td>
                        <td>Processed At</td>
                        <td>Delete Record</td>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

        </div>
    </div>

@endsection
