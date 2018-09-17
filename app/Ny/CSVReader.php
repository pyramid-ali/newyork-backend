<?php
/**
 * Created by PhpStorm.
 * User: alish
 * Date: 9/15/18
 * Time: 10:42 AM
 */

namespace App\Ny;


use Illuminate\Http\UploadedFile;

ini_set('auto_detect_line_endings',TRUE);

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
        $spreadsheet = $this->reader()->setDelimiter(',')->load($this->path);
        return $this->createCollection(
            $spreadsheet->getActiveSheet()->toArray()
        );
    }

    private function reader()
    {
        return new \PhpOffice\PhpSpreadsheet\Reader\Csv();
    }

    private function getRows($sheet)
    {
        $rows = [];
        foreach ($sheet->getRowIterator() AS $row) {
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(FALSE); // This loops through all cells,
            $cells = [];
            foreach ($cellIterator as $cell) {
                $cells[] = $cell->getValue();
            }
            $rows[] = $cells;
        }
        return $rows;
    }

    private function createCollection($rows)
    {
        $header = array_shift($rows);

        $result = collect();
        foreach ($rows as $row) {
            $collectRow = collect();
            foreach ($header as $index => $value) {
                if (trim($value)) {
                    $collectRow->put(strtolower(str_slug($value, '_')), $row[$index]);
                }
            }
            $result->push($collectRow);
        }

        return $result;
    }



}