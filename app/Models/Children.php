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
class Children extends Base
{
    protected $table = "childrens";

    protected $primaryKey = "chld_id";

    protected $fillable = [
        "sc_id",
        "chld_dob",
        "chld_bio",
        "t_id",
        "u_id",
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'u_id', 'u_id');
    }

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'sc_id', 'sc_id');
    }

    public function town()
    {
        return $this->belongsTo(Town::class, 't_id', 't_id');
    }

    public static function withFormatingRelations()
    {
        return self::with([
            'user',
            'schoolClass',
            'schoolClass.school',
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
            !$this->user ||
            !$this->user->userType
        ) {
            return null;
        }

        return [
            'id' => $this->user->getKey(),
            'name' => $this->user->u_name,
            'type' => $this->user->userType->ut_name,
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
            'bio' => $this->chld_bio,
            'class' => isset($this->schoolClass) ? [
                'id' => $this->schoolClass->getKey(),
                'label' => $this->schoolClass->sc_name,
            ] : null,
            'school' => isset($this->schoolClass) && isset($this->schoolClass->school) ? [
                'id' => $this->schoolClass->school->getKey(),
                'label' => $this->schoolClass->school->scl_name,
            ] : null,
            'has' => true,
        ];
    }
}
