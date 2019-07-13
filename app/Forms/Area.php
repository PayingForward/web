<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\Area as AreaModel;

class Area extends Form {
    protected $model = AreaModel::class;

    protected $title="Areas";

    public function beforeSearch($query, $values)
    {
        $query->with('region');
    }

    protected function setInputs(){
        $this->textInput('name','a_name')->setLabel("Name");
        $this->textInput('code','a_code')->setLabel("Code");
        $this->ajaxDropdownInput('state','r_id')->setLabel("State")->setLink('region');
        $this->setStructure(['name','code'],'state');
    }

    protected function setColumns()
    {
        $this->textColumn('name','a_name')->setLabel('Name');
        $this->textInput('code','a_code')->setLabel("Code");
        $this->ajaxDropdownColumn('state','r_id')->setLabel('State')->setLink('region');
        $this->textColumn('created_at','created_at')->setLabel("Created At");
    }

    public function formatDropdownLabel($instance, $where)
    {
        return $instance->a_name;
    }
}