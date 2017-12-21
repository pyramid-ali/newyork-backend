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
}
