<?php
/**
 * Created by PhpStorm.
 * User: pyramid
 * Date: 12/23/17
 * Time: 6:03 PM
 */

namespace Alish\GoogleDistanceMatrix\Request;


use Illuminate\Support\Facades\Log;

class Request
{

    public static function send($origins, $destinations)
    {

        $key = config('google-distance.key');
        $query = http_build_query([
            'origins' => implode('|', $origins->toArray()),
            'destinations' => implode('|', $destinations->toArray()),
            'key' => $key
        ]);

        $url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'.$query;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_VERBOSE, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec ($ch);
        curl_close ($ch);
        return json_decode($result, true);

    }

}