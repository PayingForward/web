<?php
namespace App\Forms\User;

use WhizSid\FormGen\Form;
use App\User as UserModel;

class User extends Form {
    protected $model = UserModel::class;

    protected function setInputs()
    {
        $this->textInput('user_name')->setLowerCase();
    }
}