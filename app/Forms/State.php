<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\State as StateModel;

class State extends Form {
    protected $model = StateModel::class;

    protected $title = "States";

    public function beforeSearch($query, $values)
    {
        $query->with('country');
    }

    protected function setInputs(){
        $this->textInput('name','s_name')->setLabel("Name");
        $this->textInput('code','s_code')->setLabel("Code");
        $this->ajaxDropdownInput('country','c_id')->setLabel("Country")->setLink("country");

        $this->setStructure(['name','code'],'country');
    }

    protected function setColumns()
    {
        $this->textColumn('name','s_name')->setLabel('Name');
        $this->textColumn('code','s_code')->setLabel("Code");
        $this->ajaxDropdownColumn('country','c_id')->setLabel("Country")->setLink("country");
        $this->textColumn('created_at','created_at')->setLabel("Created At");
    }

    public function formatDropdownLabel($instance, $where)
    {
        return $instance->s_name;
    }
}