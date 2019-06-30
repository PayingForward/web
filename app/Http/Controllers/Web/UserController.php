<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Exceptions\WebApiException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller {
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
            throw new WebApiException("User has deleted or blocked.",2);
        }

        if(!Hash::check($request->password,$user->u_password)){
            throw new WebApiException("Password incorrect.",3);
        }

        if(!isset($user->userType)){
            throw new WebApiException("Your account has an error.",4);
        }

        $token = $user->createToken('Web Token', [\strtolower($user->userType->ut_code)])->accessToken;

        return \success_response([
            'token'=>$token,
            'type'=>$user->userType->ut_code,
            'name'=>$user->u_name,
            'id'=>$user->getKey()
        ]);
    }
}