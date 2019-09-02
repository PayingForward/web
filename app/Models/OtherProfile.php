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
class OtherProfile extends Base
{
    protected $primaryKey = 'op_id';

    protected $table = 'other_profiles';

    protected $fillable = ['op_bio', 't_id', 'u_id'];

    public function town()
    {
        return $this->belongsTo(Town::class, 't_id', 't_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'u_id', 'u_id');
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
        if (
            !$this->user
        ) {
            return null;
        }

        return [
            'id' => $this->user->getKey(),
            'name' => $this->user->u_name,
            'type' => 'other',
            'avatar' => $this->user->u_avatar,
            'town' => isset($this->town) ? [
                'id' => $this->town->getKey(),
                'label' => $this->town->t_name,
            ] : null,
            'country' =>
            isset($this->town) &&
            isset($this->town->area) &&
            isset($this->town->area->region) &&
            isset($this->town->area->region->state) &&
            isset($this->town->area->region->state->country) ? [
                'id' => $this->town->area->region->state->country->getKey(),
                'label' => $this->town->area->region->state->country->c_name,
                'code' => $this->town->area->region->state->country->c_code,
            ] : null,
            'bio' => $this->op_bio,
            'has' => true,
        ];
    }
}
