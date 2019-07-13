<?php
namespace App\Forms;

use App\Models\Region as RegionModel;
use App\FormGen\Form;

class Region extends Form {
    protected $model = RegionModel::class;

    protected $title = "Regions" ;

    public function beforeSearch($query, $values)
    {
        $query->with('state');
    }

    protected function setInputs(){
        $this->textInput('name','r_name')->setLabel("Name");
        $this->textInput('code','r_code')->setLabel("Code");
        $this->ajaxDropdownInput('state','s_id')->setLabel("State")->setLink('state');
        $this->setStructure(['name','code'],'state');
    }

    protected function setColumns()
    {
        $this->textColumn('name','r_name')->setLabel('Name');
        $this->textInput('code','r_code')->setLabel("Code");
        $this->ajaxDropdownColumn('state','s_id')->setLabel('State')->setLink('state');
        $this->textColumn('created_at','created_at')->setLabel("Created At");
    }

    public function formatDropdownLabel($instance, $where)
    {
        return $instance->r_name;
    }
}