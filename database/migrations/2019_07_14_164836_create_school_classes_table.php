<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchoolClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('school_classes', function (Blueprint $table) {
            $table->bigIncrements('sc_id');
            $table->string('sc_name');
            $table->string('sc_code');
            $table->unsignedBigInteger('scl_id');
            $table->foreign('scl_id')->references('scl_id')->on('schools');
            $table->unsignedBigInteger('u_id');
            $table->foreign('u_id')->references('u_id')->on('users');
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
        Schema::dropIfExists('school_classes');
    }
}
