<?php

Route::post('dropdown','FormController@dropdown');
Route::post('{mode}','FormController@createOrUpdate')->where('mode','update|create');
Route::post('delete','FormController@delete');