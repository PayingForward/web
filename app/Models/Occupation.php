<?php
namespace App\Models;
/**
 * Occupation model
 * 
 * @property int $occ_id
 * @property string  $occ_name
 */
class Occupation extends Base {
    protected $table = 'occupations';

    protected $primaryKey = 'occ_id';

    protected $fillable = [
        'occ_name'
    ];
}