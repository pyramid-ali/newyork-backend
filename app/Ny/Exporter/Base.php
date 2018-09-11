<?php

namespace App\Ny\Exporter;


abstract class Base
{

    private $rows;

    public function __construct()
    {
        $this->rows = collect();
    }

}