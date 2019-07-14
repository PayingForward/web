<?php
namespace App\Forms;

use App\FormGen\Form;
use App\Models\School as SchoolModel;

class School extends Form {
    protected $model = SchoolModel::class;

    protected $title = "Schools" ;

    public function beforeSearch($query, $values)
    {
        $query->with(['user','town']);
    }

    protected function setInputs(){
        $this->textInput('name','scl_name')->setLabel("Name");
        $this->textInput('code','scl_code')->setLabel("Code");
        $this->textInput('address','scl_address')->setLabel("Address");
        $this->textInput('email','scl_email')->setLabel("Email");
        $this->textInput('phone','scl_phone_num')->setLabel('Phone Number');
        $this->avatarInput('logo','scl_logo')->setLabel('Logo');
        $this->ajaxDropdownInput('principle','u_id')->setLink('user')->setLabel('Principle');
        $this->ajaxDropdownInput('town','t_id')->setLink('town')->setLabel("Town");
        $this->setStructure(['name','code','principle'],['town','address'],['email','phone'],'logo');
    }

    protected function setColumns()
    {
        $this->avatarColumn('logo','scl_logo')->setLabel('Logo');
        $this->textColumn('name','scl_name')->setLabel('Name');
        $this->textInput('code','scl_code')->setLabel("Code");
        $this->textColumn('address','scl_address')->setLabel("Address");
        $this->textColumn('email','scl_email')->setLabel("Email");
        $this->textColumn('phone','scl_phone_num')->setLabel('Phone Number');
        $this->ajaxDropdownColumn('principle','u_id')->setLink('user')->setLabel('Principle');
        $this->ajaxDropdownColumn('town','t_id')->setLink('town')->setLabel("Town");
        $this->textColumn('created_at','created_at')->setLabel("Created At");
    }

    public function formatDropdownLabel($instance, $where)
    {
        return $instance->scl_name;
    }
}