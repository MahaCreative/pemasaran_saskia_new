<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\KantorProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KantorProfileController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware(['auth', 'role:manager']);
    // }

    public function index()
    {
        $profile = KantorProfile::first() ?? new KantorProfile();
        return Inertia::render('Manager/KantorProfile', [
            'profile' => $profile,
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'nama_kantor' => 'required|string|max:255',
            'alamat' => 'required|string',
            'telepon' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'website' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'foto_kantor' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'foto_pemilik' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $profile = KantorProfile::first() ?? new KantorProfile();

        $profile->nama_kantor = $request->nama_kantor;
        $profile->alamat = $request->alamat;
        $profile->telepon = $request->telepon;
        $profile->email = $request->email;
        $profile->website = $request->website;
        $profile->deskripsi = $request->deskripsi;

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('kantor', 'public');
            $profile->logo = $path;
        }
        if ($request->hasFile('foto_pemilik')) {
            $path = $request->file('foto_pemilik')->store('kantor', 'public');
            $profile->foto_pemilik = $path;
        }

        if ($request->hasFile('foto_kantor')) {
            $path = $request->file('foto_kantor')->store('kantor', 'public');
            $profile->foto_kantor = $path;
        }

        $profile->save();

        return redirect()->route('manager.kantor-profile.index')
            ->with('success', 'Profil kantor berhasil disimpan');
    }
}
