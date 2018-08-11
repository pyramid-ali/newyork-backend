<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp()
    {
        parent::setUp();

        $this->artisan('db:seed');
    }

    protected function signIn($role = 'subscriber')
    {
        $user = create('App\User')->assignRole($role);
        $this->actingAs($user);
        return $user;
    }

}
