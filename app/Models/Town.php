<?php
namespace App\Models;

class Town extends Base {
    protected $table="towns";

    protected $primaryKey="t_id";

    protected $fillable = [
        't_name','t_code','a_code'
    ];

    public function area(){
        return $this->belongsTo(Area::class,'a_id','a_id');
    }
}