<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    //
    protected $fillable = [
        'path'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function saveProcessedPayroll($epicPath, $interimPath)
    {
        $this->payroll->output_path = $epicPath;
        $this->payroll->interim_path = $interimPath;
        $this->processing = false;
        $this->processed = true;

        return $this->save();
    }

    public function failedToProcessPayroll($message)
    {
        $this->error = $message;
        return $this->save();
    }

    public function meta()
    {
        return $this->hasOne(PayrollMeta::class);
    }
}
