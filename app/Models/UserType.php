<?php

namespace App\Models;

class UserType extends Base
{
    protected $fillable = [
        'ut_name','ut_code'
    ];

    protected $primaryKey = 'ut_id';

    protected $table = 'user_types';
}
