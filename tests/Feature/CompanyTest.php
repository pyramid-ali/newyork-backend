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
    public function authorized_user_can_see_company_index() {
        $this->signIn('admin');
        $this->get(route('companies.index'))
            ->assertStatus(200);
    }

    /**
     * @test
     */
    public function unauthorized_user_can_see_company_index() {

        $this->signIn('company_admin');
        $this->get(route('companies.index'))
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function authorized_user_can_see_create_company_form() {
        $this->signIn('admin');
        $this->get(route('companies.create'))
            ->assertStatus(200);
    }

    /**
     * @test
     */
    public function unauthorized_user_can_see_create_company_form() {

        $this->signIn('company_admin');
        $this->get(route('companies.create'))
            ->assertStatus(403);
    }


    /**
     * @test
     */
    public function authorized_user_can_create_company()
    {
        $this->signIn('admin');

        $company = make('App\Company')->toArray();
        $address = make('App\Address')->toArray();

        $this->post(route('companies.store'), array_merge($company, $address))
            ->assertStatus(201);

        $this->assertDatabaseHas('companies', $company);
        $this->assertDatabaseHas('addresses', $address);
    }

    /**
     * @test
     */
    public function unauthorized_user_cant_create_company()
    {
        $company = make('App\Company')->toArray();
        $address = make('App\Address')->toArray();

        $this->post(route('companies.store'), array_merge($company, $address))
            ->assertStatus(302)
            ->assertRedirect('/login');

        $this->signIn('company_admin');
        $this->post(route('companies.store'), array_merge($company, $address))
            ->assertStatus(403);

    }

    /**
     * @test
     */
    public function authorized_user_can_see_edit_company_form() {

        $this->signIn('admin');
        ($company = create('App\Company'))->address()->save(make('App\Address'));

        $this->get(route('companies.edit', $company))
            ->assertStatus(200);
    }

    /**
     * @test
     */
    public function unauthorized_user_can_see_edit_company_form() {

        $this->signIn('company_admin');
        ($company = create('App\Company'))->address()->save(make('App\Address'));

        $this->get(route('companies.edit', $company))
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function authorized_user_can_update_company()
    {
        $this->signIn('admin');

        ($company = create('App\Company'))
            ->address()->save($address = make('App\Address'));

        $newCompany = clone $company;
        $newCompany->name = make('App\Company')->name;

        $this->patch(route('companies.update', $company), array_merge($newCompany->toArray(), $address->toArray()))
            ->assertStatus(302);

        $this->assertDatabaseHas('companies', ['name' => $newCompany->name]);
        $this->assertDatabaseMissing('companies', ['name' => $company->name]);

    }

    /**
     * @test
     */
    public function unauthorized_user_cant_update_company()
    {
        $this->signIn('company_admin');
        ($company = create('App\Company'))
            ->address()->save($address = make('App\Address'));

        $this->patch(route('companies.update', $company), array_merge($company->toArray(), $address->toArray()))
            ->assertStatus(403);

    }

    /**
     * @test
     */
    public function authorized_user_can_destroy_company()
    {
        $this->signIn('admin');

        ($company = create('App\Company'))
            ->address()->save($address = make('App\Address'));

        $this->delete(route('companies.update', $company))
            ->assertStatus(302);

        $this->assertDatabaseMissing('companies', ['name' => $company->name]);

    }

    /**
     * @test
     */
    public function unauthorized_user_cant_destroy_company()
    {
        $this->signIn('company_admin');
        ($company = create('App\Company'))
            ->address()->save($address = make('App\Address'));

        $this->delete(route('companies.update', $company))
            ->assertStatus(403);

    }
}
