<html>
    <head>

        <style>

        </style>

    </head>
    <body>
        <h3>
            Dear {{ $user->name }}, Your Invited to {{ $company->name }}
        </h3>

        <p>you can access to your account with below credentials</p>
        <table>
            <tr>
                <td>Username:</td>
                <td>{{ $user->email }}</td>
            </tr>
            <tr>
                <td>Password:</td>
                <td>{{ $password }}</td>
            </tr>
        </table>

        <p><a href="{{ 'http://' . $company->name . '.calcuride.net' }}">login page</a></p>
    </body>
</html>

