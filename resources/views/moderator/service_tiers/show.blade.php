@extends('moderator.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3><i class="fa fa-list"></i> {{ $serviceTier->name }} Tier</h3>
                <p>{{ $serviceTier->description }}</p>
            </header>

            <div class="users-table">

                <h4>Options</h4>
                <table class="table">
                    <thead>
                    <tr>
                        <td>Key</td>
                        <td>Value</td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Max Employees</td>
                            <td>{{ $serviceTier->meta->max_employees }}</td>
                        </tr>
                        <tr>
                            <td>Mileage Calculation</td>
                            <td>{{ $serviceTier->meta->mileage_calculation ? 'Yes' : 'No' }}</td>
                        </tr>
                    </tbody>
                </table>

                <hr>
            </div>

            <div class="users-table">

                <h4>Companies</h4>
                <table class="table">
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>Company</td>
                        <td>Company Employees</td>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($serviceTier->companies as $index => $company)
                        <tr>
                            <td>{{ $index + 1 }}</td>
                            <td><a href="{{ route('companies.show', $company) }}">{{ $company->name }}</a></td>
                            <td>{{ $company->employees()->count() }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>

                <hr>
            </div>
        </div>
    </div>

@endsection
