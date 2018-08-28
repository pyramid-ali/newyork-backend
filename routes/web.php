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


Route::domain('{company}.'.env('APP_DOMAIN'))->group(function () {

    Route::get('login', 'Auth\LoginController@redirectToLogin')->name('company.login');
    Route::get('/', function () {
        return 'a';
    });

    Route::group(['middleware' => 'auth'], function() {


        Route::get('me', function () {
            return response()->json([
                'user' => Auth::user()
            ]);
        });

        Route::get('inactive', 'Company\InactiveCompanyController')->name('companies.inactive');

        Route::group(['middleware' => 'company'], function() {

            Route::get('dashboard', 'Company\DashboardController')->name('company.dashboard');

            Route::group(['middleware' => 'role:subscriber'], function() {
                Route::resource('managers', 'Company\UserController');
                Route::get('settings/general', 'Company\SettingController@showGeneralForm')->name('settings.general.show');
                Route::put('settings/general', 'Company\SettingController@general')->name('settings.general.update');
            });

            Route::post('payroll/test/output', 'Company\PayrollController@generateTestOutput')->name('payroll.process.test');

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
            Route::get('payroll/{payroll}/download', 'Company\PayrollController@downloadPayroll')->name('download.payroll');
            Route::post('payroll/{payroll}/output', 'Company\PayrollController@generateOutput')->name('payroll.process.store');

            Route::get('payroll/{payroll}/output/download', 'Company\PayrollController@downloadOutput')->name('download.payroll.output');
            Route::get('payroll/{payroll}/interm/download', 'Company\PayrollController@downloadInterm')->name('download.payroll.interm');
            Route::get('settings/change_password', 'Company\SettingController@showChangePasswordForm')->name('settings.change_password.show');
            Route::put('settings/change_password', 'Company\SettingController@changePassword')->name('settings.change_password.update');
            Route::get('payroll/test', function (\App\Company $company) {
                return view('company.test', compact('company'));
            });

        });

    });

});

Route::domain(env('APP_DOMAIN'))->group(function () {

    Route::get('/', function () {
        return view('welcome');
    });



    // login
    Route::get('login', 'Auth\LoginController@showLoginForm');
    Route::post('login', 'Auth\LoginController@login')->name('login');

    // logout
    Route::post('logout', 'Auth\LoginController@logout')->name('logout');

    // reset password
    Route::get('password/email', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');

    Route::group(['middleware' => ['auth', 'role:admin'], 'prefix' => 'admin'], function() {

        Route::get('dashboard', 'Moderator\DashboardController')->name('admin.dashboard');
        Route::get('service_tiers/brain_tree', 'Moderator\BrainTreeController@index')->name('service_tiers.braintree.index');
        Route::resource('service_tiers', 'Moderator\ServiceTierController');
        Route::resource('users', 'Moderator\UserController');
        Route::resource('companies', 'Moderator\CompanyController');



        Route::post('companies/{company}/settings/toggle_activation', 'Moderator\CompanySettingsController@toggleActivation')->name('companies.settings.toggle_activation');

    });

});

