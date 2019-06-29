<?php

Route::group(['prefix'=>'form/{form}'],function(){
    require_once('form.php');
});