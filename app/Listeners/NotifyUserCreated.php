<?php

namespace App\Listeners;

use App\Events\NewUserCreated;
use App\Mail\NewUserRegistered;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class NotifyUserCreated
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
     * @param  NewUserCreated  $event
     * @return void
     */
    public function handle(NewUserCreated $event)
    {
        $company = $event->company;
        $user = $event->user;
        $password = $event->password;
        Mail::to($user)->send(new NewUserRegistered($company, $user, $password));
    }
}
