<?php
namespace App\Models;

class State extends Base {
    protected $table = "states";

    protected $primaryKey = "s_id";

    protected $fillable = [
        's_name','s_code','c_id'
    ];

    public function country(){
        return $this->belongsTo(Country::class,'c_id','c_id');
    }
}