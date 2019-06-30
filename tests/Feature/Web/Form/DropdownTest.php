<?php


namespace Tests\Feature\Web\Form;

use Tests\Feature\Base;

class DropdownTest extends Base {

    protected function setUp():void{
        parent::setUp();

        $this->login();
    }
    
    public function testWithoutKeyword(){

        $response = $this->request('web/form/user/dropdown',[]);

        $this->assertEquals($response['success'],true);
        $this->assertIsArray($response['items']);
    }

    public function testWithKeyword(){

        $response = $this->request('web/form/user/dropdown',[
            'keyword'=>'Paul'
        ]);


        $this->assertEquals($response['success'],true);
        $this->assertIsArray($response['items']);
    }

    public function testWithWhere(){

        $response = $this->request('web/form/user/dropdown',[
            'where'=>[
                'type'=>0
            ]
        ]);

        $this->assertEquals($response['success'],true);
        $this->assertIsArray($response['items']);

        $this->assertEmpty($response['items']);

    }

    public function testWithPagination(){
        $response = $this->request('web/form/user/dropdown',[
            'page'=>1,
            'perPage'=>10,
        ]);

        $this->assertEquals($response['success'],true);
        $this->assertIsArray($response['items']);

        $this->assertTrue(count($response['items'])<=10);
        $this->store('form-dropdown-pagination',$response);
    }
}