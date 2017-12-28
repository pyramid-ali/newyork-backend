<?php

namespace Alish\GoogleDistanceMatrix;

use Illuminate\Support\ServiceProvider;

class GoogleDistanceServiceProvider extends ServiceProvider
{
    protected $defer = false;

    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {

        $this->publishes(
            [
                __DIR__ . '/config/config.php' => config_path('google-distance.php')
            ], 'config'
        );

    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('GoogleDistance', function ($app) {
            return new GoogleDistance();
        });
    }

    public function provides()
    {
        return array('GoogleDistance');
    }
}