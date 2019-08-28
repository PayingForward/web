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

    public static function withFormatingRelations(){
        return self::with([
            'user',
            'schoolClass',
            'schoolClass.school',
            'town',
            'town.area',
            'town.area.region',
            'town.area.region.state',
            'town.area.region.state.country',
            'user.userType'
        ]);
    }

    public function getFormatedArray(){
        if(
            !$this->user||
            !$this->schoolClass ||
            !$this->schoolClass->school ||
            !$this->town ||
            !$this->town->area ||
            !$this->town->area->region ||
            !$this->town->area->region->state ||
            !$this->town->area->region->state->country ||
            !$this->user->userType
        ) return null;

        return [
            'id'=>$this->user->getKey(),
            'name'=>$this->user->u_name,
            'type'=>$this->user->userType->ut_name,
            'avatar'=>$this->user->u_avatar,
            'town'=>[
                'id'=>$this->town->getKey(),
                'label'=>$this->town->t_name
            ],
            'country'=>[
                'id'=>$this->town->area->region->state->country->getKey(),
                'label'=>$this->town->area->region->state->country->c_name,
                'code'=>$this->town->area->region->state->country->c_code,
            ],
            'bio'=>$this->chld_bio,
            'class'=>[
                'id'=>$this->schoolClass->getKey(),
                'label'=>$this->schoolClass->sc_name
            ],
            'school'=>[
                'id'=>$this->schoolClass->school->getKey(),
                'label'=>$this->schoolClass->school->scl_name
            ],
            'has'=>true
        ];
    }
}