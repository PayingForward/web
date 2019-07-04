<?php

Route::group(['prefix'=>'user'],function(){

    Route::post('login','UserController@login');

    Route::post('info','UserController@info')->middleware('auth:api');
});

Route::group(['middleware'=>'auth:api'],function(){

    Route::group(['prefix'=>'form/{form}'],function(){
        require_once('form.php');
    });

});
