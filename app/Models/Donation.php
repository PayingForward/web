<?php
namespace App\Models;

use Illuminate\Support\Carbon;

/**
 * Donation model
 * 
 * @property string $d_no
 * @property int $u_id
 * @property int $d_mode
 * @property int $chld_u_id
 * @property Carbon $d_played_at
 * @property string|number $d_amount
 * @property User $user
 * @property User $childUser
 * @property int $d_privacy
 */
class Donation extends Base {
    protected $table="donations";

    protected $primaryKey = 'd_id';

    protected $dates = [
        'created_at','updated_at','deleted_at','d_played_at'
    ];

    protected $fillable = ['d_no','u_id','d_mode','chld_u_id','d_payed_at','d_amount','d_privacy'];

    public function user(){
        return $this->belongsTo(User::class,'u_id','u_id');
    }

    public function childUser(){
        return $this->belongsTo(User::class,'chld_u_id','chld_u_id');
    }
}