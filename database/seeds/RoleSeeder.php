<?php

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Role::create(['name' => 'moderator']);
        \App\Role::create(['name' => 'admin']);
        \App\Role::create(['name' => 'manager']);
    }
}
