<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDonationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->bigIncrements('d_id');
            $table->string('d_no');
            $table->unsignedBigInteger('u_id')->nullable();
            $table->foreign('u_id')->references('u_id')->on('users');
            $table->tinyInteger('d_mode')->default(0);
            $table->unsignedBigInteger('chld_u_id')->nullable();
            $table->foreign('chld_u_id')->references('u_id')->on('users');
            $table->timestamp('d_payed_at')->nullable();
            $table->decimal('d_amount',10,2)->nullable();
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
        Schema::dropIfExists('donations');
    }
}
