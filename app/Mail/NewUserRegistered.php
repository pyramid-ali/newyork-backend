<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewUserRegistered extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $company;
    public $user;
    public $password;

    /**
     * NewUserCreated constructor.
     * @param $company
     * @param $user
     * @param $password
     */
    public function __construct($company, $user, $password)
    {
        $this->company = $company;
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $user = $this->user;
        $company = $this->company;
        $password = $this->password;
        return $this->view('mail.new_user_created', compact('user', 'company', 'password'));
    }
}
