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
                        <td>#id</td>
                        <td>Uploaded At</td>
                        <td>Status</td>
                        <td>Download Input File</td>
                        <td>Download Output File</td>
                        <td>Download Interm File</td>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach($payrolls as $payroll)
                            <tr>
                                <td>{{ $payroll->id }}</td>
                                <td>{{ $payroll->created_at }}</td>
                                @if($payroll->error)
                                    <td>Error</td>
                                @elseif($payroll->processed)
                                    <td>processed</td>
                                @elseif($payroll->processing)
                                    <td><i class="fa fa-spinner fa-spin"></i></td>
                                @else
                                    <td>Not Processed</td>
                                @endif
                                <td><a href="{{ route('download.payroll', ['company' => $company->name, 'payroll' => $payroll->id]) }}"><i class="fa fa-download"></i> Download</a></td>
                                @if($payroll->output_path)
                                    <td><a href="{{ route('download.payroll.output', ['company' => $company->name, 'payroll' => $payroll->id]) }}"><i class="fa fa-download"></i> Download</a></td>
                                @elseif(!$payroll->error)
                                    <td><i class="fa fa-times-circle"></i> No File</td>
                                @endif
                                @if($payroll->interim_path)
                                    <td><a href="{{ route('download.payroll.interm', ['company' => $company->name, 'payroll' => $payroll->id]) }}"><i class="fa fa-download"></i> Download</a></td>
                                @elseif(!$payroll->error)
                                    <td><i class="fa fa-times-circle"></i> No File</td>
                                @endif
                                @if($payroll->error)
                                    <td colspan="2">{{ $payroll->error }}</td>
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
