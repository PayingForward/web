<?php
namespace App\Http\Controllers\Web;

use App\Exceptions\WebApiException;
use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\Country;
use App\Models\Donor;
use App\Models\Occupation;
use App\Models\OtherProfile;
use App\Models\School;
use App\Models\SchoolClass;
use App\Models\Town;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class ProfileController extends Controller {
    public function load(Request $request){
        $userId = $request->input('userId');
        /** @var User $user */
        $user = null;

        if(isset($userId)){
            if(!is_numeric($userId)){
                throw new WebApiException('Can not find a profile for your request parameters.',9);
            }

            /** @var User $user */
            $user = User::find($userId);

            if(!$user){
                throw new WebApiException('Can not find a profile for your request parameters.',9);
            }

        } else {
            /** @var User $user */
            $user = Auth::user();

            if(!$user){
                throw new WebApiException('Can not find a profile for your request parameters.',9);
            }
        }

        $profile = null;

        $rollName = $user->getRollName();

        switch ($rollName) {
            case 'orphan':
                $profile = Children::withFormatingRelations()->where('u_id',$user->getKey())->first();
                break;
            case 'donor':
                $profile = Donor::withFormatingRelations()->where('u_id',$user->getKey())->first();
                break;
            default:
                $profile = OtherProfile::withFormatingRelations()->where('u_id',$user->getKey())->first();
                break;
        }

        return success_response(['profile'=>$profile?$profile->getFormatedArray():$user->getFormatedArray()]);
    }

    public function saveAvatar(Request $request){
        $validation = Validator::make($request->all(),[
            'avatar'=>'required'
        ]);

        if($validation->fails()){
            throw new WebApiException("Invalid values supplied.",5);
        }

        $value = $request->input('avatar');

        $name = time().rand(100, 999);

        $thumbnail_sizes = [32,64,200];

        try {
            foreach ($thumbnail_sizes as $size) {
                $img = Image::make($value);
                $img->resize($size, $size);
                $img->save(storage_path('app/public/images/uploads/'.$size.'/'.$name.'.jpg'));
            }

            $img = Image::make($value);
            $img->save(storage_path('app/public/images/uploads/full/'.$name.'.jpg'));

            return \success_response(['name'=>$name]);

        } catch( \Exception $e){
            throw new WebApiException("Invalid values supplied.",5);
        }

    }
    
    public function save(Request $request){
        $avatar = $request->input('profile.avatar');
        $bio    = $request->input('profile.bio');
        $name = $request->input('profile.name');

        $town = $request->input('profile.town.id');
        if(isset($town))
            $town = Town::find($town);

        $country = $request->input('profile.country.id');
        if(isset($country))
            $country = Country::find($country);

        $school = $request->input('profile.school.id');
        if(isset($school))
            $school = School::find($school);

        $class = $request->input('profile.class.id');
        if(isset($class))
            $class = SchoolClass::find($class);

        $occupation = $request->input('profile.occupation.id');
        if(isset($occupation))
            $occupation = Occupation::find($occupation);

        $interestCountry = $request->input('profile.interestCountry.id');
        if(isset($interestCountry))
            $interestCountry = Country::find($interestCountry);

        $contactEmail = $request->input('profile.contactEmail');

        if(!$avatar&&!$bio)
            throw new WebApiException("Invalid values supplied.",5);

        /** @var User $user */
        $user = Auth::user();

        $roll = $user->getRollName();

        /** @var Children $children */
        $children = null;
        /** @var Donor $donor */
        $donor = null;
        /** @var OtherProfile $other */
        $other = null;

        switch ($roll) {
            case 'orphan':
                $children = Children::firstOrCreate([
                    'u_id'=>$user->getKey()
                ]);
                break;
            case 'donor':
                $donor = Donor::firstOrCreate([
                    'u_id'=>$user->getKey()
                ]);
                break;
            default:
                $other = OtherProfile::firstOrCreate([
                    'u_id'=>$user->getKey()
                ]);
                break;
        }
        if($avatar){
            $user->u_avatar = $avatar;
        }

        if($name){
            $user->u_name = $name;
        }

        $user->save();

        if($children){
            
            if($bio){
                $children->chld_bio = $bio;
            }

            if($town){
                $children->t_id = $town->getKey();
            }

            if($class){
                $children->sc_id = $class->getKey();
            }

            $children->save();
        } else if ($donor){
            if($bio){
                $donor->dnr_bio = $bio;
            }

            if($town){
                $donor->t_id = $town->getKey();
            }

            if($occupation){
                $donor->occ_id = $occupation->getKey();
            }

            if($interestCountry){
                $donor->c_id = $interestCountry->getKey();
            }

            if($contactEmail){
                $donor->dnr_contact_email = $contactEmail;
            }

            $donor->save();
            return $donor;
        } else {
            if($bio){
                $other->op_bio = $bio;
            }

            if($town){
                $other->t_id = $town->getKey();
            }

            $other->save();
        }

        return success_response([
            'message'=>"Successfully saved your profile."
        ]);
    }
}