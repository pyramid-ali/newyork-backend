<?php
/**
 * Created by PhpStorm.
 * User: alish
 * Date: 9/15/18
 * Time: 10:42 AM
 */

namespace App\Ny;


use Illuminate\Http\UploadedFile;

class CSVReader
{
    private $path;

    public function __construct($path)
    {
        if ($path instanceof UploadedFile) {
            $this->path = $path->path();
        } else if (gettype($path) === 'string') {
            $this->path = $path;
        }
        else {
            throw new \Exception('Provided $path should be instance of UploadedFile or string that refer to path of the file');
        }

    }

    public static function load($path)
    {
        return new self($path);
    }

    public function get()
    {
        $spreadsheet = $this->reader()->load($this->path);
        return $this->createCollection(
            $spreadsheet->getActiveSheet()->toArray()
        );
    }

    private function reader()
    {
        return new \PhpOffice\PhpSpreadsheet\Reader\Csv();
    }

    private function createCollection($rows)
    {

        $header = array_shift($rows);

        $result = collect();
        foreach ($rows as $row) {
            $collectRow = collect();
            foreach ($header as $index => $value) {
                $collectRow->put(str_slug($value, '_'), $row[$index]);
            }
            $result->push($collectRow);
        }

        return $result;
    }



}