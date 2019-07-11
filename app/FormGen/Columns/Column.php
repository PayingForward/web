<?php
namespace App\FormGen\Columns;

use App\FormGen\HasAttributes;
use Illuminate\Database\Eloquent\Builder;
use JsonSerializable;
use App\Models\Base;

class Column implements JsonSerializable {
    use HasAttributes;

    /**
     * Weather that column is sortable or not in the table
     */
    protected $sortable = true;

    /**
     * Setting columns to sortable in tables
     *
     * @param boolean $sort
     * 
     * @return self
     */
    public function setSortable($sort = false){
        $this->sortable = $sort;
        return $this;
    }

    /**
     * Checking the weather column is sortable or not in the table
     *
     * @return boolean
     */
    public function isSortable(){
        return $this->sortable;
    }

    /**
     * Making a search condition
     * 
     * @param Builder $query
     * @param mixed $value
     * 
     * @return void
     */
    public function makeCondition($query,$value,$and=true){
            $query->orWhere($this->columnName,$value);
    }

    /**
     * Unserializing the values before sending to frontend
     *
     * @param mixed $value
     * @param Base $model
     * 
     * @return mixed
     */
    public function unserializeValue($value,$model){
        return $value;
    }


    public function jsonSerialize(){
        return [
            'name'=>$this->name,
            'type'=>$this->type,
            'attributes'=>$this->attributes,
            'searchable'=>$this->searchable,
            'sortable'=>$this->sortable,
            'label'=>$this->getLabel()
        ];
    }
}