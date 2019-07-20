<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Exceptions\WebApiException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller {
    /**
     * Keep login a user
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function login(Request $request){
        $validation = Validator::make($request->all(),[
            'email'=>'required|email|exists:users,u_email',
            'password'=>'required'
        ]);

        if($validation->fails()){
            throw new WebApiException("Invalid username or password.",1);
        }

        $user  = User::with('userType')->where('u_email',$request->email)->first();

        if(!$user){
            throw new WebApiException("The record has deleted or blocked.",2);
        }

        if(!Hash::check($request->password,$user->u_password)){
            throw new WebApiException("Password incorrect.",3);
        }

        if(!isset($user->userType)){
            throw new WebApiException("Your account has an error.",4);
        }

        $token = $user->createToken('Web Token', [\strtolower($user->userType->ut_code)])->accessToken;

        return \success_response([
            'message'=>"Successfully logged in. Please wait while redirecting.",
            'token'=>$token,
            'type'=>$user->userType->ut_code,
            'name'=>$user->u_name,
            'id'=>$user->getKey(),
            'avatar'=>$user->u_avatar
        ]);
    }

    /**
     * Returning the current logged user informations
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function info(Request $request){
        /** @var User $user */
        $user = Auth::user();

        return success_response([
            'type'=>$user->getRollName(),
            'name'=>$user->u_name,
            'id'=>$user->u_id,
            'avatar'=>$user->u_avatar
        ]);
    }

    public function getRandomChildrens(Request $request){
        $validation = Validator::make($request->all(),[
            'count'=>'numeric'
        ]);

        if($validation->fails()){
            throw new WebApiException("Invalid values supplied.",5);
        }

        $count = $request->input('count',2);
        $except = $request->input('except',[]);

        $childrens = User::whereNotIn('u_id',$except)
            ->where('ut_id',config('usertypes.children'))
            ->orderBy(DB::raw('RAND()'))
            ->take($count)
            ->get();

        $childrens->transform(function(User $user){
            return [
                'type'=>$user->getRollName(),
                'name'=>$user->u_name,
                'id'=>$user->u_id,
                'avatar'=>$user->u_avatar
            ];
        });

        return \success_response(['childs'=>$childrens]);
    }
}