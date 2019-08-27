<?php

namespace App\Models;

/**
 * Donor's model
 * 
 * @property string $dnr_bio
 * @property int $t_id
 * @property int $c_id
 * @property int $u_id
 * @property int $occ_id
 * @property string $dnr_contact_email
 * @property Town $town
 * @property Country $country
 * @property User $user
 * @property Occupation $occupation
 */
class Donor extends Base {
    protected $primaryKey = 'dnr_id';

    protected $table = 'donors';

    protected $fillable = ['dnr_bio','t_id','c_id','u_id','occ_id','dnr_contact_email'];

    public function town(){
        return $this->belongsTo(Town::class,'t_id','t_id');
    }

    public function country(){
        return $this->belongsTo(Country::class,'c_id','c_id');
    }

    public function user(){
        return $this->belongsTo(User::class,'u_id','u_id');
    }

    public function occupation(){
        return $this->belongsTo(Occupation::class,'occ_id','occ_id');
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
            'country',
            'occupation'
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
            !$this->user->userType ||
            !$this->occupation
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
            'interestCountry'=> $this->country?[
                'id'=>$this->country->getKey(),
                'label'=>$this->country->c_name,
                'code'=>$this->country->c_code,
            ]:null,
            'donations'=>Donation::where('u_id',$this->u_id)->sum('d_amount'),
            'occupation'=>[
                'id'=>$this->occupation->getKey(),
                'label'=>$this->occupation->occ_name
            ],
            'contactEmail'=>$this->dnr_contact_email
        ];
    }
}