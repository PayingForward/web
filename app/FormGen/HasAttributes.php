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
    protected $name;
    /**
     * Input type name
     *
     * @var string
     */
    protected $type;
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
}