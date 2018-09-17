<?php
/**
 * Created by PhpStorm.
 * User: alish
 * Date: 9/10/18
 * Time: 2:58 AM
 */

namespace App\Ny;


class TempRateWork extends Work
{

    public function __construct($value)
    {
        parent::__construct('temp_rate', $value);
    }

    public function getValue()
    {
        $units = 0;
        foreach ($this->value as $item) {
            $units += $item['unit'];
        }

        return $units;
    }

    public function rawValue()
    {
        return $this->value;
    }


    protected function addArrayValue($value)
    {
        foreach ($this->value as $index => $item) {
            foreach ($value as $subItem) {
                if ($item['rate'] == $subItem['rate']) {
                    $this->value[$index]['unit'] += $subItem['unit'];
                } else {
                    array_push($this->value, $subItem);
                }
            }
        }
    }


}