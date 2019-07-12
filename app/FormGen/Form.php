<?php
namespace App\FormGen;

use App\FormGen\Inputs\Input;
use App\FormGen\Inputs\Collection\TextInput;
use App\FormGen\Inputs\Collection\PasswordInput;
use App\FormGen\Inputs\Collection\AjaxDropdownInput;
use App\FormGen\Inputs\Collection\AvatarInput;

use App\FormGen\Columns\Column;
use App\FormGen\Columns\Collection\TextColumn;
use App\FormGen\Columns\Collection\AjaxDropdownColumn;
use App\FormGen\Columns\Collection\AvatarColumn;

use App\Models\Base;
use Illuminate\Database\Eloquent\Builder;

/**
 * This model is generating form informations
 * 
 * @method TextInput textInput(string $name,string $columnName=$name)
 * @method PasswordInput passwordInput(string $name,string $columnName=$name)
 * @method TextColumn textColumn(string $name,string $columnName=$name)
 * @method AjaxDropdownInput ajaxDropdownInput(string $name,string $columnName=$name)
 * @method AjaxDropdownColumn ajaxDropdownColumn(string $name,string $columnName=$name)
 * @method AvatarInput avatarInput(string $name,string $columnName=$name)
 * @method AvatarColumn avatarColumn(string $name,string $columnName=$name)
 */
class Form {

    /**
     * Title for the form
     *
     * @var string
     */
    protected $title = "";

    /**
     * Allowed actions of this form
     * 
     * You can override this from here or on setActions() method.
     *
     * @var array
     */
    protected $allowedActions = [];

    /**
     * Base model name for the form
     *
     * @var string
     */
    protected $model;

    /**
     * Collection of inputs
     *
     * @var Input
     */
    protected $inputs = [];

    /**
     * Collection fo columns
     *
     * @var array
     */
    protected $columns = [];

    /**
     * Structure for the inputs
     * 
     * @var array
     */
    protected $structure;

    /**
     * Authorized where variables and column names
     *
     * @var array key as parameter name and value as column name
     */
    protected $dropdownWhere = [
        // 'param1'=>'col1'
    ];

    public function __construct()
    {
        $this->setColumns();
        $this->setActions();
        $this->setInputs();
    }

    /**
     * Creating an input in the form
     *
     * @param string $name input type
     * @param string[] $arguments input name
     * @return Input
     */
    public function __call($name, $arguments)
    {
        $inputNamespace = 'App\FormGen\Inputs\Collection\\'.ucfirst($name);
        $columnNamespace = 'App\FormGen\Columns\Collection\\'.ucfirst($name);
        $namespace = null;
        $type=null;

        if(class_exists($inputNamespace)){
            $namespace = $inputNamespace;
            $type = "input";
        } else if(class_exists($columnNamespace)){
            $namespace = $columnNamespace;
            $type="column";
        }

        if($namespace){
            if(!count($arguments)){
                throw new \InvalidArgumentException("{ucfirst($type)} name is not supplied.");
            }

            if(!is_string($arguments[0])){
                throw new \InvalidArgumentException("Invalid $type name supplied.");
            }

            $name = $arguments[0];
            $columnName = isset($arguments[1])?$arguments[1]:$name;

            /** @var Input|Column $instance */
            $instance = new $namespace;

            $instance->setName($name);
            $instance->setColumnName($columnName);
            $instance->setForm($this);

            $this->{$type.'s'}[$name] = $instance;

            return $instance;
            
        } else {
            throw new \BadMethodCallException("Can not find a input or column type '$name'.");
        }
    }

    /**
     * Returning the based model name
     * 
     * @return string|Base
     */
    public function getModel(){
        return $this->model;
    }

    /**
     * Returning the title of the form
     *
     * @return string
     */
    public function getTitle(){
        return $this->title;
    }

    /**
     * You can set allowed actions for this form.
     * 
     * Edit $this->allowedActions property in here. You
     * can add 'create','update','delete','search' 
     * actions as values to this array.
     *
     * @return void
     */
    protected function setActions(){
        $this->allowedActions = ['update','create','delete','search'];
    }

    /**
     * Returning the allowed actions
     *
     * @return string[]
     */
    public function getActions(){
        return $this->allowedActions;
    }

    /**
     * Setting the form structure
     *
     * @param array $struct
     * @return void
     */
    public function setStructure(...$struct){
        $formatedStructure = [];

        foreach ($struct as $key => $value) {
            if(is_string($value)){
                if(!isset($this->inputs[$value]))
                    throw new \InvalidArgumentException("Can not find the name '$value' in the form.");

                $formatedStructure[] = [$value];
            } else if(\is_array($value)) {

                $formatedStructure1 = [];

                foreach ($value as $key => $value1) {
                    if(is_string($value1)){

                        if(!isset($this->inputs[$value1]))
                            throw new \InvalidArgumentException("Can not find the name '$value1' in the form.");

                        $formatedStructure1[] = $value1;
                    } else {

                        throw new \InvalidArgumentException("Invalid value supplied for set structure methos. setstructure will take only strings and arrays that containig strings");
                    }
                }

                $formatedStructure[] = $formatedStructure1;
            } else {

                throw new \InvalidArgumentException("Invalid value supplied for set structure method. setstructure will take only strings and arrays that containig strings");
            }
        }

        $this->structure = $formatedStructure;
    }

    /**
     * Returning the filtered form structure
     * 
     * @return array
     */
    public function getStructure(){
        $filteredStructure = [];

        if(isset($this->structure)){
            foreach($this->structure as $row){
                $row1 = [];

                foreach($row as $inputName){
                    $input = $this->getInput($inputName);
                    if($input){
                        $row1[] = $input;
                    }
                }

                $filteredStructure[] = $row1;
            }
        } else {
            $inputs = $this->getInputs();

            foreach ($inputs as $input) {
                $filteredStructure[] = [$input];
            }
        }

        return $filteredStructure;
    }

    /**
     * Initial the form by setting inputs and structure
     *
     * @return void
     */
    protected function setInputs(){
        // Codes
    }

    /**
     * Returning the filtered inputs
     *
     * @return Input[]
     */
    public function getInputs(){
        $filteredInputs = [];

        foreach($this->inputs as $name=>$input){
            if($this->getInput($name)){
                $filteredInputs[$name] = $input;
            }
        }

        return $filteredInputs;
    }

    /**
     * Returning an input by name
     * 
     * @param string
     * 
     * @return Input
     */
    public function getInput($name){

        if(!isset($this->inputs[$name]))
            throw new \InvalidArgumentException("$name is not in the form.");

        $input =  $this->inputs[$name];

        return $this->filterInput($input)?$input:null;
    }

    /**
     * Filtering the inputs
     *
     * @param Input $input
     * 
     * @return bool
     */
    protected function filterInput($input){
        return true;
    }

    /**
     * Setting the columns in the table
     *
     * @return void
     */
    protected function setColumns(){
        // Codes
    }

    /**
     * Returning the filtered columns
     *
     * @return Column[]
     */
    public function getColumns(){
        $filteredColumns = [];

        foreach($this->columns as $name=>$column){
            if($this->getColumn($name)){
                $filteredColumns[$name] = $column;
            }
        }

        return $filteredColumns;
    }

    /**
     * Returning a column by name
     *
     * @param string $name
     * 
     * @return Column
     */
    public function getColumn($name){
        if(!isset($this->columns[$name]))
            throw new \InvalidArgumentException("$name is not in the form.");

        $column =  $this->columns[$name];

        return $this->filterColumn($column)?$column:null;
    }

    /**
     * Filtering a column
     *
     * @param Column $column
     * 
     * @return bool
     */
    protected function filterColumn($column){
        return true;
    }

    /**
     * Returning the authorized keys and column names for dropdown where clause
     *
     * @return array
     */
    public function getDropdownWhere(){
        return $this->dropdownWhere;
    }

    /**
     * Trigger an action before dropdown search
     *
     * @param Builder $query
     * @param string $keyword
     * @param array $where
     * 
     * @return void
     */
    public function beforeDropdownSearch($query,$keyword,$where){

    }

    /**
     * Formating the dropdown label
     *
     * @param Base $instance
     * @param array $where
     * 
     * @return string
     */
    public function formatDropdownLabel($instance,$where){
    }

    /**
     * Validating values before create or update
     *
     * @param Base $inst
     * 
     * @return bool
     */
    public function validateValues(Base $inst){
        return true;
    }
    
    /**
     * Trigger an action before create a record
     *
     * @param Base $inst
     * @param array $values
     * 
     * @return void
     */
    public function beforeCreate(Base $inst,$values){

    }

    /**
     * Trigger an action after create a record
     *
     * @param Base $inst
     * @param array $values
     * 
     * @return void
     */
    public function afterCreate(Base $inst,$values){

    }
    
    /**
     * Trigger an action before update a record
     *
     * @param Base $inst
     * @param array $values
     * 
     * @return void
     */
    public function beforeUpdate(Base $inst,$values){

    }

    /**
     * Trigger an action after update a record
     *
     * @param Base $inst
     * @param array $values
     * 
     * @return void
     */
    public function afterUpdate(Base $inst,$values){

    }

    /**
     * Trigger an action before deleting the record
     *
     * @param Base $inst
     * 
     * @return void
     */
    public function beforeDelete(Base $inst){

    }

    /**
     * Trigger an action after deleted the record
     *
     * @param int $id
     * 
     * @return void
     */
    public function afterDelete($id){

    }

    /**
     * Trigger an action before search the results
     *
     * @param Builder $query
     * @param array $values
     * 
     * @return void
     */
    public function beforeSearch($query,$values){

    }
}