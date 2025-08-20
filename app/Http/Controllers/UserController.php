<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $pelangganQuery = User::query();
        $marketingQuery = User::query();
        if ($request->serach_marketing) {
            $marketingQuery->where('name', 'like', '%' . $request->search_marketing . '%');
        }
        if ($request->search_pelanggan) {
            $pelangganQuery->where('name', 'like', '%' . $request->search_pelanggan . '%');
        }
        $pelanggan = $pelangganQuery->where('role', 'pelanggan')->get();
        $marketing = $marketingQuery->where('role', 'marketing')->get();
        return Inertia::render('Manager/UserManagement', [
            'pelanggan' => $pelanggan,
            'marketing' => $marketing,

        ]);
    }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',

            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = new User();
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role = 'marketing';
        $user->phone = $validated['phone'] ?? null;
        $user->password = bcrypt($validated['password']);
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $avatarPath;
        }
        $user->save();
    }



    public function update(Request $request, User $user)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,

            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        $user->phone = $validated['phone'] ?? null;
        if (!empty($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $avatarPath;
        }
        $user->save();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('manager.user.index')->with('success', 'User deleted successfully.');
    }
}
