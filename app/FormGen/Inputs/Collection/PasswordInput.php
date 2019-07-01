<?php
namespace App\FormGen\Inputs\Collection;

use App\FormGen\Inputs\Input;

class PasswordInput extends Input {
    protected $type = "password";

    /**
     * Weather that show or hide mask icon
     *
     * @var boolean
     */
    protected $maskIcon = true;

    /**
     * Setting mask icon
     *
     * @param boolean $mask
     * 
     * @return self
     */
    public function setMaskIcon($mask){
        $this->maskIcon = $mask;

        return $this;
    }
}