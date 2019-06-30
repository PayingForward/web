<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

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
}
