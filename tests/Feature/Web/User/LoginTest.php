<?php

namespace Tests\Feature\Web\User;

use Tests\Feature\Base;

class LoginTest extends Base
{
    /**
     * Setup the test environment.
     *
     * @return void
     */
    protected function setUp():void
    {
        parent::setUp();

        $this->makeUser();
    }
    /**
     * Trying to login with a wrong email.
     *
     * @return void
     */
    public function testLoginWithWrongEmail()
    {
        $response = $this->request('web/user/login',[
            'email'=>'wrong@abandonedseed.com',
            'password'=>'123'
        ],false);

        $this->assertWebApiException($response,1);
    }

    /**
     * Testing with correct email and wrong password
     *
     * @return void
     */
    public function testLoginWithCorrectEmailWrongPassword(){
        $response = $this->request('web/user/login',[
            'email'=>$this->user->u_email,
            'password'=>'8979'
        ],false);

        $this->assertWebApiException($response,3);
    }

    /**
     * Testing with correct email and password to delted user
     *
     * @return void
     */
    public function testWithCorrectPasswordToDeletedUser(){
        $this->user->delete();

        $response = $this->request('web/user/login',[
            'email'=>$this->user->u_email,
            'password'=>123
        ],false);

        $this->assertWebApiException($response,2);
    }

    /**
     * Testing to user with no user type
     * 
     * @return void
     */
    public function testToUserWithNoUserType(){
        $this->user->ut_id=null;
        $this->user->save();

        $response =  $this->request('web/user/login',[
            'email'=>$this->user->u_email,
            'password'=>123
        ],false);

        $this->assertWebApiException($response,4);
    }

    /**
     * Testing successfull login
     * 
     * @return void
     */
    public function testSuccessfullLogin(){
        $response = $this->request('web/user/login',[
            'email'=>$this->user->u_email,
            'password'=>123
        ],false);

        $this->assertEquals($response['success'],true);
        $this->assertIsString($response['token']);
        $this->assertIsString($response['name']);
        $this->assertIsString($response['type']);
        $this->assertIsInt($response['id']);
    }
}
