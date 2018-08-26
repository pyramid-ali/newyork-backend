<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp()
    {
        parent::setUp();
        $this->artisan('db:seed', ['--class' => 'RoleSeeder']);
    }

    /**
     * signIn with specific role to system
     *
     * @param string $role
     * @return mixed
     */
    protected function signIn($role = 'company_admin')
    {
        $user = create('App\User')->assignRole($role);
        $this->actingAs($user);
        return $user;
    }
}
