<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\WebApiException;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Donation;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;

class DonationController extends Controller {
    public function getInfo(Request $request){
        $validation = Validator::make($request->all(),[
            'childId'=>'required|numeric'
        ]);

        $children = null;

        $loggedUser = Auth::user();

        $donationId = strtolower( base64_encode($loggedUser->u_id.time()));

        $donationId = \preg_replace('/([^a-zA-Z0-9]+)/','',$donationId);

        Donation::create([
            'd_no'=>$donationId,
            'u_id'=>$loggedUser->getKey()
        ]);

        if(!$validation->fails()){
            $user = User::with(['children','children.schoolClass','children.schoolClass.school','children.town'])
                ->where('ut_id',config('usertypes.children'))
                ->where('u_id',$request->input('childId'))
                ->first();

            if(!$user||!$user->children){
                throw new WebApiException("Invalid values supplied.",5);
            }

            $town = null;
            $school = null;
            $schoolClass = null;

            if($user->children->town){
                $town = [
                    'id'=>$user->children->town->getKey(),
                    'label'=>$user->children->town->t_name
                ];
            }

            if($user->children->schoolClass){
                $schoolClass = [
                    'id'=>$user->children->schoolClass->getKey(),
                    'label'=>$user->children->schoolClass->sc_name
                ];

                if($user->children->schoolClass->school){
                    $school = [
                        'id'=>$user->children->schoolClass->school->getKey(),
                        'label'=>$user->children->schoolClass->school->scl_name
                    ];
                }
            }

            $children = [
                'id'=>$user->getKey(),
                'name'=>$user->u_name,
                'avatar'=>$user->u_avatar,
                'town'=>$town,
                'schoolClass'=>$schoolClass,
                'school'=>$school
            ];
        }

        return success_response([
            'children'=>$children,
            'donationId'=>$donationId
        ]);
    }

    public function renderPaymentBox(Request $request){
        $validation = Validator($request->all(),[
            'amount'=>'required',
            'donation'=>'required',
            'mode'=>'required'
        ]);

        if($validation->fails()){
            abort(422);
        }

        $classPath =  __DIR__.'/../../../../bootstrap/Payment-Gateway/lib/cryptobox.class.php';

        require_once( $classPath);

        $modes = array_keys($request->input('mode'));

        if(empty($modes)){
            abort(422);
        }

        /** @var Donation $donation */
        $donation = Donation::where('d_no',$request->input('donation'))->first();
        
        if(!$donation){
            abort(422);
        }

        $orderID    =  $request->input('donation');
        $userID     = $donation->u_id;
        $def_language   = "en"; // default payment box language; en - English, es - Spanish, fr - French, etc
        

        // Remove all the characters from the string other than a..Z0..9_-@. 
        $orderID = preg_replace('/[^A-Za-z0-9\.\_\-\@]/', '', $orderID);
        $userID = preg_replace('/[^A-Za-z0-9\.\_\-\@]/', '', $userID);

        $options = array( 
            "public_key"  => config('app.gourl_keys.bitcoin.public'),         // place your public key from gourl.io
            "private_key" => config('app.gourl_keys.bitcoin.private'),         // place your private key from gourl.io
            "webdev_key"  => "",        // optional, gourl affiliate program key
            "orderID"     => $orderID,   // few your users can have the same orderID but combination 'orderID'+'userID' should be unique
            "userID"      => $userID,   // optional; place your registered user id here (user1, user2, etc)
                    // for example, on premium page you can use for all visitors: orderID="premium" and userID="" (empty) 
                    // when userID value is empty - system will autogenerate unique identifier for every user and save it in cookies 
            "userFormat"  => "COOKIE",   // save your user identifier userID in cookies. Available: COOKIE, SESSION, IPADDRESS, MANUAL
            "amount"      => 0,         // amount in cryptocurrency or in USD below
            "amountUSD"   => $request->input('amount'),         // price is 2 USD; it will convert to cryptocoins amount, using Live Exchange Rates
                                        // For convert fiat currencies Euro/GBP/etc. to USD, use function convert_currency_live()
            "period"      => "24 HOUR",  // payment valid period, after 1 day user need to pay again
            "iframeID"    => "",         // optional; when iframeID value is empty - system will autogenerate iframe html payment box id
            "language"    => $def_language // text on EN - english, FR - french, please contact us and we can add your language
            );  

        // Initialise Bitcoin Payment Class 
        $box = new \Cryptobox ($options);

        // Display payment box with custom width = 560 px and big qr code / or successful result
        $payment_box = $box->display_cryptobox(true, 560, 230, "border-radius:15px;border:1px solid #eee;padding:3px 6px;margin:10px;",
                        "display:inline-block;max-width:580px;padding:15px 20px;border:1px solid #eee;margin:7px;line-height:25px;"); 

        // Language selection list for payment box (html code)
        $languages_list = display_language_box($def_language);

        // Log
        $message = null;
        
        // A. Process Received Payment
        if ($box->is_paid() &&!$box->is_processed()) 
        {
            $message = "A. User will see this message during 24 hours after payment has been made!";
            
            $message .= "<br>".$box->amount_paid()." ".$box->coin_label()."  received<br>";

            $donation->d_amount = $request->input('amount');
            $donation->d_payed_at = date('Y-m-d H:i:s');
            $donation->save();
        }  
        else {
            $message .= null;
            $box->set_status_processed();


            $donation->d_mode = $modes[0];

            $donation->d_privacy = $request->input('annonymous')?$request->input('annonymous'):0;

            if($request->input('child')){
                $donation->chld_u_id = $request->input('child');
            }

            $donation->save();
        }

        return view('cryptobox',[
            'languages_list'=>$languages_list,
            'payment_box'=>$payment_box,
            'message'=>$message,
        ]);
    }

    public function history(Request $request){
        $validation = Validator::make($request->all(),[
            'page'=>'required|numeric',
            'perPage'=>'required|numeric',
            'sortBy'=>'required',
            'sortMode'=>'required|in:desc,asc'
        ]);

        if($validation->fails()){
            throw new WebApiException($validation->errors()->first());
            throw new WebApiException("Some validations failed. Please try again.");
        }

        $keyword = $request->input('keyword');
        $sortBy = 'd.d_payed_at';
        $sortMode = $request->input('sortMode');
        $page = $request->input('page');
        $perPage = $request->input('perPage');

        $donationsQuery = DB::table('donations AS d')
            ->select([
                'd.d_amount',
                'd.d_payed_at',
                'd.d_mode',
                'u.u_id',
                'u.u_name',
                'u.u_avatar',
                'c.u_id AS chld_id',
                'c.u_name AS chld_name',
                'c.u_avatar AS chld_avatar',
                'd.d_payed_at'])
            ->join('users AS u','u.u_id','d.u_id')
            ->leftJoin('users AS c','c.u_id','d.chld_u_id')
            ->whereNotNull('d.d_payed_at')
            ->where(function(Builder $query)use($keyword){
                $query->orWhere('u.u_name','LIKE',"%$keyword%");
                $query->orWhere('c.u_name','LIKE',"%$keyword%");
            });

        $count = $donationsQuery->count();

        $donations = $donationsQuery
            ->orderBy($sortBy,$sortMode)
            ->take($perPage)
            ->skip($perPage*($page-1))
            ->get();

        $donations->transform(function($donation){

            $child = null;

            if($donation->chld_id){
                $child = [
                    'id'=>$donation->chld_id,
                    'name'=>$donation->chld_name,
                    'avatar'=>$donation->chld_avatar
                ];
            }

            return [
                'user'=>[
                    'id'=>$donation->u_id,
                    'name'=>$donation->u_name,
                    'avatar'=>$donation->u_avatar
                ],
                'child'=>$child,
                'amount'=>$donation->d_amount,
                'mode'=>$donation->d_mode,
                'dateTime'=>$donation->d_payed_at
            ];
        });


        return \success_response([
            'donations'=>$donations,
            'count'=>$count,
        ]);
    }
}