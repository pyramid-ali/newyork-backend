<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PayrollMeta extends Model
{
    protected $fillable = [
        'rows', 'employees', 'api_calls'
    ];

    public function payroll()
    {
        return $this->belongsTo(Payroll::class);
    }
}
