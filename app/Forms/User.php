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
        $this->passwordInput('password','u_password')->setValidationRule('required')->setLabel("Password")->setSearchable(false);
        $this->ajaxDropdownInput('user_type','ut_id')->setValidationRule('required')->setLabel('User Type')->setLink('user_type');
        $this->avatarInput('avatar','u_avatar')->setLabel('Avatar');
        $this->setStructure(
            ['name','user_type'],
            ['email','password'],
            ['avatar']
        );
    }

    protected function setColumns()
    {
        $this->avatarColumn('avatar','u_avatar')->setLabel("Avatar");
        $this->textColumn('name','u_name')->setLabel("Name");
        $this->textColumn('email','u_email')->setLabel("Email");
        $this->ajaxDropdownColumn('user_type','ut_id')->setLink('user_type')->setLabel("User Type");
        $this->textColumn('created_at','created_at')->setLabel("Created At");
    }

    public function formatDropdownLabel($instance, $where)
    {
        return $instance->u_name;
    }

    public function beforeSearch($query, $values)
    {
        $query->with('userType');
    }

    public function beforeDropdownSearch($query,$keyword,$where){
        if(isset($where['type'])){
            $query->where('ut_id',$where['type']);
        }
    }
}