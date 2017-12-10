<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    //
    protected $fillable = [
        'name', 'batch_id', 'rate'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
