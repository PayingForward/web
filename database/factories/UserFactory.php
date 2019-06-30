<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\User;
use Illuminate\Support\Str;
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

$factory->define(User::class, function (Faker $faker) {
    return [
        'u_name' => $faker->name,
        'u_email' => $faker->unique()->safeEmail,
        'u_password' => '$2y$12$2ReTU0FrHSwHvTphS68.keLynMVKVlL0x4HXH6xqpMO23FpYrZ762',
        'ut_id'=>1
    ];
});
