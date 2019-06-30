<?php

namespace App\Models;

/**
 * Roll of the user
 * 
 * @property string $ut_name
 * @property string $ut_code
 */
class UserType extends Base
{
    protected $fillable = [
        'ut_name','ut_code'
    ];

    protected $primaryKey = 'ut_id';

    protected $table = 'user_types';
}
