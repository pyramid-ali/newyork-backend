<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Redirect;

class EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Illuminate\Http\Response
     */
    public function handle($request, Closure $next)
    {
        if (! $request->user() ||
            ($request->user() &&
                ! $request->user()->hasVerifiedEmail())) {
            return Redirect::route('verification.notice');
        }

        return $next($request);
    }
}
