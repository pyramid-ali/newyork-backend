<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceTier extends Model
{

    protected $metaObj;

    protected $fillable = [
        'name', 'description'
    ];

    public function companies()
    {
        return $this->belongsToMany(Company::class);
    }

    public function getMetaAttribute()
    {
        if (is_null($this->metaObj)) {
            $this->metaObj = new ServiceTierMeta($this);
        }

        return $this->metaObj;
    }

    public function getRouteKeyName()
    {
        return 'name';
    }

    public static function build($data)
    {
        $tier = ServiceTier::create([
            'name' => $data['name'],
            'description' => $data['description']
        ]);

        $tier->updateMeta($data);

        return $tier;
    }

    public function updateMeta($data)
    {
        $this->meta->max_employees = $data['max_employees'];
        $this->meta->mileage_calculation = isset($data['mileage_calculation']);

        return $this;
    }

    public function setNameAttribute($name)
    {
        $this->attributes['name'] = strtolower($name);
    }

    public function getNameAttribute()
    {
        return title_case($this->attributes['name']);
    }

}
