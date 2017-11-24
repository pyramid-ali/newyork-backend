<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{

    protected $fillable = [
        'city', 'state', 'zip_code', 'street'
    ];

    public function addressable()
    {
        return $this->morphTo();
    }
}
