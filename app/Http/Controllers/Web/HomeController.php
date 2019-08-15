<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// use Illuminate\Support\Facades\Validator;

class HomeController extends Controller {
    public function donorMenu(Request $request){
        $childs = Children::withFormatingRelations()
            ->orderBy(DB::raw('RAND()'))
            ->take(10)
            ->get();

        $childs->transform(function(Children $child){
            return $child->getFormatedArray();
        });

        $schools = School::withFormatingRelations()->get();
        $schools->transform(function(School $scl){
            return $scl->getFormatedArray();
        });

        return success_response([
            'childs'=>$childs,
            'schools'=>$schools,
            'methods'=>[]
        ]);
    }
}