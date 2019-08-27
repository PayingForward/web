<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDonorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('donors', function (Blueprint $table) {
            $table->bigIncrements('dnr_id');

            $table->string('dnr_bio')->nullable();

            $table->unsignedBigInteger('t_id')->nullable();
            $table->foreign('t_id')->references('t_id')->on('towns');


            $table->unsignedBigInteger('c_id')->nullable()->comment('Interest');
            $table->foreign('c_id')->references('c_id')->on('countries');

            $table->unsignedBigInteger('u_id')->nullable();
            $table->foreign('u_id')->references('u_id')->on('users');

            $table->unsignedBigInteger('occ_id')->nullable();
            $table->foreign('occ_id')->references('occ_id')->on('occupations');

            $table->string('dnr_contact_email')->nullable();

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
        Schema::dropIfExists('donors');
    }
}
