<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\WebApiException;
use App\Models\User;
use Illuminate\Http\Request;

class DonationController extends Controller {
    public function getInfo(Request $request){
        $validation = Validator::make($request->all(),[
            'childId'=>'required|numeric'
        ]);

        if($validation->fails()){
            throw new WebApiException("Invalid values supplied.",5);
        }

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

        return success_response([
            'children'=>[
                'id'=>$user->getKey(),
                'name'=>$user->u_name,
                'avatar'=>$user->u_avatar,
                'town'=>$town,
                'schoolClass'=>$schoolClass,
                'school'=>$school
            ]
        ]);
    }

    public function renderPaymentBox(){
        $classPath =  __DIR__.'/../../../../bootstrap/Payment-Gateway/lib/cryptobox.class.php';

        require_once( $classPath);

        $orderID    =  "your_product1_or_signuppage1_etc";
        $userID     = "1";
        $def_language   = "en"; // default payment box language; en - English, es - Spanish, fr - French, etc

        // Remove all the characters from the string other than a..Z0..9_-@. 
        $orderID = preg_replace('/[^A-Za-z0-9\.\_\-\@]/', '', $orderID);
        $userID = preg_replace('/[^A-Za-z0-9\.\_\-\@]/', '', $userID);

        $options = array( 
            "public_key"  => "25654AAo79c3Bitcoin77BTCPUBqwIefT1j9fqqMwUtMI0huVL",         // place your public key from gourl.io
            "private_key" => "25654AAo79c3Bitcoin77BTCPRV0JG7w3jg0Tc5Pfi34U8o5JE",         // place your private key from gourl.io
            "webdev_key"  => "",        // optional, gourl affiliate program key
            "orderID"     => $orderID,   // few your users can have the same orderID but combination 'orderID'+'userID' should be unique
            "userID"      => $userID,   // optional; place your registered user id here (user1, user2, etc)
                    // for example, on premium page you can use for all visitors: orderID="premium" and userID="" (empty) 
                    // when userID value is empty - system will autogenerate unique identifier for every user and save it in cookies 
            "userFormat"  => "COOKIE",   // save your user identifier userID in cookies. Available: COOKIE, SESSION, IPADDRESS, MANUAL
            "amount"      => 0,         // amount in cryptocurrency or in USD below
            "amountUSD"   => 2,         // price is 2 USD; it will convert to cryptocoins amount, using Live Exchange Rates
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
        $message = "";
        
        // A. Process Received Payment
        if ($box->is_paid()) 
        {
            $message .= "A. User will see this message during 24 hours after payment has been made!";
            
            $message .= "<br>".$box->amount_paid()." ".$box->coin_label()."  received<br>";
            
            // Your code here to handle a successful cryptocoin payment/captcha verification
            // For example, give user 24 hour access to your member pages
            // ...
        
            // Please use IPN (instant payment notification) function cryptobox_new_payment() for update db records, etc
            // Function cryptobox_new_payment($paymentID = 0, $payment_details = array(), $box_status = "") called every time 
            // when a new payment from any user is received.
            // IPN description: https://gourl.io/api-php.html#ipn 
        }  
        else $message .= "The payment has not been made yet";

        
        // B. Optional - One-time Process Received Payment
        if ($box->is_paid() && !$box->is_processed()) 
        {
            $message .= "B. User will see this message one time after payment has been made!";  
        
            // Your code here - user see successful payment result
            // ...

            // Also you can use $box->is_confirmed() - return true if payment confirmed 
            // Average transaction confirmation time - 10-20min for 6 confirmations  
            
            // Set Payment Status to Processed
            $box->set_status_processed(); 
            
            // Optional, cryptobox_reset() will delete cookies/sessions with userID and 
            // new cryptobox with new payment amount will be show after page reload.
            // Cryptobox will recognize user as a new one with new generated userID
            // $box->cryptobox_reset(); 


            // ...
            // Also you can use IPN function cryptobox_new_payment($paymentID = 0, $payment_details = array(), $box_status = "") 
            // for send confirmation email, update database, update user membership, etc.
            // You need to modify file - cryptobox.newpayment.php, read more - https://gourl.io/api-php.html#ipn
            // ...

        }

        return view('cryptobox',[
            'languages_list'=>$languages_list,
            'payment_box'=>$payment_box,
            'message'=>$message,
        ]);
    }
}