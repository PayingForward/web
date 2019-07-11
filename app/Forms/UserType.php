<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\UserType as UserTypeModel;

class UserType extends Form {
    protected $model = UserTypeModel::class;

    protected $title = "User Types";

    protected function setInputs()
    {
        $this->textInput('name','ut_name')->setLowerCase()->setValidationRule('required')->setLabel("Name");
        $this->textInput('code','ut_code')->setValidationRule('required')->setLabel("Code");
        $this->setStructure(
            ['name','code']
        );
    }

    protected function setColumns()
    {
        $this->textColumn('name','ut_name')->setLabel("Name");
        $this->textColumn('code','ut_code')->setLabel("Code");
        $this->textColumn('created_at','created_at')->setLabel("Created At");
    }

    public function formatDropdownLabel($instance, $where)
    {
        return $instance->ut_name.' ['.$instance->ut_code.']';
    }
}