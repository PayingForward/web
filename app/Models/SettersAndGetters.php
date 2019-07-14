<?php
namespace App\Models;

use BadMethodCallException;

class SettersAndGetters {
    protected $properties = [];

    /**
     * Setters and getters
     */
    public function __call($name, $arguments)
    {
        $propertyName = lcfirst( substr($name,3));
        $method = substr($name,0,3);

        if(!in_array($propertyName,$this->properties)){
            throw new BadMethodCallException("Called to an invalid method $name");
        }

        if($method=="set"){
            $this->{$propertyName} = $arguments[0];
        } else if ($method=="get") {
            return $this->{$propertyName};
        } else {
            throw new BadMethodCallException("Called to an invalid method $name");
        }
    }
}