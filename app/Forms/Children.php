<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\Children as ChildrenModel;

class Children extends Form {
    protected $model = ChildrenModel::class;

    protected $title="Childrens";

    public function beforeSearch($query, $values)
    {
        $query->with(['schoolClass','town','user']);
    }

    public function beforeDropdownSearch($query, $keyword, $where)
    {
        $query->with('user');
    }

    protected function setInputs(){
        $this->ajaxDropdownInput('school','sc_id')->setLabel('School Class')->setLink('school_class');
        $this->textInput('dob','chld_dob')->setLabel("Date Of Birth");
        $this->textInput('bio','chld_bio')->setLabel("Bio");
        $this->ajaxDropdownInput('town','t_id')->setLabel("Town")->setLink('town');
        $this->ajaxDropdownInput('user','u_id')->setLabel("User")->setLink('user');
        $this->setStructure(['user','dob'],['town','school'],'bio');
    }

    protected function setColumns()
    {
        $this->ajaxDropdownColumn('school','sc_id')->setLabel('School Class')->setLink('school_class');
        $this->textColumn('dob','chld_dob')->setLabel("Date Of Birth");
        $this->textColumn('bio','chld_bio')->setLabel("Bio");
        $this->ajaxDropdownColumn('town','t_id')->setLabel("Town")->setLink('town');
        $this->ajaxDropdownColumn('user','u_id')->setLabel("User")->setLink('user');
        $this->textColumn('created_at','created_at')->setLabel("Created Date");
    }

    public function formatDropdownLabel($instance, $where)
    {
        return $instance->user->u_name;
    }
}