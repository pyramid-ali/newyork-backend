@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3><i class="fa fa-users"></i> Import Batch Employees </h3>
            </header>

            <section class="form Container">
                <div id="employee-import"></div>
            </section>

            <hr>

            <section class="description">
                <h4><i class="fa fa-question-circle-o"></i> The input format should follow below rules</h4>
                <h5><i class="fa fa-exclamation-triangle"></i> First Column shows column headers and second rows shows related description</h5>
                <table class="import-desc">

                    <thead>
                        <tr>
                            <td>header</td>
                            <td>description</td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>Employee First Name</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>Employee Last Name</td>
                        </tr>
                        <tr>
                            <td>Temp Department</td>
                            <td>Temp Department (string)</td>
                        </tr>
                        <tr>
                            <td>Employee ID</td>
                            <td>Employee ID (numeric) - should be unique</td>
                        </tr>
                        <tr>
                            <td>Batch ID</td>
                            <td>Before importing employees you should create office related to existing batch ids in csv input</td>
                        </tr>
                        <tr>
                            <td>Employment Status</td>
                            <td>
                                <ol>
                                    <h6>This columns should follow this format:</h6>
                                    <li>For Per Diem employee should be (it's not case sensitive): "Per Diem"</li>
                                    <li>For Full Time Office this cell should contain "Office" word (it's not case sensitive)</li>
                                    <li>Any number provided by this cell after dividing by 10 consider as Total Expected Hour Per Day</li>
                                    <span class="text-info">Every employee that should not follow above rules consider as Full Time Patient</span>
                                </ol>
                            </td>
                        </tr>
                        <tr>
                            <td>Productivity Threshold</td>
                            <td>Should be a number</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>Employee City</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>Employee State</td>
                        </tr>
                        <tr>
                            <td>Zip Code</td>
                            <td>Employee Zip Code</td>
                        </tr>
                        <tr>
                            <td>Street</td>
                            <td>Employee Street</td>
                        </tr>
                    </tbody>


                </table>

                <h4><i class="fa fa-sticky-note"></i> Notes</h4>
                <ul>
                    <li>Column header is not case sensitive</li>
                    <li>Column header string convert to <a href="https://en.wikipedia.org/wiki/Snake_case">snake case</a>, then "First Name", "first name", "first_name" is equal but "firstname" is not accepted</li>
                    <li>Column header order is not matter</li>
                </ul>
            </section>



        </div>
    </div>

@endsection
