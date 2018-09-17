<?php

namespace App\Ny\Exporter;

use Maatwebsite\Excel\Concerns\Exportable;

abstract class Base
{
    use Exportable;

    protected $rows;
    protected $path;
    protected $filePath;
    protected $storePath;
    protected $writerType = \Maatwebsite\Excel\Excel::CSV;

    public function __construct()
    {
        $this->rows = collect();
        $this->storePath = str_finish($this->path, '/') . uniqid() . '.csv';
        $this->filePath = 'public/' . $this->storePath;
    }

    public function storePath()
    {
        return $this->storePath;
    }

}