<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable, HasRoles;

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

    protected $casts = [
        'is_active' => 'bool'
    ];

    public static function activate($email)
    {
        $user = static::where('email', $email)->first();
        $user->forceFill(['is_active' => true]);

        return $user;
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class);
    }

    public function hasCompany($presentCompany)
    {
        return $this->companies->filter(function ($company) use ($presentCompany) {
            return $company->id === $presentCompany->id;
        })->count() > 0;
    }
}
