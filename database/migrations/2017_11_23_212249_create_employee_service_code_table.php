<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeeServiceCodeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_service_code', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('service_code_id');
            $table->unsignedInteger('employee_id');
            $table->unsignedInteger('rate')->nullable();
            $table->timestamps();

            $table->foreign('service_code_id')->references('id')->on('service_codes')->onDelete('cascade');
            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_service_code');
    }
}
