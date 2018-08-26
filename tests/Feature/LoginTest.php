<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{

    use RefreshDatabase;

    /**
     * @test
     */
    public function guest_can_see_login_form()
    {
        $this->get('login')
            ->assertStatus(200);
    }

    /**
     * @test
     */
    public function all_Company_login_route_redirect_to_main_login_page()
    {
        $company = create('App\Company');
        $this->get(route('company.login', $company))
            ->assertRedirect(route('login'));
    }

    /**
     * @test
     */
    public function admin_redirect_to_admin_dashboard()
    {
        $password = '123456';
        $user = $this->createAdmin(['password' => bcrypt($password)]);

        $this->post('/login', ['email' => $user->email, 'password' => $password])
            ->assertRedirect(route('admin.dashboard'));
    }

    /**
     * @test
     */
    public function company_admin_redirect_to_own_company_dashboard()
    {
        $password = '123456';
        $user = $this->createCompanyAdmin(['password' => bcrypt($password)]);

        $this->post('/login', ['email' => $user->email, 'password' => $password])
            ->assertRedirect(route('company.dashboard', $user->company));

    }

    /**
     * create subscriber
     *
     * @param $attributes
     * @return User
     */
    private function createCompanyAdmin($attributes)
    {
        $user = create('App\User', $attributes);
        $user->assignRole('company_admin');
        $user->companies()->save(create('App\Company'));

        return $user;
    }

    /**
     * create subscriber
     *
     * @param $attributes
     * @return User
     */
    private function createAdmin($attributes)
    {
        $user = create('App\User', $attributes);
        $user->assignRole('admin');

        return $user;
    }
}
