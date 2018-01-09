<?php

namespace App\Events;

use App\Payroll;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PayrollError implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $user;
    public $payroll;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user, Payroll $payroll)
    {
        $this->user = $user;
        $this->payroll = $payroll;
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
        return 'error';
    }
}
