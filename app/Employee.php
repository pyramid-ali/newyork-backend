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
        'temp_department',
        'reimbursement_rate',
        'fulltime_threshold',
        'status',
        'office_id',
        'cel',
        'metro_card',
        'rate',
        'tehd'
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
        if ($value) {
            return $value / 100;
        }

        return 0.53;
    }

    public function setReimbursementRateAttribute($value)
    {
        $this->attributes['reimbursement_rate'] = $value * 100;
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

        $serviceCode = $this->serviceCodes()->withPivot('rate')->get()->filter(function($serviceCode) use ($serviceCodeFind) {
            return $serviceCode->id === $serviceCodeFind->id;
        })->first();

        if ($serviceCode) {
            if ($serviceCode->pivot->rate) {
                return $serviceCode->pivot->rate;
            }
        }

        return $serviceCodeFind->rate;
    }

    public function rate(ServiceCode $serviceCodeFind)
    {

        if ($this->employee_type === 'pdm') {
            return $this->serviceCodeRate($serviceCodeFind);
        }

        return $this->rate;
    }

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function getFulltimeThresholdAttribute($value)
    {
        if (!!$value) {
            return $value;
        }

        return $this->company->fulltime_threshold;
    }

    public function getRateAttribute($value)
    {
        if (!!$value) {
            return $value;
        }

        if ($this->employee_type === 'pdm') {
            return 35;
        }

        if ($this->office->rate) {
            return $this->office->rate;
        }

        return 55;
    }

}
