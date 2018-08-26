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

    /**
     * get user companies
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function companies()
    {
        return $this->belongsToMany(Company::class);
    }

    /**
     * get user company: $this->company
     *
     * @return Company
     */
    public function getCompanyAttribute()
    {
        return $this->companies->first();
    }

    /**
     * check a user belongs to a company or not
     *
     * @param $company
     * @return bool
     */
    public function hasCompany(Company $company)
    {
        return $this->company->id === $company->id;
    }

    public function hasCompanySlug($slug)
    {
        return $this->companies()->where('slug', $slug)->count() > 0;
    }

    /**
     * join a user to a company
     *
     * @param Company $company
     * @return array
     */
    public function joinToCompany(Company $company)
    {
        return $this->companies()->sync([$company->id]);
    }

    /**
     * convert to lower case user's name
     * @param $name
     */
    public function setNameAttribute($name)
    {
        $this->attributes['name'] = strtolower($name);
    }


    /**
     * get title case user's name
     */
    public function getNameAttribute()
    {
        return title_case($this->attributes['name']);
    }
}
