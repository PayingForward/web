<?php
namespace App\FormGen\Columns\Collection;

use App\FormGen\Columns\Column;

class TextColumn extends Column {
    public function makeCondition($query,$value,$and=false){
        if($and)
            $query->where($this->columnName,'LIKE',"%$value%");
        else
            $query->orWhere($this->columnName,'LIKE',"%$value%");
    }
}