<?php

namespace WhizSid\FormGen\Inputs;

class Attribute {
    /**
     * Name of the attribute
     *
     * @var string
     */
    protected $name;
    /**
     * Value of the attribute
     *
     * @var int|string|bool
     */
    protected $value;
    /**
     * Setting up the attribute
     * 
     * @param string $name
     * @param int|string|bool $val
     */
    public function __construct($name,$val)
    {
        $this->setName($name);
        $this->setValue($val);
    }
    /**
     * Setter for the name
     * 
     * @param string $name
     */
    public function setName($name){
        $this->name = $name;
    }
    /**
     * Setter for the value
     * 
     * @param string|int|bool $val
     */
    public function setValue($val){
        $this->value = $val;
    }
    /**
     * Returning the attribute name
     *
     * @return string
     */
    public function getName(){
        return $this->name;
    }
    /**
     * Returning the attribute value
     * 
     * @return int|string|bool
     */
    public function getValue(){
        return $this->value;
    }
}