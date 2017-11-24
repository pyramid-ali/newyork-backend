@extends('company.dashboard')

@section('dashboard-content')
    <header>
        <h3><i class="fa fa-plus"></i> Edit Employee - {{ $employee->first_name . ' ' . $employee->last_name }}</h3>
    </header>

    <div class="create-user-form-wrapper">
        <div class="grid-x">
            <div class="cell">

                <form action="{{ route('employees.update', ['company' => $company->name, 'employee' => $employee->id]) }}" method="post">
                    {{ csrf_field() }}
                    {{ method_field('put') }}
                    <div class="grid-x grid-padding-x align-center">
                        <div class="cell large-3">
                            <label for="first-name"> First Name
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-user-circle-o"></i></span>
                                    <input class="input-group-field"
                                           id="first-name"
                                           type="text"
                                           name="first_name"
                                           placeholder="First Name - Required"
                                           value="{{ $employee->first_name }}">
                                </div>
                            </label>
                            <label for="last-name"> Last Name
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-user-circle-o"></i></span>
                                    <input class="input-group-field" id="last-name" type="text" name="last_name" placeholder="Last Name - Required" value="{{ $employee->last_name }}">
                                </div>
                            </label>
                            <label for="employee_id"> Employee Id
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-universal-access"></i></span>
                                    <input class="input-group-field" id="employee_id" type="text" name="employee_id" placeholder="Employee Id - Required" value="{{ $employee->employee_id }}">
                                </div>
                            </label>
                            <label for="file-number"> File Number
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-sort-numeric-asc"></i></span>
                                    <input class="input-group-field" id="file-number" type="text" name="file_number" placeholder="File Number - Required" value="{{ $employee->file_number }}">
                                </div>
                            </label>
                            <label for="batch-id"> Batch Id
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-pencil-square"></i></span>
                                    <input class="input-group-field" id="batch-id" type="text" name="batch_id" placeholder="Batch Id - required" value="{{ $employee->batch_id }}">
                                </div>
                            </label>
                            <label for="temp_department"> Temp Department
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-building"></i></span>
                                    <input class="input-group-field" id="temp_department" type="text" name="temp_department" placeholder="Temp Department - required" value="{{ $employee->temp_department }}">
                                </div>
                            </label>

                        </div>
                        <div class="cell large-3">

                            <label for="reimbursement_rate"> Reimbursement Rate
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-random"></i></span>
                                    <input class="input-group-field" id="reimbursement_rate" type="text" name="reimbursement_rate" placeholder="Reimbursement Rate - Default is 0.53$, for 0.53$ type 53" value="{{ $employee->reimbursement_rate }}">
                                </div>
                            </label>
                            <label for="fulltime_threshold"> Full Time Threshold
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-clock-o"></i></span>
                                    <input class="input-group-field" id="fulltime_threshold" type="text" name="fulltime_threshold" placeholder="Full Time Threshold - Default is global Setting" value="{{ $employee->fulltime_threshold }}">
                                </div>
                            </label>
                            <label for="office"> Office
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-building-o"></i></span>
                                    <input class="input-group-field" id="office" type="text" name="office" placeholder="Office - Required" value="{{ $employee->office }}">
                                </div>
                            </label>

                            <label for="status"> Status
                                <select name="status" id="status">
                                    <option value="active" {{ $employee->status === 'active' ? 'selected' : '' }}>Active</option>
                                    <option value="inactive" {{ $employee->status === 'inactive' ? 'selected' : '' }}>InActive</option>
                                </select>
                            </label>

                            <label for="employee_type"> Employee Type
                                <select name="employee_type" id="employee_type">
                                    <option value="ft_office" {{ $employee->employee_type === 'ft_office' ? 'selected' : '' }}>FT Office</option>
                                    <option value="ft_patient" {{ $employee->employee_type === 'ft_patient' ? 'selected' : '' }}>FT Patient</option>
                                    <option value="pdm" {{ $employee->employee_type === 'pdm' ? 'selected' : '' }}>PDM</option>
                                </select>
                            </label>


                        </div>
                        <div class="cell large-3">
                            <label for="city"> City
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-pencil"></i></span>
                                    <input class="input-group-field" id="city" type="text" name="city" placeholder="City - Required" value="{{ $employee->address->city }}">
                                </div>
                            </label>
                            <label for="state"> State
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-pencil"></i></span>
                                    <input class="input-group-field" id="state" type="text" name="state" placeholder="State - Required" value="{{ $employee->address->state }}">
                                </div>
                            </label>
                            <label for="zip_code"> Zip Code
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-pencil"></i></span>
                                    <input class="input-group-field" id="zip_code" type="text" name="zip_code" placeholder="Zip Code - Required" value="{{ $employee->address->zip_code }}">
                                </div>
                            </label>
                            <label for="street"> Street
                                <div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-pencil"></i></span>
                                    <input class="input-group-field" id="street" type="text" name="street" placeholder="Street - Required" value="{{ $employee->address->street }}">
                                </div>
                            </label>
                            <button class="button success float-right input-margin-fix"><i class="fa fa-plus"></i> Edit Employee</button>
                        </div>
                    </div>

                </form>
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <h4>Some Errors occurred during form proccess</h4>
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li><i class="fa fa-times"></i> {{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </div>
        </div>
    </div>

@endsection