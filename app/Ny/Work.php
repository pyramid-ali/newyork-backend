<?php
/**
 * Created by PhpStorm.
 * User: alish
 * Date: 9/10/18
 * Time: 1:39 AM
 */

namespace App\Ny;


class Work
{

    protected $key;
    protected $value;

    public function __construct($key, $value)
    {
        $this->key = $key;
        $this->value = $value;
    }

    /**
     * @return mixed
     */
    public function getKey()
    {
        return $this->key;
    }

    /**
     * @return mixed
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @param $value
     * @return Work
     */
    public function mergeWith($value)
    {
        switch (gettype($value)) {
            case 'integer':
                $this->addIntegerValue($value);
                break;
            case 'array':
                $this->addArrayValue($value);
                break;
        }

        return $this;
    }

    /**
     * @param $value
     */
    protected function addIntegerValue($value)
    {
        $this->value += $value;
    }

    /**
     * @param $value
     */
    protected function addArrayValue($value)
    {
        foreach ($value as $Item) {
            array_push($this->value, $Item);
        }
    }

    /**
     * @param $works
     * @return mixed
     */
    public static function merge($works)
    {
        $main = $works->pop();
        foreach ($works as $work) {
            $main->addValue($work->getValue());
        }

        return $main;
    }

}