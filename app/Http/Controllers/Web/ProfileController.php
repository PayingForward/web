<?php
namespace App\Http\Controllers\Web;

use App\Exceptions\WebApiException;
use App\Http\Controllers\Controller;
use App\Models\Children;
use App\Models\Donor;
use App\Models\OtherProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function save(Request $request){

    }
}