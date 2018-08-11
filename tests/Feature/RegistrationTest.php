<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * a guest user can register to system
     * @test
     */
    public function guest_can_register()
    {
        $this->post('/register', array_merge(($user = make('App\User')->toArray()), ['password' => '123456']))
            ->assertStatus(201)
            ->assertSessionHas('registered', true);

        $this->assertDatabaseHas('users', $user);
    }

    /**
     * @test
     */
    public function logged_in_user_cant_register()
    {
        $this->signIn();
        $this->post('/register', array_merge(($user = make('App\User')->toArray()), ['password' => '123456']))
            ->assertRedirect('/home');
    }

    /**
     * @test
     */
    public function registered_user_should_have_subscriber_role()
    {
        $this->post('/register', array_merge(($user = make('App\User')->toArray()), ['password' => '123456']));
        $this->assertTrue(User::where('email', $user['email'])->first()->hasRole('subscriber'));
    }

    /**
     * @test
     */
    public function registered_user_should_be_inactive()
    {
        $this->post('/register', array_merge(($user = make('App\User')->toArray()), ['password' => '123456']))
            ->assertStatus(201);
        $this->assertFalse(User::where('email', $user['email'])->first()->is_active);
    }

    /**
     * @test
     */
    public function registered_user_should_receive_email_verification()
    {
        $this->post('/register', array_merge(($user = make('App\User')->toArray()), ['password' => '123456']))
            ->assertStatus(201);

        $this->assertDatabaseHas('email_verifications', [
            'email' => $user['email']
        ]);
    }

    /**
     * @test
     */
    public function activate_user_after_email_verified()
    {
        $user = create('App\User');
        $verification = create('App\EmailVerification', ['email' => $user->email]);

        $this->get('/email/verification?token=' . $verification->token)
            ->assertStatus(200);

        $this->assertDatabaseMissing('email_verifications', [
            'token' => $verification->token,
        ]);

        $this->assertTrue($user->fresh()->is_active);
    }

    /**
     * @test
     */
    public function guests_can_see_register_form()
    {
        $this->get('/register')
            ->assertStatus(200)
            ->assertSee('form');
    }
}
