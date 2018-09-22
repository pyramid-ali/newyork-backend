<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PageView extends Model
{
    protected $fillable = [
        'route'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
