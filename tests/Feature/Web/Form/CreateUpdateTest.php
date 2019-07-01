<?php
namespace Tests\Feature\Web\Form;

use Tests\Feature\Base;
use Faker\Factory;

class CreateUpdateTest extends Base {

    protected function setUp():void{
        parent::setUp();

        $this->login();
    }
        
    public function testEmptyCreation(){
        $response = $this->request('web/form/user/create',[]);

        $this->assertEquals($response['success'],false);
        $this->assertWebApiException($response,5);
    }
            
    public function testEmptyUpdation(){
        $response = $this->request('web/form/user/update',[]);

        $this->assertEquals($response['success'],false);
        $this->assertWebApiException($response,5);
    }

    public function testWithoutRequiredFieldsCreate(){
        $response = $this->request('web/form/user/create',[
            'values'=>[
                'name'=>'Created user',
            ]
        ]);

        $this->assertEquals($response['success'],false);
        $this->assertWebApiException($response,5);
    }

    public function testBasicCreate(){
        $faker = Factory::create();
        $response = $this->request('web/form/user/create',[
            'values'=>[
                'name'=>"Created user",
                'email'=>$faker->unique()->safeEmail,
                'password'=>'123'
            ]
        ]);

        $this->assertEquals($response['success'],true);
        $this->assertIsString($response['message']);
    }
}