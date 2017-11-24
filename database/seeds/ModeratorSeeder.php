<?php

use Illuminate\Database\Seeder;

class ModeratorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $moderator = \App\User::create([
            'name' => 'Ali Shabani',
            'email' => 'pyramidalish@gmail.com',
            'password' => bcrypt(123456)
        ]);

        $role = \App\Role::where('name', 'moderator')->first();
        $moderator->roles()->sync($role);
    }
}
