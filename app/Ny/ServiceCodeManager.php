<?php

namespace App\Ny;


use App\Ny\Services\TableServiceCode;

class ServiceCodeManager
{

    const NAMESPACE = 'App\Ny\Services\\';

    private $serviceWorker;

    public function __construct($serviceCode)
    {
        $this->serviceWorker = $this->getServiceWorkerClassName($this->modify($serviceCode));
    }

    /**
     * @param $string
     * @return string
     */
    private function modify($string)
    {
        return studly_case($this->escapeCharacters($string));
    }

    /**
     * @param $string
     * @return null|string|string[]
     */
    private function escapeCharacters($string)
    {
        return preg_replace('/[!@#$%^&*(),.]/', ' ', $string);
    }

    /**
     * @param $modifiedServiceCode
     * @return string
     */
    private function getServiceWorkerClassName($modifiedServiceCode)
    {
        return self::NAMESPACE . $modifiedServiceCode;
    }

    /**
     * @param bool $tableAllowed
     * @return TableServiceCode|null
     */
    public function getServiceWorker($tableAllowed = true)
    {
        if (class_exists($this->serviceWorker)) {
            return new $this->serviceWorker;
        }

        if ($tableAllowed) {
            return new TableServiceCode;
        }

        return null;
    }

}