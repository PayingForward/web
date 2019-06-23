<?php
namespace WhizSid\FormGen\Inputs\Collection;

use WhizSid\FormGen\Inputs\Input;

class TextInput extends Input {
    protected $type = "text";
    /**
     * Setting to all letters in upper case
     *
     * @return self
     */
    public function setUpperCase(){
        $this->setAttribute('case','upper');

        return $this;
    }
    /**
     * Force all letters to lower case
     *
     * @return self
     */
    public function setLowerCase(){
        $this->setAttribute('case','lower');

        return $this;
    }
}