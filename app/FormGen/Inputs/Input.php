<?php
namespace App\FormGen\Inputs;

use App\FormGen\HasAttributes;

class Input {
    use HasAttributes;

    /**
     * Default value for the input. We are picking this if passed null value
     *
     * @var mixed
     */
    protected $defaultValue =null;

    /**
     * Validation tule for the input
     *
     * @var string
     */
    protected $validationRule = null;

    /**
     * Validation rule for the input
     * 
     * @param string $rule
     * 
     * @return self
     */
    public function setValidationRule($rule){
        $this->validationRule = $rule;

        return $this;
    }

    /**
     * Returning the validation rule
     *
     * @return string
     */
    public function getValidationRule(){
        return $this->validationRule;
    }

    /**
     * Setting a default value to the input
     *
     * @param mixed $value
     * 
     * @return self
     */
    public function setDefaultValue($value){
        $this->defaultValue = $value;

        return $this;
    }

    /**
     * Returning the default value for input
     *
     * @return mixed
     */
    public function getDefaultValue(){
        return $this->defaultValue;
    }

    /**
     * Serializing a value before insert to the database
     *
     * @param mixed $value
     * 
     * @return mixed
     */
    public function serializeValue($value){
        return $value;
    }
}