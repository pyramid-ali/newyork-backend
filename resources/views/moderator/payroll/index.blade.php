@extends('moderator.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3><i class="fa fa-user-secret"></i> Processed Payroll</h3>
            </header>

            <div class="users-table">
                <table>
                    <thead>
                    <tr>
                        <td>#id</td>
                        <td>Uploaded At</td>
                        <td>Company</td>
                        <td>Status</td>
                        <td>Rows</td>
                        <td>Employees</td>
                        <td>Api Calls</td>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($payrolls as $payroll)
                        <tr>
                            <td>{{ $payroll->id }}</td>
                            <td>{{ $payroll->created_at }}</td>
                            <td><a href="{{ route('companies.show', $payroll->company) }}">{{ $payroll->company->name }}</a></td>
                            @if($payroll->error)
                                <td>Error</td>
                            @elseif($payroll->processed)
                                <td>processed</td>
                            @elseif($payroll->processing)
                                <td><i class="fa fa-spinner fa-spin"></i></td>
                            @else
                                <td>Not Processed</td>
                            @endif
                            @if($payroll->processed)
                                <td>{{ $payroll->meta->rows }}</td>
                                <td>{{ $payroll->meta->employees }}</td>
                                <td>{{ $payroll->meta->api_calls }}</td>
                            @endif
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>


        </div>
        <div class="cell large-8">
            {{ $payrolls->links() }}
        </div>
    </div>

@endsection
