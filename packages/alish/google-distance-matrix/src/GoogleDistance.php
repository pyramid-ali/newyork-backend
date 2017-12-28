<?php

namespace Alish\GoogleDistanceMatrix;


use Alish\GoogleDistanceMatrix\Request\Request;

class GoogleDistance
{

    private $origins;
    private $destinations;

    public function __construct() {
        $this->origins = collect();
        $this->destinations = collect();
    }

    public function origins($origins)
    {
        $this->origins = collect($origins);
        return $this;
    }

    public function destinations($destinations)
    {
        $this->destinations = collect($destinations);
        return $this;
    }

    public function addOriginAndDestination($origin, $destination)
    {
        $this->origins->push($origin);
        $this->destinations->push($destination);
        return $this;
    }

    public function distance($origin, $destination)
    {
        $response = Request::send($origin, $destination);
        return $response;
    }
    
}