<?php

namespace App\Models;

/**
 * School model
 * 
 * @property int $scl_id
 * @property string $scl_name
 * @property string $scl_code
 * @property int $t_id
 * @property int $u_id
 * @property string $scl_logo
 */
class School extends Base {
    protected $table = "schools";

    protected $primaryKey = "scl_id";

    protected $fillable = ['scl_name','scl_code','t_id','u_id','scl_logo'];

    public function user(){
        return $this->belongsTo(User::class,'u_id','u_id');
    }

    public function town(){
        return $this->belongsTo(Town::class,'t_id','t_id');
    }
}