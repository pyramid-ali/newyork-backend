<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\PageViewCollection;
use App\Http\Resources\UserCollection;
use App\PageView;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ExternalServiceController extends Controller
{

    public function users(Request $request)
    {

        try {
            $this->checkCredentials($request);
        }
        catch (\Exception $error) {
            return response()->json([
                'resultCode' => 2,
                'resultTitle' => 'Invalid Credentials',
                'resultString' => 'username or password is wrong'
            ]);
        }

        return new UserCollection(User::all());
    }

    public function pageViews(Request $request)
    {
        try {
            $this->checkCredentials($request);
        }
        catch (\Exception $error) {
            return response()->json([
                'resultCode' => 2,
                'resultTitle' => 'Invalid Credentials',
                'resultString' => 'username or password is wrong'
            ]);
        }

        return new PageViewCollection(PageView::all());
    }

    private function checkCredentials(Request $request)
    {
        if (Auth::attempt([
            'email' => $request->get('id'),
            'password' => $request->get('password')
        ])) {
            return;
        }

        throw new \Exception();
    }

}
