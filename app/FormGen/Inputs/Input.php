<?php
namespace App\FormGen\Inputs;

use App\FormGen\HasAttributes;

class Input {
    use HasAttributes;
    /**
     * Validation for the input value
     *
     * @var callback<mixed>
     */
    protected $validation;
    /**
     * Validating value
     * 
     * @param callback<mixed> $func
     * 
     * @return self
     */
    public function setValidation($func){
        $this->validation = $func;

        return $this;
    }
}