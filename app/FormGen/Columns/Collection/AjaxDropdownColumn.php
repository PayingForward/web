<?php
namespace App\FormGen\Columns\Collection;

use App\FormGen\Columns\Column;
use App\Models\Base;

class AjaxDropdownColumn extends Column
{
    /**
     * @inheritDoc
     */
    protected $type="ajax_dropdown";

    /**
     * @inheritDoc
     *
     * @var boolean
     */
    protected $sortable = false;

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

        return $this;
    }

    /**
     * Returning the data fetching link
     *
     * @return string
     */
    public function getLink(){
        return $this->link;
    }

    public function makeCondition($query, $value, $and = false)
    {
        if (isset($value)) {
            if ($and) {
                $query->where($this->columnName, '=', $value['id']);
            } else {
                $query->orWhere($this->columnName, '=', $value['id']);
            }
        }
    }

    /**
     * @inheritDoc
     *
     * @param mixed $value
     * @param Base $model
     * 
     * @return array
     */
    public function unserializeValue($value,$model)
    {
        $relationShipName = \camel_case($this->link);

        $relation = $model->{$relationShipName};

        if(!$relation)
            return null;

        $form = $relation->getFormInstance();

        return [
            'id'=>$relation->getKey(),
            'label'=>$form->formatDropdownLabel($relation,[])
        ];
    }
}
