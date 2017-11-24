<?php

namespace App\Http\Controllers\Company;

use App\Company;
use App\Role;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @param Company $company
     * @return \Illuminate\Http\Response
     */
    public function index(Company $company)
    {
        $users = $company->users()->managers()->paginate();
        return view('company.users.index', compact('users', 'company'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Company $company
     * @return \Illuminate\Http\Response
     */
    public function create(Company $company)
    {
        return view('company.users.create', compact('company'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Company $company
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Company $company)
    {

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $role = Role::manager()->first();
        $user->roles()->sync($role);
        $user->companies()->sync($company);

        return redirect('/managers');

    }

    /**
     * Display the specified resource.
     *
     * @param Company $company
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function show(Company $company, User $user)
    {
        return view('company.users.view', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Company $company
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function edit(Company $company, User $user)
    {

        return view('company.users.edit', compact('user', 'company'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Company $company
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function update(Request $request, Company $company, User $user)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'nullable|string|min:6'
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->password) {
            $user->password = bcrypt($request->password);
        }

        $user->save();
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Company $company
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function destroy(Company $company, User $user)
    {
        $user->forceDelete();
        return redirect()->back();
    }
}
