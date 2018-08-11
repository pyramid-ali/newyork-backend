<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmailVerification extends Model
{
    protected $guarded = [];

    public static function build($data)
    {
        static::where('email', $data['email'])->delete();
        return static::create($data);
    }

    /**
     * @param $token
     * @return bool
     * @throws \Exception
     */
    public static function verify($token)
    {
        if (!static::where('token', $token)->exists()) {
            throw new \Exception('No Token Found');
        }

        $email = static::where('token', $token)->first()->email;
        static::where('token', $token)->delete();
        return $email;
    }
}
