<?php
namespace App\FormGen;

use App\FormGen\Attribute;

trait HasAttributes {
    /**
     * Attributes main tag in the input
     * 
     * @var Attribute[]
     */
    protected $attributes = [];

    /**
     * Name of the input
     * 
     * @var string
     */
    protected $name="";

    /**
     * Label for the input or column
     *
     * @var string
     */
    protected $label="";

    /**
     * Input type name
     *
     * @var string
     */
    protected $type="";

    /**
     * Actual column name in the table
     *
     * @var string
     */
    protected $columnName = null;

    /**
     * Weather that column is searchable from form
     *
     * @var boolean
     */
    protected $searchable = true;

    /**
     * Setting an attribute to the input
     * 
     * @param string $name
     * @param int|string|bool $value
     * 
     * @return self
     */
    public function setAttribute($name,$value){
        $this->attributes[] = new Attribute($name,$value);

        return $this;
    }

    /**
     * Setter for the input name
     * 
     * @param string $name
     * 
     * @return string
     */
    public function setName($name){
        $this->name = $name;
    }

    /**
     * Returning the type of the input
     * 
     * @return string
     */
    public function getType(){
        return $this->type;
    }

    /**
     * Setting a actual column name in the using table
     *
     * @param string $columnName
     * 
     * @return self
     */
    public function setColumnName($columnName){
        $this->columnName = $columnName;
    }

    /**
     * Returning the actual column name in the database
     *
     * @return void
     */
    public function getColumnName(){
        return $this->columnName;
    }

    /**
     * Setting the displaying label for the input or columns
     *
     * @param string $label
     * 
     * @return self
     */
    public function setLabel($label){
        $this->label = $label;
        return $this;
    }

    /**
     * Returning the label for the input or column
     * 
     * @return string
     *
     * @return void
     */
    public function getLabel(){
        return $this->label;
    }

    /**
     * Setting columns to searchable
     *
     * @param boolean $search
     * 
     * @return self
     */
    public function setSearchable($search=false){
        $this->searchable = $search;
        return $this;
    }

    /**
     * Returning the weather the column is searchable or not
     *
     * @return boolean
     */
    public function isSearchable(){
        return $this->searchable;
    }
}