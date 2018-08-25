<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Company extends Model
{

    protected $fillable = [
        'name', 'slug', 'code', 'fulltime_threshold', 'review_period', 'account_number'
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

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function addAddress(Request $request)
    {
        $this->address()->create($request->only([
            'city',
            'state',
            'zip_code',
            'street'
        ]));

        return $this;
    }

    public function updateAddress(Request $request)
    {
        $this->address()->update($request->only([
            'city',
            'state',
            'zip_code',
            'street'
        ]));

        return $this;
    }

    public static function build(Request $request)
    {
        $attributes = static::formInputAttributes($request);

        return static::create(
            array_merge(
                $attributes,
                ['slug' => str_slug($attributes['name'])]
            )
        );
    }

    protected static function formInputAttributes(Request $request)
    {
        return array_filter(
            $request->only([
                'name',
                'code',
                'fulltime_threshold',
                'review_period',
                'account_number'
            ])
        );
    }

    public function edit(Request $request)
    {
        $attributes = static::formInputAttributes($request);

        return $this->update(
            array_merge(
                $attributes,
                ['slug' => str_slug($attributes['name'])]
            )
        );
    }
}
