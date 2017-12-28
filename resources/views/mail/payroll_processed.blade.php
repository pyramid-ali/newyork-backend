<html>
<head>

    <style>

    </style>

</head>
<body>
<h3>
    Payroll #{{ $payroll->id  }} successfully processed
</h3>

<p>you can now got to your dashboard and download output file</p>

<p><a class="button success" href="{{ route('payroll.history', ['company' => $company->name]) }}">Go to Dashboard</a></p>
<p><a class="button success" href="{{ route('download.payroll.output', ['company' => $company->name, 'payroll' => $payroll->id]) }}">Download Now</a></p>

</body>
</html>

