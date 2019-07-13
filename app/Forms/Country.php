<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\Country as CountryModel;

class Country extends Form {
    protected $model = CountryModel::class;

    protected $title = "Countries";
    
    protected function setInputs(){
        $this->textInput('name','c_name')->setLabel('Name');
        $this->textInput('code','c_code')->setLabel('Code');
        $this->setStructure(
            ['name','code']
        );
    }

    protected function setColumns(){
        $this->textColumn('name','c_name')->setLabel('Name');
        $this->textColumn('code','c_code')->setLabel("Code");
        $this->textColumn('created_at','created_at')->setLabel("Created At");
    }
    
    public function formatDropdownLabel($instance, $where)
    {
        return $instance->c_name;
    }
}