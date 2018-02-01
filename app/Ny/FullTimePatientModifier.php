<?php

namespace App\Ny;

use Alish\GoogleDistanceMatrix\Facades\GoogleDistance;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class FullTimePatientModifier
{

    private $processedWorks;
    private $works;
    private $employee;

    /**
     * FullTimePatientModifier constructor.
     * @param $processedWorks
     * @param $works
     * @param $employee
     */
    public function __construct($processedWorks, $works, $employee)
    {
        $this->processedWorks = clone $processedWorks;
        $this->works = clone $works;
        $this->employee = clone $employee;
    }

    public function modify()
    {

        // threshold should calculate before reg hour adjustment
        $threshold = $this->beyondThreshold();

        // TODO: 10 must be replace with period review days
        $this->processedWorks->put('reg_hours', $this->regHours());
        $this->processedWorks->put('aex', $this->adjustDedAmount());

        if ($threshold > 0) {
            $this->processedWorks->put('temp_rate', [['rate' => $this->employee->rate, 'unit' => $threshold]]);
        }
        else {
            $this->processedWorks->forget('temp_rate');
        }

        return $this->processedWorks;
    }

    private function regHours()
    {
        return $this->employee->tehd * 10 - $this->calcRegHoursMinus();
    }

    private function adjustDedAmount()
    {
        return
            $this->employee->reimbursement_rate * $this->calcAdjustDedAmount()
            + $this->processedWorks->get('aex', 0);
    }

    private function calcRegHoursMinus()
    {
        $minus = $this->getMinusWorkHour('hol') +
            $this->getMinusWorkHour('sic') +
            $this->getMinusWorkHour('per') +
            $this->getMinusWorkHour('pto');

        return $minus;
    }

    private function getMinusWorkHour($key)
    {
        return $this->processedWorks->get($key);
    }

    private function calcAdjustDedAmount()
    {
        $groupedWorkDays = $this->works->groupBy(function ($item, $key) {
            $date  = Carbon::parse($item['start_datetime']);
            return $date->toDateString();
        });

        $aex = 0;
        $origins = collect();
        $destinations = collect();
        foreach ($groupedWorkDays as $workDay) {

            if (count($workDay) > 1) {
                for ($i = 0; $i < count($workDay) - 1; $i++) {

                    $origin = $this->getLocation($workDay[$i]);
                    $destination = $this->getLocation($workDay[$i+1]);
                    if ($origin && $destination) {

                        $origins->push($origin);
                        $destinations->push($destination);

                        if ($origins->count() > 9) {
                            $aex += $this->distances($origins, $destinations);
                            $origins = collect();
                            $destinations = collect();
                        }
                    }
                }
            }
        }

        if ($origins->count() > 0) {
            $aex += $this->distances($origins, $destinations);
        }

        return $aex;
    }

//    private function maxUrlLength ($origins, $destinations) {
//        $originString = implode(',', $origins->toArray());
//        $destinationString = implode(',', $destinations->toArray());
//        return strlen($originString . $destinationString) > 1500;
//    }

    private function getLocation($row)
    {
        return trim($row['care_location_street_address_1'] . ' ' . $row['care_location_city'] . ' ' . $row['care_location_state']);
    }

    /**
     * @param $origins
     * @param $destinations
     * @return float
     * @throws \Exception
     */
    private function distances($origins, $destinations)
    {
        $response = GoogleDistance::distance($origins, $destinations);
        $distance = $this->getDistance($response, $origins->count());
        return $distance / 1.60934;
    }

    /**
     * @param $response
     * @param $count
     * @return float|int
     * @throws \Exception
     */
    private function getDistance($response, $count)
    {
        $distance = 0;
        sleep(5);
        for ($i = 0; $i < $count; $i++) {

            if (strtolower($response['status']) !== 'ok') {
                if (isset($response['error_message'])) {
                    throw new \Exception('Google map key Error: ' . $response['error_message']);
                }
                throw new \Exception('Google map key Error: ' . $response['status']);
            }

            else {
                $distance += $response['rows'][$i]['elements'][$i]['distance']['value'] / 1000;
            }

        }
        return $distance;
    }

    private function beyondThreshold()
    {
        $tempRates = $this->processedWorks->get('temp_rate', null);
        $regHours = $this->processedWorks->get('reg_hours', 0);
        $units = $regHours;
        if ($tempRates) {
            foreach ($tempRates as $tempRate) {
                $units += $tempRate['unit'];
            }
        }

        return $units - ($this->employee->fulltime_threshold * (1 - $this->thresholdMinus()));
    }

    private function thresholdMinus()
    {
        $minus = $this->calcRegHoursMinus();
        $percent = $minus / $this->employee->tehd;
        // TODO: 10 should must be replace with days in period review
        return $percent * 0.1;
    }

}