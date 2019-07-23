<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Laravel\Passport\HasApiTokens;

/**
 * User modal
 * 
 * @property UserType $userType
 * @property int $u_id
 * @property string $u_name
 * @property string $u_email
 * @property string $u_password
 * @property int $ut_id
 * @property string $u_avatar
 * @property Permission[] $permissions
 * @property Children $children
 */
class User extends Base implements
AuthenticatableContract,
AuthorizableContract,
CanResetPasswordContract
{
    use Notifiable,Authenticatable, Authorizable, CanResetPassword, MustVerifyEmail,HasApiTokens;

    protected $table="users";

    protected $primaryKey = 'u_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'u_name', 'u_email', 'u_password','ut_id','u_avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'u_password'
    ];

    public function userType(){
        return $this->belongsTo(UserType::class,'ut_id','ut_id');
    }

    public function permissions(){
        return $this->hasMany(Permission::class,'u_id','u_id');
    }

    public function children(){
        return $this->hasOne(Children::class,'u_id','u_id');
    }

    public function getRollName(){

        $type = "donor";

        switch ($this->ut_id) {
            case config('usertypes.admin'):
                $type="admin";
                break;
            case config('usertypes.teacher') :
                $type="teacher";
                break;
            case config('usertypes.children') :
                $type="orphan";
                break;
            default:
                $type="donor";
                break;
        }

        return $type;

    }

}
