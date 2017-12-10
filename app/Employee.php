<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //
    protected $fillable = [
        'last_name',
        'first_name',
        'employee_type',
        'employee_id',
        'file_number',
        'temp_department',
        'reimbursement_rate',
        'fulltime_threshold',
        'status',
        'office_id',
        'cel',
        'metro_card'
    ];

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function getReimbursementRateAttribute($value)
    {
        return $value / 100;
    }

    public function serviceCodes()
    {
        return $this->belongsToMany(ServiceCode::class);
    }

    public function hasServiceCode(ServiceCode $serviceCodeFind)
    {

        return $this->serviceCodes->filter(function($serviceCode) use ($serviceCodeFind) {
            return $serviceCode->id === $serviceCodeFind->id;
        })->count() > 0;
    }

    public function serviceCodeRate(ServiceCode $serviceCodeFind)
    {
        return $this->serviceCodes()->withPivot('rate')->get()->filter(function($serviceCode) use ($serviceCodeFind) {
            return $serviceCode->id === $serviceCodeFind->id;
        })->first()->pivot->rate;
    }

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function getFulltimeThresholdAttribute()
    {
        if ($this->fulltile_threshold) {
            return $this->fulltile_threshold;
        }

        return $this->company->fulltime_threshold;
    }

}
