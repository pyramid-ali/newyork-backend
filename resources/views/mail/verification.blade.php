<html>
<head>
    <style>
    </style>
</head>
<body>
    <h3>
        Dear {{ $user->name }}, Your account registered successfully, for activating you account please click on below link
    </h3>
    <p>
        <a href="{{ route('email.verification', ['token' => $token]) }}">Verify Me</a>
    </p>
</body>
</html>

