<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PageViewCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $result = $this->collection->map(function ($pageView) {
            return [
                'user_id' => $pageView->user->id,
                'date_time' => $pageView->created_at->toDateTimeString(),
                'page_name' => $pageView->route,
            ];
        })->toArray();

        return [
            'resultCode' => 0,
            'resultTitle' => 'Success',
            'data' => $result
        ];
    }
}
