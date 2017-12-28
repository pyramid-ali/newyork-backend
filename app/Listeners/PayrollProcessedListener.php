<?php

namespace App\Listeners;

use App\Events\PayrollProcessed;
use App\User;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PayrollProcessedListener
{
    /**
     * Create the event listener.
     *
     * @param User $user
     */
    public function __construct() {}

    /**
     * Handle the event.
     *
     * @param  PayrollProcessed  $event
     * @return void
     */
    public function handle(PayrollProcessed $event)
    {
        \Mail::to($event->user)->send(new \App\Mail\PayrollProcessed($event->company, $event->user, $event->payroll));
    }
}
