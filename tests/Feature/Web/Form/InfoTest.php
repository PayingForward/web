<?php
namespace Tests\Feature\Web\Form;

use Tests\Feature\Base;

class InfoTest extends Base{
    public function testBasic(){
        $this->login();

        $response = $this->request('web/form/user/info',[]);

        $this->assertTrue($response['success']);
        $this->assertIsArray($response['inputs']);
        $this->assertIsArray($response['columns']);
        $this->assertIsString($response['title']);
        $this->assertIsArray($response['structure']);
        $this->assertIsArray($response['actions']);
    }
}