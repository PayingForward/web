<?php

namespace Tests\Feature\Web\Form;

use Tests\Feature\Base;

class SearchTest extends Base {

    protected function setUp():void{
        parent::setUp();

        $this->login();
    }
    
    public function testWithoutParameters(){
        $response = $this->request('web/form/user/search',[]);

        $this->assertWebApiException($response,5);
    }

    public function testWithEmptyParameters(){
        $response = $this->request('web/form/user/search',[
            'values'=>[],
            'page'=>1,
            'perPage'=>30,
            'sortBy'=>'name'
        ]);

        $this->assertTrue($response['success'],true);
        $this->assertNotEmpty($response['results']);
        $this->assertTrue($response['count']>0);
    }

    public function testWithParameters(){
        $response = $this->request('web/form/user/search',[
            'values'=>[
                'name'=>$this->user->u_name
            ],
            'page'=>1,
            'perPage'=>20,
            'sortBy'=>'name'
        ]);

        $this->assertEquals($response['success'],true);
        $this->assertNotEmpty($response['results']);
        $this->assertTrue($response['count']>0);

        $this->store('form-search',$response);
    }
}