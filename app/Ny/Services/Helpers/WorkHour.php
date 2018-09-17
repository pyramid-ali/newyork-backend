<?php

namespace App\Ny\Services\Helpers;

use Carbon\Carbon;

trait WorkHour
{

    protected $startTime = null;
    protected $endTime = null;

    /**
     * @param $string string
     * @return Carbon
     */
    protected function parseDate($string)
    {
        return Carbon::parse($string);
    }

    /**
     * @param $work array
     * @return Carbon
     */
    protected function startTime($work)
    {
        return $this->startTime = $this->startTime ?? $this->parseDate($work['start_datetime']);
    }

    /**
     * @param $work array
     * @return Carbon
     */
    protected function endTime($work)
    {
        return $this->endTime = $this->endTime ?? $this->parseDate($work['end_datetime']);
    }

    /**
     * @param $work array
     * @return int
     */
    protected function workHours($work)
    {
        return $this->endTime($work)->diffInHours($this->startTime($work));
    }

    /**
     * @param $work array
     * @return int
     */
    protected function workMinutes($work)
    {
        return $this->endTime($work)->diffInMinutes($this->startTime($work));
    }

    /**
     * @param $work array
     * @return float|int
     */
    protected function exactWorkTime($work)
    {
        $hours = $this->workHours($work);
        return $hours + ($this->workMinutes($work) - ($hours * 60)) / 60;
    }

}