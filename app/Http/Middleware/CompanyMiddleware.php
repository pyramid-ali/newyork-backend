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

        if ($user = auth()->user()) {

            if ($user->hasCompany($request->company)) {
                if ($user->company->is_active) {
                    return $next($request);
                }
                return redirect()->route('companies.inactive', $user->company);
            }

            abort(404);

        }

        return redirect()->route('login');
    }
}
