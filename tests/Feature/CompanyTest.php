<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CompanyTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function only_authorized_user_can_create_company()
    {
        $this->post('/companies', $company = make('App\Company')->toArray())
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function subscriber_can_create_company()
    {
        $this->signIn();
        $this->post('/companies', $company = make('App\Company')->toArray())
            ->assertStatus(201);

        $this->assertDatabaseHas('companies', [
            'name' => $company['name']
        ]);

        $this->assertNotNull(auth()->user()->companies()->where('name', $company['name'])->first());
    }

    /**
     * @test
     */
    public function subscribers_can_only_have_one_company()
    {
        $this->signIn();
        auth()->user()->companies()->save(create('App\Company'));
        $this->post('/companies', $company = make('App\Company')->toArray())
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function unauthorized_user_cant_create_company()
    {
        // not signIn
        $this->post('/companies', $company = make('App\Company')->toArray())
            ->assertStatus(403);

        // signed in as manager
        $this->signIn('manager');
        $this->post('/companies', $company = make('App\Company')->toArray())
            ->assertStatus(403);
    }
}
