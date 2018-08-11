<?php

namespace App\Providers;

use App\Address;
use App\Company;
use App\Payroll;
use App\Policies\AddressPolicy;
use App\Policies\CompanyPolicy;
use App\Policies\PayrollPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Payroll::class => PayrollPolicy::class,
        Company::class => CompanyPolicy::class,
        Address::class => AddressPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::before(function ($user, $ability) {
            if ($user->hasRole('admin')) {
                return true;
            }
        });
    }
}
