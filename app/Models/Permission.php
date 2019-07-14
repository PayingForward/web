<?php
namespace App\Models;

/**
 * Permission model
 * 
 * @property string $perm_path
 * @property int $u_id
 * @property int $ut_id
 * @property User $user
 * @property UserType $userType
 */
class Permission extends Base {
    protected $table="permissions";

    protected $primaryKey = "perm_id";

    protected $fillable = ['perm_path','u_id','ut_id'];

    public function user(){
        return $this->belongsTo(User::class,'u_id','u_id');
    }

    public function userType(){
        return $this->belongsTo(UserType::class,'ut_id','ut_id');
    }
}