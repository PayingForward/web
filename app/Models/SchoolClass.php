<?php
namespace App\Models;

class SchoolClass extends Base {
    protected $table = "school_classes";

    protected $primaryKey = "sc_id";

    protected $fillable = ['sc_name','sc_code','scl_id','u_id'];

    public function school(){
        return $this->belongsTo(School::class,'scl_id','scl_id');
    }

    public function user(){
        return $this->belongsTo(User::class,'u_id','u_id');
    }
}