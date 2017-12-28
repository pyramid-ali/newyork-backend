<?php

namespace App\Policies;

use App\User;
use App\Payroll;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class PayrollPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the payroll.
     *
     * @param  \App\User  $user
     * @param  \App\Payroll  $payroll
     * @return mixed
     */
    public function view(User $user, Payroll $payroll)
    {
        //
    }

    /**
     * Determine whether the user can create payrolls.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the payroll.
     *
     * @param  \App\User  $user
     * @param  \App\Payroll  $payroll
     * @return mixed
     */
    public function update(User $user, Payroll $payroll)
    {
        //
    }

    /**
     * Determine whether the user can delete the payroll.
     *
     * @param  \App\User  $user
     * @param  \App\Payroll  $payroll
     * @return mixed
     */
    public function delete(User $user, Payroll $payroll)
    {
        //
    }

    public function download(User $user, Payroll $payroll)
    {

        return $user->companies()->find($payroll->company->id);
    }
}
