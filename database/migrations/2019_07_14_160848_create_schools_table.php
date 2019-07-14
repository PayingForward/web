<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchoolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->bigIncrements('scl_id');
            $table->string('scl_name')->nullable();
            $table->string('scl_code')->nullable();
            $table->string('scl_address')->nullable();
            $table->string('scl_email')->nullable();
            $table->string('scl_phone_num')->nullable();
            $table->unsignedBigInteger('t_id')->nullable();
            $table->foreign('t_id')->references('t_id')->on('towns');
            $table->unsignedBigInteger('u_id')->nullable();
            $table->foreign('u_id')->references('u_id')->on('users');
            $table->string('scl_logo')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schools');
    }
}
