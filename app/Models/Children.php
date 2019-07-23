<?php
namespace App\Models;
/**
 * Children details
 * 
 * @property int $sc_id
 * @property string $chld_dob
 * @property string $chld_bio
 * @property int $t_id
 * @property int $u_id
 * 
 * @property User $user
 * @property SchoolClass $schoolClass
 * @property Town $town
 */
class Children extends Base {
    protected $table = "childrens";

    protected $primaryKey = "chld_id";

    protected $fillable=[
        "sc_id",
        "chld_dob",
        "chld_bio",
        "t_id",
        "u_id"
    ];

    public function user(){
        return $this->belongsTo(User::class,'u_id','u_id');
    }

    public function schoolClass(){
        return $this->belongsTo(SchoolClass::class,'sc_id','sc_id');
    }

    public function town(){
        return $this->belongsTo(Town::class,'t_id','t_id');
    }
}