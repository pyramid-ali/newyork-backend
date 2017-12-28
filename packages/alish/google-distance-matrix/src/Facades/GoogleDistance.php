<?php

namespace Alish\GoogleDistanceMatrix\Facades;
use Illuminate\Support\Facades\Facade;

class GoogleDistance extends Facade {

    protected static function getFacadeAccessor() {
        return 'GoogleDistance';
    }

}