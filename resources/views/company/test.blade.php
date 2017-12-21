<form action="{{ route('payroll.process.store', ['company' => $company->name]) }}" method="post" enctype="multipart/form-data">
    {{ csrf_field() }}
    <input type="file" name="file">
    <input type="submit" value="upload">

</form>

{{ dd($errors) }}