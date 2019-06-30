<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\UserType;
use Faker\Generator as Faker;

$factory->define(UserType::class, function (Faker $faker) {
    return [
        'ut_name'=>'Admin',
        'ut_code'=>'ADMIN'
    ];
});
