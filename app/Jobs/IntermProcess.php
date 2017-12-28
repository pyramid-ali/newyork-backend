<?php

namespace App\Jobs;

use App\Company;
use App\Payroll;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Maatwebsite\Excel\Facades\Excel;

class IntermProcess implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $file;
    private $company;
    private $payroll;
    private $user;
    private $rows;

    /**
     * Create a new job instance.
     *
     * @param Company $company
     * @param Payroll $payroll
     * @param User $user
     */
    public function __construct(Company $company, Payroll $payroll, User $user)
    {
        $this->file = 'storage/app/public/' . $payroll->path;
        $this->payroll = $payroll;
        $this->company = $company;
        $this->user = $user;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->rows = $this->getRows()->groupBy(function ($item, $key) {
            return (string) $item['empid'];
        });
    }

    private function getRows()
    {
        $rows = Excel::load($this->file)->get();
        return $this->modifyRows($rows);
    }

    private function modifyRows($rows)
    {
        return $rows;
    }



}
