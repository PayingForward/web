<?php
namespace App\Models;

class Area extends Base {
    protected $table="areas";

    protected $primaryKey="a_id";

    protected $fillable = [
        'a_name','a_code','r_code'
    ];

    public function region(){
        return $this->belongsTo(Region::class,'r_id','r_id');
    }
}