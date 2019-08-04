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

        if(!$user->email_verified_at){
            throw new WebApiException("Please verify your email address.",8);
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
            // ->with('children')
            ->where('ut_id',config('usertypes.children'))
            ->orderBy(DB::raw('RAND()'))
            ->take($count)
            ->get();

        $childrens->transform(function(User $user){
            // if(!$user->children)
            //     return null;

            return [
                'type'=>$user->getRollName(),
                'name'=>$user->u_name,
                'id'=>$user->u_id,
                'avatar'=>$user->u_avatar
            ];
        });

        // $childrens = $childrens->filter(function($child){
        //     return !!$child;
        // })->values();

        return \success_response(['childs'=>$childrens]);
    }

    public function signup(Request $request){
        $validation = Validator::make($request->all(),[
            'name'=>'required|min:4',
            'email'=>'required|email',
            'password'=>'required|min:4',
            'passwordConfirmation'=>'required|min:4'
        ]);

        if($validation->fails()){
            throw new WebApiException("Invalid values supplied.",5);
        }

        if($request->input('password')!=$request->input('password')){
            throw new WebApiException("Invalid values supplied.",5);
        }

        $usersByEmail = User::where('u_email',$request->input('email'))->count();

        if($usersByEmail){
            throw new WebApiException("Email has already taken! Please use a different one!");
        } // $childrens = $childrens->filter(function($child){
            //     return !!$child;
            // })->values(); // $childrens = $childrens->filter(function($child){
        //     return !!$child;
        // })->values();

        /** @var User $user */
        $user = User::create([
            'u_name'=>$request->input('name'),
            'u_email'=>$request->input('email'),
            'u_password'=> Hash::make($request->input('password')),
            'ut_id'=>config('usertypes.donor')
        ]);

        $user->u_token = strtolower(base64_encode($user->getKey().time().'abandonedseed'));

        $user->save();

        $user->sendEmailVerificationNotification();

        return \success_response([
            'message'=>"We have sent a confirmation email to '".$request->input('email')."'. Please click the link in this email and confirm your email address"
        ]);
    }
}