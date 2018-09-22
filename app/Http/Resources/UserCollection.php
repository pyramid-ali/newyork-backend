<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        $result = $this->collection->map(function ($user) {
            return [
                'user_id' => $user->id,
                'last_login' => $user->last_login->toDateTimeString()
            ];
        })->toArray();

        return [
            'resultCode' => 0,
            'resultTitle' => 'Success',
            'data' => $result
        ];
    }
}
