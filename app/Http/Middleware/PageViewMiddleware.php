<?php

namespace App\Http\Middleware;

use Closure;

class PageViewMiddleware
{

    private $skipWords = [
        'broadcasting',
        '/me'
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($user = $request->user()) {
            $route = url()->full();
            if (!str_contains($route, $this->skipWords)) {
                $user->visited(url()->full());
            }

        }
        return $next($request);
    }
}
