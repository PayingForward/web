<?php

namespace App\Models;
/**
 * Expense Model
 * 
 * @property int $e_id
 * @property int $u_id
 * @property int $sc_id
 * @property int $et_id
 * @property float $e_amount
 * 
 * @property User $user
 * @property SchoolClass $schoolClass
 * @property ExpensesType $expensesType
 */
class Expense extends Base {
    protected $table = 'expenses';

    protected $primaryKey = 'e_id';

    protected $fillable = ['u_id','sc_id','et_id','e_amount'];

    public function user(){
        return $this->belongsTo(User::class,'u_id','u_id');
    }

    public function schoolClass(){
        return $this->belongsTo(SchoolClass::class,'sc_id','sc_id');
    }

    public function expensesType(){
        return $this->belongsTo(ExpensesType::class,'et_id','et_id');
    }
}