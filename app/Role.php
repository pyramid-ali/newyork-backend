<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //

    protected $roles = [
        'moderator',
        'admin',
        'manager'
    ];

    protected $fillable = [
        'name'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function scopeManager($query)
    {
        return $query->where('name', 'manager');
    }
}
