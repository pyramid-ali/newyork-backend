<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(\App\Company::class, function (Faker $faker) {
    $company = $faker->company;

    return [
        'name' => $company,
        'account_number' => $faker->randomNumber(3),
        'slug' => str_slug($company)
    ];
});

$factory->define(\App\Address::class, function(Faker $faker) {

    return [
        'city' => $faker->city,
        'state' => $faker->state,
        'zip_code' => $faker->postcode,
        'street' => $faker->streetAddress
    ];
});

$factory->define(\App\EmailVerification::class, function(Faker $faker) {
    return [
        'email' => $faker->email,
        'token' => str_random(50)
    ];
});
