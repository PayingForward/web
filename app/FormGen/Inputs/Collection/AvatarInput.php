<?php

namespace App\FormGen\Inputs\Collection;

use App\FormGen\Inputs\Input;
use Image;

class AvatarInput extends Input {
    protected $type="avatar";

    protected $searchable = false;

    public function serializeValue($value)
    {
        if(!is_string($value)){
            return null;
        }
        
        try {
            $name = time().rand(100, 999);

            $thumbnail_sizes = [32,64,200];

            foreach ($thumbnail_sizes as $size) {
                $img = Image::make($value);
                $img->resize($size, $size);
                $img->save(storage_path('app/public/images/uploads/'.$size.'/'.$name.'.jpg'));
            }

            $img = Image::make($value);
            $img->save(storage_path('app/public/images/uploads/full/'.$name.'.jpg'));
        } catch (\Exception $e){
            throw $e;
        }

        return $name;

    }
}