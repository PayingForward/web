<?php
namespace Tests\Feature\Web\Form;

use Tests\Feature\Base;
use App\Models\User;

class DeleteTest extends Base {

    protected function setUp():void{
        parent::setUp();

        $this->login();
    }

    public function testWithoutId(){
        $response = $this->request('web/form/user/delete',[]);

        $this->assertWebApiException($response,5);
    }

    public function testWithDeletedUser(){
        $user = factory(User::class)->create();

        $key = $user->getKey();

        $user->delete();

        $response = $this->request('web/form/user/delete',[
            'id'=>$key
        ]);

        $this->assertWebApiException($response,2);
    }

    public function testSuccessfullDelete(){
        $user=  factory(User::class)->create();

        $key = $user->getKey();

        $response = $this->request('web/form/user/delete',[
            'id'=>$key
        ]);

        $this->assertEquals($response['success'],true);
        $this->assertIsString($response['message']);

        $existUser = User::find($key);

        $this->assertEmpty($existUser);
    }
}