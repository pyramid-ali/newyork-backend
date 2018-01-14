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

                <form action="{{ route('employees.service_codes.set_rate', ['employee' => $employee->id, 'company' => $company->name]) }}" method="post">
                    {{ csrf_field() }}
                    <fieldset class="fieldset">
                        <legend>Set Service Code Rate</legend>
                        <div class="grid-x grid-padding-x grid-padding-y align-bottom">
                            <div class="cell large-5">
                                <label for="service_code"> Service Code (Only assigned service code to employees show here)
                                    <select name="service_code" id="service_code">
                                        @foreach($employee->serviceCodes as $serviceCode)
                                            <option value="{{ $serviceCode->id }}">{{ $serviceCode->name }}</option>
                                        @endforeach
                                    </select>
                                </label>
                            </div>
                            <div class="cell large-5">
                                <label for="rate"> Rate
                                    <input type="text" name="rate" id="rate" placeholder="Rate, leave it blank for setting value to default">
                                </label>
                            </div>
                            <div class="cell large-2">
                                <button class="button primary">Submit</button>
                            </div>
                        </div>

                    </fieldset>
                </form>

                <form action="{{ route('employees.service_codes.store', ['employee' => $employee->id, 'company' => $company->name]) }}" method="post">
                    {{ csrf_field() }}
                    <fieldset class="fieldset">
                        <legend>Service Codes</legend>
                        @foreach($serviceCodes as $serviceCode)
                            <p>
                                <input id="{{ 'service' . $serviceCode->id }}"
                                       type="checkbox"
                                       name="services[]"
                                       value="{{ $serviceCode->id }}"
                                        {{ $employee->hasServiceCode($serviceCode) ? 'checked' : '' }}>
                                <label for="{{ 'service' . $serviceCode->id }}">
                                    {{ $serviceCode->name }}
                                    {{ $employee->hasServiceCode($serviceCode) ?
                                        '(value: ' .($employee->serviceCodeRate($serviceCode) ? $employee->serviceCodeRate($serviceCode) : 'Default')  . ')' :
                                        ''
                                    }}
                                </label>
                            </p>
                        @endforeach
                    </fieldset>
                    <button class="button primary">Submit</button>
                </form>

            </div>

        </div>
    </div>

@endsection
