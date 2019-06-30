<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\User as UserModel;

class User extends Form {
    protected $model = UserModel::class;

    protected function setInputs()
    {
        $this->textInput('u_name')->setLowerCase();
    }

    protected function setColumns()
    {
        $this->textColumn('u_name');
    }

    public function formatDropdownLabel($instance, $where)
    {
        return $instance->u_name;
    }

    public function beforeDropdownSearch($query,$keyword,$where){
        if(isset($where['type'])){
            $query->where('ut_id',$where['type']);
        }
    }
}