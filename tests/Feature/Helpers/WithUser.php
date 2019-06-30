<?php

namespace Tests\Feature\Helpers;

use App\Models\User;
use App\Models\UserType;

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
        $this->user = factory(User::class)->create();
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