<?php

namespace App\Models;

/**
 * Roll of the user
 * 
 * @property string $ut_name
 * @property string $ut_code
 * @property Permission[] $permissions
 */
class UserType extends Base
{
    protected $fillable = [
        'ut_name','ut_code'
    ];

    protected $primaryKey = 'ut_id';

    protected $table = 'user_types';

    public function permissions(){
        return $this->hasMany(Permission::class,'ut_id','ut_id');
    }
}
