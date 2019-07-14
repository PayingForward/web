<?php
namespace App\Models;

/**
 * Country model
 * 
 * @property string $c_name
 * @property string $c_code
 */
class Country extends Base {
    protected $table = "countries";

    protected $primaryKey = "c_id";

    protected $fillable=[
        "c_name","c_code"
    ];
}