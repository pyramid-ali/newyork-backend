<?php

namespace App\Http\Controllers\Moderator;

use App\Company;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::latest()->where('id', '!=', auth()->user()->id)->paginate();
        return view('moderator.users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $companies = Company::all();
        $roles = Role::all();
        return view('moderator.users.create', compact('companies', 'roles'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validateUser($request);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $user->assignRole($request->role);

        if ($request->role !== 'admin') {
            $user->companies()->sync($request->company);
        }

        return redirect()->back()->with('user', $user->email);

    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function show(User $user)
    {
        return view('moderator.users.view', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function edit(User $user)
    {
        $companies = Company::all();
        $roles = Role::all();
        $userCompany = $user->companies->first();
        $userRole = $user->roles->first();
        return view('moderator.users.edit', compact('user', 'companies', 'roles', 'userCompany', 'userRole'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function update(Request $request, User $user)
    {
        $this->validateUserUpdate($request, $user);

        $user->update($request->only('name', 'email'));

        if ($request->password) {
            $user->password = bcrypt($request->password);
            $user->save();
        }

        if ($request->has('role')) {
            $user->syncRoles($request->role);
        }


        if ($request->role !== 'admin' && $request->has('company')) {
            $user->companies()->sync($request->company);
        }

        return redirect()->back()->with('user', $user->email);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function destroy(User $user)
    {
        $user->forceDelete();
        return redirect()->route('users.index')->with('user', $user->email);
    }

    public function validateUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'company' => 'nullable|exists:companies,id|required_unless:role,admin',
            'role' => 'required|exists:roles,name'
        ]);
    }

    public function validateUserUpdate(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:6',
            'company' => 'nullable|exists:companies,id',
            'role' => 'nullable|exists:roles,name'
        ]);
    }
}
