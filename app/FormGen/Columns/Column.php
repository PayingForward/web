<?php
namespace App\FormGen\Columns;

use App\FormGen\HasAttributes;
use Illuminate\Database\Eloquent\Builder;

class Column {
    use HasAttributes;

    /**
     * Weather that column is searchable from form
     *
     * @var boolean
     */
    protected $searchable = true;

    /**
     * Weather that column is sortable or not in the table
     */
    protected $sortable = true;

    /**
     * Setting columns to searchable
     *
     * @param boolean $search
     * 
     * @return self
     */
    public function setSearchable($search=false){
        $this->searchable = $search;
        return $this;
    }

    /**
     * Returning the weather the column is searchable or not
     *
     * @return boolean
     */
    public function isSearchable(){
        return $this->searchable;
    }

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
     * 
     * @return mixed
     */
    public function unserializeValue($value){
        return $value;
    }
}