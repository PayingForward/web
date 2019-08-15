<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use App\FormGen\Form;

/**
 * All models are extended to here
 * 
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $deleted_at
 */
class Base extends Model
{
    use SoftDeletes;

    protected $dates = [
        'created_at','updated_at','deleted_at'
    ];

    /**
     * Returning an instance of the form with the same name
     *
     * @return Form
     */
    public function getFormInstance(){
        $className = get_called_class();
        $formName = str_replace('App\Models','App\Forms',$className);

        return new $formName;
    }


    public static function withFormatingRelations(){
        return self::query();
    }

    public function getFormatedArray(){
        $this->toArray();
    }
}
