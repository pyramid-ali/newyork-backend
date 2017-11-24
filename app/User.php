<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class);
    }

    public function scopeModerators($query)
    {
        return $query->whereHas('roles', function ($query) {
            return $query->where('name', 'moderator');
        });
    }

    public function scopeAdmins($query)
    {
        return $query->whereHas('roles', function ($query) {
            return $query->where('name', 'admin');
        });
    }

    public function scopeManagers($query)
    {
        return $query->whereHas('roles', function ($query) {
            return $query->where('name', 'manager');
        });
    }

    public function isModerator()
    {
        return $this->hasRole('moderator');
    }

    public function isAdmin()
    {
        return $this->hasRole('admin');
    }

    public function isManager()
    {
        return $this->hasRole('manager');
    }

    public function hasRole($roleName)
    {
        return $this->roles->filter(function ($role) use ($roleName) {
                return $role->name === $roleName;
            })->count() > 0;
    }

    public function hasCompany($presentCompany)
    {
        return $this->companies->filter(function ($company) use ($presentCompany) {
            return $company->id === $presentCompany->id;
        })->count() > 0;
    }
}
