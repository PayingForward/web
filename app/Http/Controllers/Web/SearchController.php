<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Exceptions\WebApiException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use App\Models\School;
use App\Models\Town;

class SearchController extends Controller {
    public function searchResults( Request $request ){
        $validation = Validator::make($request->all(),[
            'options'=>'array',
            'page'=>'numeric',
            'perPage'=>'numeric',
            'sortBy'=>'string',
            'sortMode'=>'string'
        ]);

        if($validation->fails()){
            throw new WebApiException("Invalid values supplied.",5);
        }

        $keyword = $request->input('keyword');
        $page = $request->input('page',1);
        $perPage = $request->input('perPage',30);
        $sortBy = $request->input('sortBy','school');
        $sortMode = $request->input('sortMode','desc');

        $query = DB::table('users AS u')
            ->select(['*','u.u_id'])
            ->join('childrens AS c','c.u_id','u.u_id')
            ->join('school_classes AS sc','sc.sc_id','c.sc_id')
            ->join('towns AS t','t.t_id','c.t_id')
            ->join('schools AS s','s.scl_id','sc.scl_id')
            ->where(function( Builder $query)use($keyword){
                $query->orWhere('c.chld_bio','LIKE',"%$keyword%");
                $query->orWhere('sc.sc_name','LIKE',"%$keyword%");
                $query->orWhere('t.t_name','LIKE',"%$keyword%");
                $query->orWhere('s.scl_name','LIKE',"%$keyword%");
                $query->orWhere('u.u_name','LIKE',"%$keyword%");
            })
            ->where('u.ut_id',config('usertypes.children'))
            ->whereNull('u.deleted_at')
            ->whereNull('c.deleted_at')
            ->whereNull('sc.deleted_at')
            ->whereNull('t.deleted_at')
            ->whereNull('s.deleted_at');

        // Filtering by checked options
        $towns = $request->input('options.town');
        if(is_array($towns)&&count($towns)){
            $query->whereIn('t.t_id',$towns);
        }

        $schools = $request->input('options.school');
        if(is_array($schools)&&count($schools)){
            $query->whereIn('s.scl_id',$schools);
        }

        $age_ranges = $request->input('options.age_range');
        if(is_array($age_ranges)&&count($age_ranges)){
            $query->where(function(Builder $query)use($age_ranges){
                $j = 0;
                for($i=10;$i<=25;$i+=5){
                    if(in_array($j,$age_ranges)){
                        $query->orWhereBetween(DB::raw('TIMESTAMPDIFF(YEAR,c.chld_dob,CURDATE())'),[$i-5,$i]);
                    }
                    $j++;
                }
            });
        }

        $count = $query->count();

        $query->take($perPage);
        $query->skip(($page-1)*$perPage);

        switch ($sortBy) {
            case 'school':
                $query->orderBy('s.scl_name',$sortMode);
                break;
            case 'class':
                $query->orderBy('sc.sc_name',$sortMode);
                break;
            case 'town':
                $query->orderBy('t.t_name',$sortMode);
                break;
            default:
                $query->orderBy('u.u_name',$sortMode);
                break;
        }

        $results = $query->get();

        $results->transform(function($row){
            return [
                'school'=>[
                    'id'=>$row->scl_id,
                    'label'=>$row->scl_name
                ],
                'schoolClass'=>[
                    'id'=>$row->sc_id,
                    'label'=>$row->sc_name,
                ],
                'town'=>[
                    'id'=>$row->t_id,
                    'label'=>$row->t_name,
                ],
                'name'=>$row->u_name,
                'id'=>$row->u_id,
                'dob'=>$row->chld_dob,
                'avatar'=>$row->u_avatar
            ];
        });

        return \success_response([
            'results'=>$results,
            'count'=>$count
        ]);
    }

    public function searchAgeRange(Request $request){
        $min = 10;
        $max = 25;

        $keyword = $request->input('keyword');
        $keyword = (int) $keyword ;

        $options = [];

        $j = 0;
        for($i=$min;$i<=$max;$i+=5){
            if(!$keyword||($keyword<$i)){
                $options[] = [
                    'id'=>$j,
                    'label'=>($i-5).' - '.$i.'Years'
                ];
                $j++;
            }
        }

        return \success_response(['options'=>$options]);
    }

    public function searchSchool(Request $request){
        $keyword = $request->input('keyword');

        $schools = School::where('scl_name','LIKE',"%$keyword%")->orderBy('scl_name','asc')->get();

        $schools->transform(function(School $school){
            return [
                'id'=>$school->getKey(),
                'label'=>$school->scl_name
            ];
        });

        return \success_response(['options'=>$schools]);
    }

    public function searchTowns(Request $request){
        $keyword = $request->input('keyword');

        $towns = Town::where('t_name','LIKE',"%$keyword%")->orderBy('t_name','asc')->get();

        $towns->transform(function(Town $town){
            return [
                'id'=>$town->getKey(),
                'label'=>$town->t_name
            ];
        });

        return \success_response(['options'=>$towns]);
    }
}