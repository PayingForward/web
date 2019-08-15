<?php
namespace App\Models;

/**
 * State model
 * 
 * @property string $s_name
 * @property string $s_code
 * @property int $c_id
 * @property Country $country
 */
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