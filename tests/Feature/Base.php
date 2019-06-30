<?php
namespace Tests\Feature;

use Tests\Feature\Helpers\WithUser;
use Tests\TestCase;
use Illuminate\Support\Facades\Storage;

/**
 * This is the base class for all test cases
 * 
 */
class Base extends TestCase {
    use WithUser;

    protected $authToken = "";

    protected function request($url,$data,$authTokenAppend=true){
        $headers = [
            'Content-Type'=>'application/json',
            'Accept'=>'application/json'
        ];

        if($authTokenAppend){
            $headers['Authorization'] = "Bearer ".$this->authToken;
        }

        $response = $this->postJson('/api/'.$url,$data,$headers);

        $response->assertStatus(200);

        return $response->decodeResponseJson();
    }

    protected function assertWebApiException($response,$code){
        $this->assertEquals($response['success'],false);
        $this->assertEquals($response['code'],'WE'.$code);
    }

    public function login(){
        $this->makeUser();
        $response = $this->request('web/user/login',[
            'email'=>$this->user->u_email,
            'password'=>123
        ]);

        $this->assertEquals($response['success'],true);
        $this->assertIsString($response['token']);

        $this->authToken =  $response['token'];
    }

    public function store($name,$request){
        Storage::put("/public/tests/$name.json",json_encode($request));
    }
}