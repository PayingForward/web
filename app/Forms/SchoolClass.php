<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\SchoolClass as SchoolClassModel;

class SchoolClass extends Form {
    protected $model = SchoolClassModel::class;

    protected $title = "School Classes" ;

    public function beforeSearch($query, $values)
    {
        $query->with(['user','school']);
    }

    protected function setInputs(){
        $this->textInput('name','sc_name')->setLabel("Name");
        $this->textInput('code','sc_code')->setLabel("Code");
        $this->ajaxDropdownInput('school','scl_id')->setLink('school')->setLabel('School');
        $this->ajaxDropdownInput('user','u_id')->setLink('user')->setLabel("Class Teacher");
        $this->setStructure(['name','code'],['school','user']);
    }

    protected function setColumns()
    {
        $this->textColumn('name','sc_name')->setLabel("Name");
        $this->textColumn('code','sc_code')->setLabel("Code");
        $this->ajaxDropdownColumn('school','scl_id')->setLink('school')->setLabel('School');
        $this->ajaxDropdownColumn('user','u_id')->setLink('user')->setLabel("Class Teacher");
        $this->textColumn('created_at','created_at')->setLabel("Created At");
    }

    public function formatDropdownLabel($instance, $where)
    {
        return $instance->sc_name;
    }
}