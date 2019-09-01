<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\Occupation as AppOccupation;

class Occupation extends Form {
    protected $model = AppOccupation::class;

    protected $title = "Occupations";
    
    protected function setInputs(){
        $this->textInput('name','occ_name')->setLabel('Name');
        $this->setStructure(
            ['name']
        );
    }

    protected function setColumns(){
        $this->textColumn('name','occ_name')->setLabel('Name');
        $this->textColumn('created_at','created_at')->setLabel("Created At");
    }
    
    public function formatDropdownLabel($instance, $where)
    {
        return $instance->occ_name;
    }
}