<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
    protected $fillable = [
        'name', 'code', 'fulltime_threshold', 'review_period', 'account_number'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function serviceCodes()
    {
        return $this->hasMany(ServiceCode::class);
    }
}
