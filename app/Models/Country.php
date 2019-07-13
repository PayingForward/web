<?php
namespace App\Models;

class Country extends Base {
    protected $table = "countries";

    protected $primaryKey = "c_id";

    protected $fillable=[
        "c_name","c_code"
    ];
}