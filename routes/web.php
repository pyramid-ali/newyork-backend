<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::domain('{company}.'.env('DOMAIN'))->group(function () {

    Route::get('login', 'Company\LoginController@showLoginForm')->name('company.login');
    Route::post('login', 'Company\LoginController@login')->name('company.login');
    Route::post('logout', 'Company\LoginController@logout')->name('company.logout');

    Route::group(['middleware' => 'auth'], function() {

        Route::group(['middleware' => 'company'], function() {

            Route::get('home', function () {
                return view('company.home');
            });

            Route::group(['middleware' => 'admin'], function() {
                Route::resource('managers', 'Company\UserController');
                Route::get('settings/general', 'Company\SettingController@showGeneralForm')->name('settings.general.show');
                Route::put('settings/general', 'Company\SettingController@general')->name('settings.general.update');
            });



            Route::get('employees/import', 'Company\EmployeeBatchController@showImportForm')->name('employees.import.show');
            Route::post('employees/import', 'Company\EmployeeBatchController@import');
            Route::get('employees/export', 'Company\EmployeeBatchController@showExportForm')->name('employees.export.show');
            Route::post('employees/export', 'Company\EmployeeBatchController@export');
            Route::get('employees/export/download/{file}', 'Company\EmployeeBatchController@download');
            Route::get('employees/{employee}/service_codes', 'Company\EmployeeController@serviceCodes')->name('employees.service_codes.show');
            Route::post('employees/{employee}/service_codes', 'Company\EmployeeController@assignServiceCodes')->name('employees.service_codes.store');
            Route::post('employees/{employee}/set_rate', 'Company\EmployeeController@setRate')->name('employees.service_codes.set_rate');
            Route::get('employees/search', 'Company\EmployeeController@search')->name('employees.search');
            Route::resource('employees', 'Company\EmployeeController');
            Route::resource('offices', 'Company\OfficeController');
            Route::resource('service_codes', 'Company\ServiceCodeController');
            Route::get('payroll/history', 'Company\PayrollController@history')->name('payroll.history');
            Route::get('payroll/process', 'Company\PayrollController@showProcessForm')->name('payroll.process.show');
            Route::post('payroll/process', 'Company\PayrollController@process')->name('payroll.process.store');
            Route::get('settings/change_password', 'Company\SettingController@showChangePasswordForm')->name('settings.change_password.show');
            Route::put('settings/change_password', 'Company\SettingController@changePassword')->name('settings.change_password.update');
        });

    });



});

Route::domain(env('DOMAIN'))->group(function () {

    Route::get('home', function() {
        return redirect('/moderator/users');
    });

    Route::get('login', 'Moderator\LoginController@showLoginForm');
    Route::post('login', 'Moderator\LoginController@login')->name('login');
    Route::post('logout', 'Moderator\LoginController@logout')->name('logout');
    Route::get('forgot-password', 'ForgotPasswordController@showLinkRequestForm');

    Route::group(['middleware' => ['moderator', 'auth']], function() {

        Route::resource('moderator/users', 'Moderator\UserController');
        Route::resource('moderator/companies', 'Moderator\CompanyController');

    });

});

