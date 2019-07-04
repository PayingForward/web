<?php
namespace Tests\Feature\Web\User;

use Tests\Feature\Base;

class InfoTest extends Base {
    public function testBasic(){
        $this->login();

        $response = $this->request('web/user/info',[]);

        $this->assertTrue($response['success']);
        $this->assertIsString($response['type']);
        $this->assertIsString($response['name']);
        $this->assertIsInt($response['id']);
    }
}