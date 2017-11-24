<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceCode extends Model
{
    //
    protected $fillable = [
        'name', 'rate', 'unit'
    ];

    public function employees()
    {
        return $this->belongsToMany(Employee::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function getUnitAttribute($value)
    {
        return $value / 100;
    }

    public function setUnitAttribute($value)
    {
        $this->attributes['unit'] = $value * 100;
    }
}
