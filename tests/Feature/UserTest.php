<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function authrozied_user_can_see_user_index()
    {
        $users = create('App\User', [], 5)
            ->each(function ($u) {
                $u->assignRole('company_admin');
            });

        $this->signIn('admin');

        $response = $this->get(route('users.index'))
            ->assertStatus(200);

        foreach ($users as $user) {
            $response->assertSee($user->email);
        }
    }

    /**
     * @test
     */
    public function unauthrozied_user_cant_see_user_index()
    {
        $this->get(route('users.index'))
            ->assertStatus(302)
            ->assertRedirect('/login');

        $this->signIn();

        $this->get(route('users.index'))
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function admin_should_not_see_own_user_in_user_index()
    {
        $admin = $this->signIn('admin');

        $this->get(route('users.index'))
            ->assertStatus(200)
            ->assertViewMissing($admin->email);
    }

    /**
     * @test
     */
    public function authrozied_user_can_see_user_creation_form()
    {
        $this->signIn('admin');

        $this->get(route('users.create'))
            ->assertStatus(200);
    }

    /**
     * @test
     */
    public function unauthrozied_user_cant_see_user_creation_form()
    {
        $this->signIn();

        $this->get(route('users.create'))
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function authorized_user_can_create_any_user_type()
    {
        $this->signIn('admin');
        $roles = ['admin', 'company_admin', 'company_manager'];

        foreach ($roles as $role) {
            $data = array_merge($user = make('App\User')->toArray(), [
                'password' => 'secret',
                'company' => create('App\Company')->id,
                'role' => $role
            ]);

            $this->post(route('users.store'), $data)
                ->assertStatus(302);

            $this->assertDatabaseHas('users', ['email' => $user['email']]);

            $this->assertTrue(User::where('email', $user['email'])->first()->hasRole($role));
        }

    }

    /**
     * @test
     */
    public function unauthorized_user_cant_create_user()
    {
        $this->post(route('users.store'), [])
            ->assertStatus(302)
            ->assertRedirect('/login');

        $this->signIn();

        $this->post(route('users.store'), [])
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function authorized_user_can_see_edit_user_form()
    {
        $this->signIn('admin');

        ($user = create('App\User'))->assignRole('company_admin');
        $user->companies()->save(make('App\Company'));

        $this->get(route('users.edit', $user))
            ->assertStatus(200)
            ->assertSee($user->email);
    }

    /**
     * @test
     */
    public function unauthorized_user_cant_see_edit_user_form()
    {
        $this->signIn();

        $user = create('App\User');

        $this->get(route('users.edit', $user))
            ->assertStatus(403);
    }

    /**
     * @test
     */
    public function authorized_user_can_update_user()
    {
        $this->signIn('admin');

        ($user = create('App\User'))->assignRole('company_admin');
        $user->companies()->save(make('App\Company'));

        $this->patch(route('users.update', $user), $newUser = make('App\User')->toArray())
            ->assertStatus(302);

        $this->assertDatabaseHas('users', ['email' => $newUser['email']]);
        $this->assertDatabaseMissing('users', $user->toArray());
    }
}
