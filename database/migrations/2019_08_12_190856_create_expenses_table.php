<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->bigIncrements('e_id');
            
            $table->unsignedBigInteger('u_id')->nullable();
            $table->foreign('u_id')->references('u_id')->on('users');

            $table->unsignedBigInteger('sc_id')->nullable();
            $table->foreign('sc_id')->references('sc_id')->on('school_classes');

            $table->unsignedBigInteger('et_id')->nullable();
            $table->foreign('et_id')->references('et_id')->on('expenses_types');

            $table->decimal('e_amount',12,2);

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
        Schema::dropIfExists('expenses');
    }
}
