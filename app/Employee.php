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
        'batch_id',
        'temp_department',
        'reimbursement_rate',
        'fulltime_threshold',
        'status',
        'office'
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
}
