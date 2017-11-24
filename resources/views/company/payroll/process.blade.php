@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3><i class="fa fa-user-secret"></i> Process Payroll <a class="button primary" href="payroll/history"><i class="fa fa-history"></i> history</a></h3>
            </header>

            <section class="form Container">
                <form action="">
                    <label for="exampleFileUpload" class="button">Choose File</label>
                    <input type="file" id="exampleFileUpload" class="show-for-sr">
                </form>
            </section>

        </div>
    </div>

@endsection
