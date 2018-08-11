<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AddressTest extends TestCase
{
    use RefreshDatabase;
    /**
     * @test
     */
    public function authorized_user_can_define_an_address_for_own_company()
    {
        $this->signIn()
            ->companies()
            ->create(make('App\Company')->toArray());

        $this->post('/companies/address', $address = make('App\Address')->toArray())
            ->assertStatus(201);

        $this->assertDatabaseHas('addresses', $address);
    }

    /**
     * @test
     */
    public function authorized_user_can_only_attach_one_address_to_own_company()
    {
        $company = $this->signIn()
            ->companies()
            ->create(make('App\Company')->toArray());

        $company->address()->create(make('App\Address')->toArray());

        $this->post('/companies/address', $address = make('App\Address')->toArray())
            ->assertStatus(403);

        $this->assertEquals($company->address()->count(), 1);
    }
}
