<?php
namespace App\FormGen\Inputs\Collection;

use App\FormGen\Inputs\Input;

class AjaxDropdownInput extends Input
{
    /**
     * @inheritDoc
     */
    protected $type="ajax_dropdown";
    /**
     * Link to fetch data
     *
     * @var string
     */
    protected $link = "";

    /**
     * Setting the link to data fetching
     *
     * @param string $link
     * 
     * @return self
     */
    public function setLink($link){

        $this->setAttribute("link",$link);

        $this->link = $link;

        return $this->link;
    }

    /**
     * Returning the data fetching link
     *
     * @return string
     */
    public function getLink(){
        return $this->link;
    }

    /**
     * @inheritDoc
     *
     * @param mixed $value
     * 
     * @return array
     */
    public function serializeValue($value)
    {
        if(is_array($value)&&isset($value['id']))
            return $value['id'];

        return null;
    }
}
