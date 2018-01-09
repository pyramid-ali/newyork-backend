<?php

namespace App\Events;

use App\Company;
use App\Payroll;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Facades\Log;

class PayrollProcessed implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $payroll;
    public $company;
    public $user;

    /**
     * Create a new event instance.
     *
     * @param Company $company
     * @param Payroll $payroll
     * @param User $user
     */
    public function __construct(Company $company, Payroll $payroll, User $user)
    {
        $this->company = $company;
        $this->payroll = $payroll;
        $this->user = $user;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('payrolls.user.'. $this->user->id);
    }

    public function broadcastAs()
    {
        return 'processed';
    }

}
