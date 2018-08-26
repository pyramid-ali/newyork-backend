<?php

namespace App;

use Illuminate\Database\Eloquent\Concerns\HasAttributes;
use Illuminate\Support\Facades\DB;

class ServiceTierMetaParent {
    use HasAttributes;
}

class ServiceTierMeta extends ServiceTierMetaParent
{
    protected $serviceTier;

    protected $casts = [
        'max_employees' => 'int',
        'mileage_calculation' => 'bool'
    ];

    /**
     * ServiceTierMeta constructor.
     * @param $serviceTier
     */
    public function __construct($serviceTier)
    {
        $this->serviceTier = $serviceTier;
    }

    public function __get($key)
    {
        return $this->getAttribute($key);
    }

    public function getAttribute($key)
    {
        $value = $this->getAttributeValue($key);

        return $this->castAttribute($key, $value);
    }

    public function getAttributeValue($key)
    {
        return $this->getRow($key)->value;
    }

    public function getRow($key)
    {
        return DB::table('service_tiers')
            ->where('service_tiers.id', $this->serviceTier->id)
            ->join('service_tier_meta', 'service_tiers.id', '=', 'service_tier_meta.service_tier_id')
            ->where('service_tier_meta.key', $key)
            ->first();
    }

    public function __set($key, $value)
    {
        if ($row = $this->getRow($key)) {
            DB::table('service_tier_meta')
                ->where('id', $row->id)
                ->update([
                    'value' => (string) $value,
                ]);
            return;
        }

        DB::table('service_tier_meta')
            ->insert([
                'key' => $key,
                'value' => (string) $value,
                'service_tier_id' => $this->serviceTier->id
            ]);
    }

    /**
     * Get the value indicating whether the IDs are incrementing.
     *
     * @return bool
     */
    public function getIncrementing()
    {
        return false;
    }

}