<?php
namespace App\Models;

/**
 * Region model
 * 
 * @property string $r_name
 * @property string $r_code
 * @property int $s_id
 * @property State $state
 */
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