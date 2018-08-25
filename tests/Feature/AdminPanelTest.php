<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function only_admin_user_can_access_admin_panel()
    {
        $this->signIn('admin');

        $this->get('/admin/dashboard')
            ->assertStatus(200);
    }

    /**
     * @test
     */
    public function non_admin_user_cant_access_to_admin_dashboard()
    {
        // sign in as subscriber
        $this->signIn('subscriber');

        $this->get('/admin/dashboard')
            ->assertStatus(403);

        // sign in as manager
        $this->signIn('manager');

        $this->get('/admin/dashboard')
            ->assertStatus(403);
    }
}
