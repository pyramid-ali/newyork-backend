<?php

namespace App\Ny\Addons;

use Alish\GoogleDistanceMatrix\Facades\GoogleDistance;
use Illuminate\Support\Collection;
use Carbon\Carbon;
use App\Employee;
use App\Ny\Work;

class AdjustDedAmount implements Addon
{

    const METER_TO_MILE_RATE = 1609.34;
    const LOCATION_LIMIT_PER_REQUEST = 1;

    public function handle($works, Employee $employee)
    {
        return new Work('aex', $this->calculateAex($works));
    }

    public function isRequire(Employee $employee)
    {
        return $employee->employee_type === 'ft_patient' && !$employee->metro_card;
    }

    /**
     * @param $works Collection
     * @return mixed
     */
    private function groupWorksPerDay($works)
    {
        return $works->groupBy(function ($item, $key) {
            return Carbon::parse($item['start_datetime'])->toDateString();
        });
    }

    /**
     * @param $works Collection
     * @return float|int
     * @throws \Exception
     */
    private function calculateAex($works)
    {
        $aex = 0;
        $origins = collect();
        $destinations = collect();
        foreach ($this->groupWorksPerDay($works) as $worksInADay) {

            if (count($worksInADay) < 2) {
                continue;
            }

            for ($i = 0; $i < count($worksInADay) - 1; $i++) {

                $origin = $this->getLocation($worksInADay[$i]);
                $destination = $this->getLocation($worksInADay[$i+1]);

                if ($origin && $destination) {

                    $origins->push($origin);
                    $destinations->push($destination);

                    if ($origins->count() >= self::LOCATION_LIMIT_PER_REQUEST) {
                        $aex += $this->distance($origins, $destinations);
                        $origins->splice(0);
                        $destinations->splice(0);
                    }
                }
            }
        }

        if ($origins->count() > 0) {
            $aex += $this->distance($origins, $destinations);
        }

        return $aex;
    }

    /**
     * Extract location from row
     * @param $row array
     * @return string
     */
    private function getLocation($row)
    {
        return trim($row['care_location_street_address_1'] . ' ' . $row['care_location_city'] . ' ' . $row['care_location_state']);
    }

    /**
     * Send a request to google distance api for getting distance between origins and destinations
     * @param $origins Collection
     * @param $destinations Collection
     * @return float|int
     * @throws \Exception
     */
    private function distance($origins, $destinations)
    {
        $response = GoogleDistance::distance($origins, $destinations);

        if(!$this->isResponseOk($response)) {
            throw new \Exception($this->responseErrorMessage($response));
        }

        $distance = $this->totalDistance($response, $origins, $destinations);

        return $this->meterToMile($distance);
    }


    /**
     * calculate total distance from google distance response
     * @param $response array
     * @param $origins Collection
     * @param $destinations Collection
     * @return float|int
     * @throws \Exception
     */
    private function totalDistance($response, $origins, $destinations)
    {
        $distance = 0;
        sleep(0.1);
        for ($i = 0; $i < $origins->count(); $i++) {

            $this->throwExceptionIfLocationIsEmpty($response['origin_addresses'][$i], $origins[$i]);
            $this->throwExceptionIfLocationIsEmpty($response['destination_addresses'][$i], $destinations[$i]);

            $distance += $this->getDistanceFromResponse($response, $i);

        }
        return $distance;
    }

    /**
     * @param $response array
     * @return bool
     */
    private function isResponseOk($response)
    {
        return strtolower($response['status']) === 'ok';
    }

    /**
     * error message from google
     * @param $response array
     * @return string
     */
    private function responseErrorMessage($response)
    {
        if (isset($response['error_message'])) {
            return 'Google map key Error: ' . $response['error_message'];
        }

        return 'Google map key Error: ' . $response['status'];
    }

    /**
     * Extract distance from google distance response
     * @param $response array
     * @param $index int
     * @return float|int
     */
    private function getDistanceFromResponse($response, $index)
    {
        return $response['rows'][$index]['elements'][$index]['distance']['value'];
    }

    /**
     * Check that if location found in google map or throw exception
     * @param $location string
     * @param $address string
     * @throws \Exception
     */
    private function throwExceptionIfLocationIsEmpty($location, $address)
    {
        if (!$location) {
            throw new \Exception('Address Not Found: ' . $address);
        }
    }

    /**
     * Convert meter to mile
     * @param $meter number
     * @return float|int
     */
    private function meterToMile($meter)
    {
        return $meter / self::METER_TO_MILE_RATE;
    }
}