<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\WebApiException;
use App\Models\User;

class DonationController extends Controller {
    public function getInfo(Request $request){
        $validation = Validator::make($request->all(),[
            'childId'=>'required|numeric'
        ]);

        if($validation->fails()){
            throw new WebApiException("Invalid values supplied.",5);
        }

        $children = User::with('children')->find($request->input('childId'));

        if(!$children){
            throw new WebApiException("Invalid values supplied.",5);
        }

        return success_response([
            'children'=>[
                'id'=>$children->getKey(),
                'name'=>$children->u_name,
                'avatar'=>$children->u_avatar
            ]
        ]);
    }
}