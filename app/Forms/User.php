<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\User as UserModel;

class User extends Form {
    protected $model = UserModel::class;

    protected $title = "Users";

    protected function setInputs()
    {
        $this->textInput('name','u_name')->setLowerCase()->setValidationRule('required')->setLabel("Name");
        $this->textInput('email','u_email')->setValidationRule('required|email')->setLabel("Email");
        $this->passwordInput('password','u_password')->setValidationRule('required')->setLabel("Password");
        $this->setStructure(
            'name',
            ['email','password']
        );
    }

    protected function setColumns()
    {
        $this->textColumn('name','u_name')->setLabel("Name");
        $this->textColumn('email','u_email')->setLabel("Email");
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