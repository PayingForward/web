<?php

namespace App\Models;

/**
 * Expenses types model
 * 
 * @property int $et_id
 * @property string $et_name
 * @property string $et_code
 * @property float $et_maximum_amount
 */
class ExpensesType extends Base {
    protected $table = 'expenses_types';

    protected $primaryKey = 'et_id';

    protected $fillable = ['et_name','et_code','et_maximum_amount'];

}