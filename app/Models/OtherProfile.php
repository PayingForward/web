<?php
namespace App\Models;

/**
 * Other Profiles Model
 * 
 * @property int $op_id
 * @property string $op_bio
 * @property int $t_id
 * @property int $u_id
 * @property Town $town
 * @property User $user
 */
class OtherProfile extends Base {
    protected $primaryKey = 'op_id';

    protected $table = 'other_profiles';

    protected $fillable = ['op_bio','t_id','u_id'];

    public function town(){
        return $this->belongsTo(Town::class,'t_id','t_id');
    }

    public function user(){
        return $this->belongsTo(User::class,'u_id','u_id');
    }

    public static function withFormatingRelations()
    {
        return self::with([
            'user',
            'town',
            'town.area',
            'town.area.region',
            'town.area.region.state',
            'town.area.region.state.country',
            'user.userType',
        ]);
    }

    public function getFormatedArray()
    {
        if(
            !$this->user||
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
            'bio'=>$this->chld_bio
        ];
    }
}