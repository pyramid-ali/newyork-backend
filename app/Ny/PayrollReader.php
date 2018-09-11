<?php
/**
 * Created by PhpStorm.
 * User: alish
 * Date: 9/9/18
 * Time: 11:44 PM
 */

namespace App\Ny;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;

class PayrollReader
{

    private $rows;

    /**
     * PayrollReader constructor.
     * @param $rows Collection
     */
    public function __construct($rows)
    {
        $this->rows = $this->modifyRows($rows);
    }

    /**
     * @param $column string
     * @return $this
     */
    public function groupByColumns($column)
    {
        $this->rows->groupBy(function ($item, $key) use($column) {
            return (string) $item[$column];
        });
        return $this;
    }

    /**
     * @return Collection
     */
    public function get()
    {
        return $this->rows;
    }

    /**
     * @param $path string
     * @return PayrollReader
     */
    public static function read($path)
    {
        $rows = Excel::load($path)->get();
        return new PayrollReader($rows);
    }

    /**
     * @param $rows
     * @return Collection
     */
    private function modifyRows($rows)
    {
        return $rows;
    }

}