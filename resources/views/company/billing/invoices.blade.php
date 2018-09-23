@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3>
                    <i class="fa fa-user"></i> Invoices
                </h3>
            </header>

            <div class="users-table">
                <table>
                    @foreach ($invoices as $invoice)
                        <tr>
                            <td>{{ $invoice->date()->toFormattedDateString() }}</td>
                            <td>{{ $invoice->total() }}</td>
                            <td><a href="/invoice/{{ $invoice->id }}">Download</a></td>
                        </tr>
                    @endforeach
                </table>
            </div>

        </div>
    </div>

@endsection
