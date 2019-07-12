<?php
namespace App\FormGen\Columns\Collection;

use App\FormGen\Columns\Column;

class AvatarColumn extends Column {
    protected $type = "avatar";

    protected $searchable = false;

    protected $sortable = false;

    public function unserializeValue($value, $model)
    {
        if($value)
            return $value;
        else
            return 'default';
    }
}