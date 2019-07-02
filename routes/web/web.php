<?php

Route::group(['prefix'=>'user'],function(){

    Route::post('login','UserController@login');
});

Route::group(['middleware'=>'auth:api'],function(){

    Route::group(['prefix'=>'form/{form}'],function(){
        require_once('form.php');
    });

});