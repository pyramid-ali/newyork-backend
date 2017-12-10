<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('last_name');
            $table->string('first_name');
            $table->string('employee_type');
            $table->string('employee_id');
            $table->string('file_number');
            $table->string('temp_department');
            $table->unsignedInteger('reimbursement_rate')->default(53);
            $table->unsignedInteger('fulltime_threshold')->nullable();
            $table->string('status')->default('active');
            $table->unsignedInteger('company_id');
            $table->unsignedInteger('office_id');
            $table->float('cel')->nullabe();
            $table->float('metro_card')->nullable();
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->foreign('office_id')->references('id')->on('offices')->onDelete('cascade');

            $table->unique(['employee_id', 'company_id'], 'unique_employee');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
