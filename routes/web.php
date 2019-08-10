<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
Route::get('/email/verify','Web\VerificationApiController@verify')->name('verificationapi.verify');
Route::post('/donate/box','Web\DonationController@renderPaymentBox');

Route::get('/user/social/{provider}/login','Web\SocialController@redirect')->where('provider','facebook|google|twitter');
Route::get('/user/social/{provider}/callback','Web\SocialController@callback')->where('provider','facebook|google|twitter');

Route::view('/{path?}', 'react')
     ->where('path', '.*')
     ->name('react');

