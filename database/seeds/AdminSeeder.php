<?php

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = \App\User::create([
            'name' => 'ali shabani',
            'email' => 'pyramidalish@gmail.com',
            'password' => bcrypt('123456')
        ]);

        $admin->assignRole('admin');
    }
}
