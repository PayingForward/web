<?php

namespace Tests\Feature\Helpers;

use App\Models\User;
use App\Models\UserType;
use Illuminate\Support\Facades\Hash;

trait WithUser {
    /**
     * User instance for all tests
     *
     * @var User
     */
    protected $user;

    /**
     * User type for all test cases
     *
     * @var UserType
     */
    protected $userType;

    /**
     * Making a new user
     *
     * @return void
     */
    protected function makeUser(){
        $user = User::where('u_email','test@payingforward.net')->first();
        if($user){
            $this->user = $user;
        } else {
            $user = User::create([
                'u_name' => "Testing user",
                'u_email' => 'test@payingforward.net',
                'u_password' => Hash::make('123'),
                'ut_id'=>1
            ]);

            $this->user = $user;
        }
    }

    /**
     * Making a new user type
     * 
     * @return void
     */
    public function makeUserType(){
        $this->userType = \factory(UserType::class)->create();
    }

}