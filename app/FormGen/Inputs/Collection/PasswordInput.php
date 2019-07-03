<?php
namespace App\FormGen\Inputs\Collection;

use App\FormGen\Inputs\Input;

class PasswordInput extends Input {
    protected $type = "password";

    /**
     * Setting mask icon
     *
     * @param boolean $mask
     * 
     * @return self
     */
    public function setMaskIcon($mask=true){
        $this->setAttribute('maskIcon',$mask);

        return $this;
    }
}