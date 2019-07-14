<?php

namespace App\Models;

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