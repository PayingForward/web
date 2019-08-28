<?php

Route::group(['prefix'=>'user'],function(){

    Route::post('login','UserController@login');
    Route::post('signup','UserController@signup');


    Route::post('info','UserController@info')->middleware('auth:api');

    Route::post('rand','UserController@getRandomChildrens');
});

Route::group(['prefix'=>'search'],function(){

    Route::post('/','SearchController@searchResults');

    Route::post('/age_range','SearchController@searchAgeRange');
    Route::post('/school','SearchController@searchSchool');
    Route::post('/town','SearchController@searchTowns');

});

Route::group(['middleware'=>['auth:api','verified']],function(){

    Route::post('/sidebar','PermissionController@sidebar');

    Route::group(['prefix'=>'donate'],function(){
        Route::post('/info','DonationController@getInfo');
        Route::post('/search','DonationController@history');
    });

    Route::group(['prefix'=>'form/{form}'],function(){
        require_once('form.php');
    });

    Route::group(['prefix'=>'home'],function(){
        Route::post('donor','HomeController@donorMenu');
    });

});

Route::group(['middleware'=>['auth.optional']],function(){
    Route::post('profile/load','ProfileController@load');
});
