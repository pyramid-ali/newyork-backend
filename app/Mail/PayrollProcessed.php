<?php

namespace App\Mail;

use App\Company;
use App\Payroll;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PayrollProcessed extends Mailable
{
    use Queueable, SerializesModels;

    public $company;
    public $user;
    public $payroll;

    /**
     * Create a new message instance.
     *
     * @param Company $company
     * @param User $user
     * @param Payroll $payroll
     */
    public function __construct(Company $company, User $user, Payroll $payroll)
    {
        $this->company = $company;
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
        $company = $this->company;
        $user = $this->user;
        $payroll = $this->payroll;
        return $this->view('mail.payroll_processed', compact('company', 'user', 'payroll'));
    }
}
