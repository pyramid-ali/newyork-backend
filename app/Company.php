<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{

    protected $fillable = [
        'name', 'slug', 'account_number'
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

    public function offices()
    {
        return $this->hasMany(Office::class);
    }

    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }

    public static function build($name)
    {
        return static::create([
            'name' => $name,
            'slug' => str_slug($name),
            'account_number' => rand(100, 999)
        ]);
    }
}
