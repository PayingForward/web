<?php
namespace App\Forms\User;

use App\FormGen\Form;
use App\User as UserModel;

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
}