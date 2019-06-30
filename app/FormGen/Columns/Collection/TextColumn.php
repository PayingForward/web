<?php
namespace App\FormGen\Columns\Collection;

use App\FormGen\Columns\Column;

class TextColumn extends Column {
    public function makeCondition($query,$value){
        $query->where($this->columnName,'LIKE',"%$value%");
    }
}