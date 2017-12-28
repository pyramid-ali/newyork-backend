<?php

namespace App\Jobs;

use App\Company;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class PayrollInterm implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $payroll;
    private $company;

    /**
     * PayrollInterm constructor.
     * @param $payroll
     * @param $company
     */
    public function __construct($payroll, Company $company)
    {
        $this->payroll = base64_decode($payroll);
        $this->company = $company;
    }


    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
    }
}
