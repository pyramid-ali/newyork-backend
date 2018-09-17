<?php

namespace App\Rules;

use Braintree_Plan;
use Illuminate\Contracts\Validation\Rule;

class BrainTreePlan implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $plans = Braintree_Plan::all();
        foreach ($plans as $plan) {
            if ($plan->id === $value) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'the brain tree plans you chose not exist';
    }
}
