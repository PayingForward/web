<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\Town as TownModel;

class Town extends Form {
    protected $model = TownModel::class;

    protected $title="Towns";

    public function beforeSearch($query, $values)
    {
        $query->with('area');
    }

    protected function setInputs(){
        $this->textInput('name','t_name')->setLabel("Name");
        $this->textInput('code','t_code')->setLabel("Code");
        $this->ajaxDropdownInput('area','a_id')->setLabel("Area")->setLink('area');
        $this->setStructure(['name','code'],'area');
    }

    protected function setColumns()
    {
        $this->textColumn('name','t_name')->setLabel('Name');
        $this->textInput('code','t_code')->setLabel("Code");
        $this->ajaxDropdownColumn('area','a_id')->setLabel('Area')->setLink('area');
        $this->textColumn('created_at','created_at')->setLabel("Created At");
    }

    public function formatDropdownLabel($instance, $where)
    {
        return $instance->t_name;
    }
}