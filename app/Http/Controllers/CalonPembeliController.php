<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use App\Models\KantorProfile;
use App\Models\GambarRumah;
use App\Models\Promosi;
use App\Models\Rumah;
use App\Models\TipeRumah;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalonPembeliController extends Controller
{
    public function home()
    {
        $sliders = Slider::orderBy('urutan')->get();
        $tipe = TipeRumah::all();
        $rumah = Rumah::where(['status' => 'tersedia'])->latest()->get();
        return Inertia::render('CalonPembeli/Home', [
            'sliders' => $sliders,
            'tipe' => $tipe,
            'rumah' => $rumah,
        ]);
    }

    public function profileKantor()
    {
        $profile = KantorProfile::first();
        return Inertia::render('CalonPembeli/ProfileKantor', [
            'profile' => $profile,
        ]);
    }

    public function galeri()
    {
        $galeri = GambarRumah::with('rumah')->get();
        return Inertia::render('CalonPembeli/Galeri', [
            'galeri' => $galeri,
        ]);
    }

    public function promosi()
    {
        $promosi = Promosi::orderByDesc('periode_mulai')->get();
        return Inertia::render('CalonPembeli/Promosi', [
            'promosi' => $promosi,
        ]);
    }

    public function detail(Request $request, Rumah $rumah)
    {
        $rumah->load('tipe');
        $gambars = [];
        $gambar = GambarRumah::where('rumah_id', $rumah->id)->get();

        $gambars[0] = [
            'nama_gambar' => 'thumbnail',
            "path" => "/storage/" . $rumah->gambar
        ];
        foreach ($gambar as $item) {
            $gambars[] = [
                'nama_gambar' => $item->nama_gambar,
                "path" => "/storage/" . $item->path
            ];
        }

        return inertia('CalonPembeli/DetailRumah', compact('rumah', 'gambars'));
    }

    public function katalog_rumah(Request $request)
    {
        $tipe_id = $request->input('tipe_id');
        $search = $request->input('search');
        $min_harga = $request->input('min_harga');
        $max_harga = $request->input('max_harga');
        $lokasi = $request->input('lokasi');

        $rumahs = Rumah::with('tipe')
            ->when($tipe_id, fn($q) => $q->where('tipe_id', $tipe_id))
            ->when($search, fn($q) => $q->where('nama_rumah', 'like', "%{$search}%"))
            ->when($lokasi, fn($q) => $q->where('alamat', 'like', "%{$lokasi}%"))
            ->when($min_harga, fn($q) => $q->where('harga', '>=', $min_harga))
            ->when($max_harga, fn($q) => $q->where('harga', '<=', $max_harga))
            ->latest()
            ->paginate(12);

        $tipes = TipeRumah::select('id', 'nama_tipe')->get();

        return Inertia::render('CalonPembeli/DaftarRumah', [
            'rumahs' => $rumahs,
            'tipes' => $tipes,
            'filters' => $request->only(['tipe_id', 'search', 'min_harga', 'max_harga', 'lokasi']),
        ]);
    }
}
