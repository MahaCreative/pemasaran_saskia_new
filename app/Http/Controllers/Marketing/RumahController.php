<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Rumah;
use App\Models\TipeRumah;
use App\Models\GambarRumah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RumahController extends Controller
{
    public function index()
    {
        $rumahs = Rumah::with(['tipe', 'gambars'])->latest()->paginate(10);
        $tipes = TipeRumah::select('id', 'nama_tipe')->get();

        return Inertia::render('Marketing/Rumah/Index', [
            'rumahs' => $rumahs,
            'tipes' => $tipes,
        ]);
    }

    public function create()
    {
        $tipe = TipeRumah::select('id', 'nama_tipe')->get();

        return Inertia::render('Marketing/Rumah/RumahForm', [
            'tipeList' => $tipe,
        ]);
    }




    public function store(Request $request)
    {
        $validated = $request->validate([
            'tipe_id' => 'required|exists:tipe_rumahs,id',
            'nama_rumah' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'status' => 'required|in:tersedia,terjual,dipesan',
            'deskripsi' => 'nullable|string|max:1000',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video_tour' => 'nullable|string|max:255',
            'alamat' => 'required|string|max:255',
            'latitude' => 'nullable|numeric|between:-180,180',
            'longitude' => 'nullable|numeric|between:-90,90',
            'luas_bangunan' => 'required|numeric',
            'luas_kelebihan_tanah' => 'nullable|numeric',
            'parkiran' => 'required|string|max:255',
            'dapur' => 'required|string|max:255',
            'jumlah_kamar_tidur' => 'required|string|max:255',
            'jumlah_kamar_mandi' => 'required|string|max:255',
            'lantai' => 'required|integer|min:1',
            'tahun_bangun' => 'nullable|string|max:4',
            'fasilitas_tambahan' => 'nullable|string',
            'tipe_pembayaran' => 'required|in:cash,kredit,keduanya',
            'is_favorit' => 'nullable|boolean',
            'tanggal_tersedia' => 'nullable|date',

        ]);
        $request->validate([

            'gambar_lain.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'nama_gambar_lain.*' => 'nullable|string|max:255',
        ]);
        $validated['kode_rumah'] = 'RM' . 00 . Rumah::count();

        // Simpan gambar utama (thumbnail)

        $validated['gambar'] = $request->file('gambar')->store('rumah-thumbnail', 'public');


        // Buat rumah
        $rumah = Rumah::create($validated);

        // Simpan gambar lain
        if ($request->hasFile('gambar_lain')) {
            foreach ($request->file('gambar_lain') as $index => $file) {
                $path = $file->store('rumah-galleries', 'public');

                GambarRumah::create([
                    'rumah_id' => $rumah->id,
                    'nama_gambar' => $request->nama_gambar_lain[$index] ?? 'Gambar tanpa nama',
                    'path' => $path,
                ]);
            }
        }

        return redirect()->route('marketing.rumah.index')
            ->with('success', 'Rumah berhasil ditambahkan.');
    }



    public function destroy(Rumah $rumah)
    {
        foreach ($rumah->gambars as $gambar) {

            $gambar->delete();
        }

        $rumah->delete();

        return redirect()->route('marketing.rumah.index')
            ->with('success', 'Rumah berhasil dihapus.');
    }
}
