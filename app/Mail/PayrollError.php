<?php

namespace App\Mail;

use App\Payroll;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PayrollError extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $payroll;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, Payroll $payroll)
    {
        $this->user = $user;
        $this->payroll = $payroll;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $user = $this->user;
        return $this->view('mail.payroll_error', compact('user', 'payroll'));
    }
}
