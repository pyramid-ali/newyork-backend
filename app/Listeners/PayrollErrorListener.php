<?php

namespace App\Listeners;

use App\Events\PayrollError;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class PayrollErrorListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  PayrollError  $event
     * @return void
     */
    public function handle(PayrollError $event)
    {
        \Mail::to($event->user)->send(new \App\Mail\PayrollError($event->user, $event->payroll));
    }
}
