<?php

namespace App\Utilities;


use App\EmailVerification;
use App\Mail\VerifyEmail;
use App\User;

class TokenManager
{
    protected $tokenLength;
    protected $token;
    protected $user;

    public function __construct()
    {
        $this->tokenLength = 25;
    }

    public function issue(User $user)
    {
        $this->user = $user;
        $this->token = $this->createToken();
        $this->storeToken($user->email, $this->token);
        return $this;
    }

    /**
     * @throws \Exception
     */
    public function send()
    {
        if(!$this->token) {
            throw new \Exception('no token issued');
        }

        \Mail::to($this->user)->queue(new VerifyEmail($this->user, $this->token));
    }

    protected function createToken()
    {
        return bin2hex(openssl_random_pseudo_bytes($this->tokenLength));
    }

    protected function storeToken($email, $token)
    {
        return EmailVerification::build([
            'email' => $email,
            'token' => $token
        ]);
    }

}