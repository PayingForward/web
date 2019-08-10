<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\Models\UserType;

class SocialController extends Controller
{
    public function redirect(Request $request,string $provider){
        return Socialite::driver($provider)->redirect();
    }

    public function callback(Request $request,string $provider){
        $socialUser = Socialite::driver('google')->stateless()->user();

        $user = User::where('u_social_provider',User::providerId($provider))->where('u_social_id',$socialUser->getId())->first();

        if(!$user){

            // Avatar

            $value = file_get_contents($socialUser->getAvatar());

            $name = time().rand(100, 999);

            $thumbnail_sizes = [32,64,200];

            foreach ($thumbnail_sizes as $size) {
                $img = Image::make($value);
                $img->resize($size, $size);
                $img->save(storage_path('app/public/images/uploads/'.$size.'/'.$name.'.jpg'));
            }

            $img = Image::make($value);
            $img->save(storage_path('app/public/images/uploads/full/'.$name.'.jpg'));

            $user = User::create([
                'u_name'=>$socialUser->getName(),
                'u_email'=>$socialUser->getEmail(),
                'u_avatar'=>$name,
                'ut_id'=>config('usertypes.donor')
            ]);
        }

        $type = UserType::where('ut_id',config('usertypes.donor'))->first();

        $token = $user->createToken('Web Token', [\strtolower($type->ut_code)])->accessToken;

        return view('social_login_redirect',[
            'token'=>$token
        ]);
        
    }
}
