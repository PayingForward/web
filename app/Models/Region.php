<?php
namespace App\Models;

class Region extends Base{
    protected $table="regions";

    protected $primaryKey = 'r_id';

    protected $fillable=[
        'r_name','r_code','s_id'
    ];

    public function state(){
        return $this->belongsTo(State::class,'s_id','s_id');
    }
}