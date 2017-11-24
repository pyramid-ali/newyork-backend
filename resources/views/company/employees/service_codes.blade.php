@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3>
                    <i class="fa fa-user"></i> Assign Service Codes
                </h3>
                <h5>Employee - {{ $employee->first_name . ' ' . $employee->last_name }} (id: {{$employee->employee_id}})</h5>
            </header>

            <div class="service-codes">
                <p>Attach service code to this employee</p>
                <form action="{{ route('employees.service_codes.store', ['employee' => $employee->id, 'company' => $company->name]) }}" method="post">
                    {{ csrf_field() }}
                    <fieldset class="fieldset">
                        <legend>Service Codes</legend>
                        @foreach($serviceCodes as $serviceCode)
                            <input id="{{ 'service' . $serviceCode->id }}"
                                   type="checkbox"
                                   name="services[]"
                                   value="{{ $serviceCode->id }}"
                                    {{ $employee->hasServiceCode($serviceCode) ? 'checked' : '' }}>
                            <label for="{{ 'service' . $serviceCode->id }}">{{ $serviceCode->name }}
                            </label>
                        @endforeach
                    </fieldset>
                    <button class="button primary">Submit</button>
                </form>

            </div>

        </div>
    </div>

@endsection
