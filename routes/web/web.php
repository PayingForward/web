<?php

Route::group(['prefix'=>'user'],function(){

    Route::post('login','UserController@login');

    Route::post('info','UserController@info')->middleware('auth:api');

    Route::post('rand','UserController@getRandomChildrens');
});

Route::group(['prefix'=>'search'],function(){

    Route::post('/','SearchController@searchResults');

    Route::post('/age_range','SearchController@searchAgeRange');
    Route::post('/school','SearchController@searchSchool');
    Route::post('/town','SearchController@searchTowns');

});

Route::group(['middleware'=>'auth:api'],function(){

    Route::post('/sidebar','PermissionController@sidebar');

    Route::group(['prefix'=>'form/{form}'],function(){
        require_once('form.php');
    });

});
