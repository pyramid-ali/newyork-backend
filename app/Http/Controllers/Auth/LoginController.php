<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * show login form
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showLoginForm()
    {
        return view('auth.login');
    }

    /**
     * where to redirect user after login
     *
     * @return string
     */
    protected function redirectTo()
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return route('admin.dashboard');
        }

        return route('company.dashboard', auth()->user()->company);
    }

    /**
     * redirect company login pages to main login page
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirectToLogin()
    {
        return redirect()->route('login');
    }
}
