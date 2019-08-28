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
use Illuminate\Contracts\Auth\MustVerifyEmail as InterfaceMustVerifyEmail;
use App\Notifications\VerifyApiEmail;
use Illuminate\Support\Carbon;

/**
 * User modal
 * 
 * @property UserType $userType
 * @property int $u_id
 * @property string $u_name
 * @property string $u_email
 * @property string $u_passwordhenticatable;
 * @property int $ut_id
 * @property string $u_avatar
 * @property Permission[] $permissions
 * @property Children $children
 * @property Carbon $email_verified_at
 * @property string $u_token
 * 
 * @property int $u_social_provider
 * @property string $u_social_token
 * @property string|int $u_social_id 0=Normal,1=Facebook, 2= Google, 3= Twitter, 4=Linkedin
 */
class User extends Base implements
AuthenticatableContract,
AuthorizableContract,
CanResetPasswordContract,
InterfaceMustVerifyEmail
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
        'u_name', 'u_email', 'u_password','ut_id','u_avatar','email_verified_at','u_social_token','u_social_provider','u_social_id','u_token'
    ];

    protected $dates = [
        'deleted_at', 'created_at', 'updated_at','email_verified_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'u_password','u_social_token'
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

    public function donor(){
        return $this->hasOne(Donor::class,'u_id','u_id');
    }

    public function otherUser(){
        return $this->hasOne(OtherProfile::class,'u_id','u_id');
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

    public function getEmailAttribute() {
        return $this->attributes['u_email'];
    }
    
    public function setEmailAttribute($value) {
        $this->attributes['u_email'] = $value;
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyApiEmail); // my notification
    }

    /**
     * Converting provider name to integer
     *
     * @param string $provider
     * @return int
     */
    public static function providerId(string $provider){
        switch ($provider) {
            case 'facebook':
                return 1;
            case 'google':
                return 2;
            case 'twitter':
                return 3;
            case 'linkedin':
                return 2;
            default:
                return 0;
        }
    }

    public function getFormatedArray()
    {
        return [
            'name'=>$this->u_name,
            'type'=>$this->getRollName(),
            'id'=>$this->getKey(),
            'avatar'=>$this->u_avatar
        ];
    }

}
