<?php

namespace App\Http\Middleware;

use App\Company;
use Closure;

class CompanyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $company = \Route::input('company');
        $user = \Auth::user();
        if ($user->hasCompany($company)) {
            return $next($request);
        }

        return redirect('/login');
    }
}
