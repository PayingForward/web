<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChildrensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('childrens', function (Blueprint $table) {
            $table->bigIncrements('chld_id');

            $table->unsignedBigInteger('sc_id')->nullable();
            $table->foreign('sc_id')->references('sc_id')->on('school_classes');

            $table->date('chld_dob')->nullable();
            $table->string('chld_bio')->nullable();

            $table->unsignedBigInteger('t_id')->nullable();
            $table->foreign('t_id')->references('t_id')->on('towns');

            $table->unsignedBigInteger('u_id')->nullable();
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
        Schema::dropIfExists('childrens');
    }
}
