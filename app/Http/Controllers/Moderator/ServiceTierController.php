<?php

namespace App\Http\Controllers\Moderator;

use App\ServiceTier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ServiceTierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tiers = ServiceTier::latest()->paginate();
        return view('moderator.service_tiers.index', compact('tiers'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('moderator.service_tiers.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validateTierCreation($request);

        $tier = ServiceTier::build($request->all());

        return redirect()->back(201)->with('tier', $tier->name);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ServiceTier  $serviceTier
     * @return \Illuminate\Http\Response
     */
    public function show(ServiceTier $serviceTier)
    {
        return view('moderator.service_tiers.show', compact('serviceTier'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ServiceTier  $serviceTier
     * @return \Illuminate\Http\Response
     */
    public function edit(ServiceTier $serviceTier)
    {
        return view('moderator.service_tiers.edit', compact('serviceTier'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ServiceTier  $serviceTier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ServiceTier $serviceTier)
    {
        $this->validateTierUpdate($request, $serviceTier);

        $serviceTier->update($request->only('name', 'description'));
        $serviceTier->updateMeta($request->all());

        return redirect()->back(201)->with('tier', $serviceTier->name);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ServiceTier $serviceTier
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(ServiceTier $serviceTier)
    {
        $serviceTier->forceDelete();
        return redirect()->route('service_tiers.index')->with('tier', $serviceTier->name);
    }

    public function validateTierCreation(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:service_tiers',
            'description' => 'required|string',
            'max_employees' => 'required|numeric'
        ]);
    }

    public function validateTierUpdate(Request $request, ServiceTier $serviceTier)
    {
        $request->validate([
            'name' => 'required|string|unique:service_tiers,name,' . $serviceTier->id,
            'description' => 'required|string',
            'max_employees' => 'required|numeric'
        ]);
    }
}
