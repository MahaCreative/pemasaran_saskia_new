<?php

namespace App\Http\Controllers;

use App\Models\GambarRumah;
use App\Models\Rumah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GambarRumahController extends Controller
{
    public function index()
    {
        $gambarRumahs = GambarRumah::with('rumah')->latest()->paginate(12);
        $rumahs = Rumah::select('id', 'nama_rumah')->get();

        return Inertia::render('Marketing/Galeri/Index', [
            'gambarRumahs' => $gambarRumahs,
            'rumahs' => $rumahs,
        ]);
    }

    public function create()
    {
        $rumahs = Rumah::select('id', 'nama_rumah')->get();

        return Inertia::render('Marketing/Galeri/Create', [
            'rumahs' => $rumahs,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rumah_id' => 'required|exists:rumah,id',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'keterangan' => 'nullable|string|max:255',
        ]);

        $path = $request->file('gambar')->store('galeri-rumah', 'public');

        GambarRumah::create([
            'rumah_id' => $validated['rumah_id'],
            'gambar' => $path,
            'keterangan' => $validated['keterangan'] ?? 'Gambar rumah',
        ]);

        return redirect()->route('marketing.galeri.index')
            ->with('success', 'Gambar berhasil ditambahkan ke galeri.');
    }

    public function edit(GambarRumah $gambarRumah)
    {
        $rumahs = Rumah::select('id', 'nama_rumah')->get();

        return Inertia::render('Marketing/Galeri/Edit', [
            'gambarRumah' => $gambarRumah,
            'rumahs' => $rumahs,
        ]);
    }

    public function update(Request $request, GambarRumah $gambarRumah)
    {
        $validated = $request->validate([
            'rumah_id' => 'required|exists:rumah,id',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'keterangan' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('gambar')) {
            if ($gambarRumah->gambar) {
                Storage::disk('public')->delete($gambarRumah->gambar);
            }
            $path = $request->file('gambar')->store('galeri-rumah', 'public');
            $validated['gambar'] = $path;
        }

        $gambarRumah->update($validated);

        return redirect()->route('marketing.galeri.index')
            ->with('success', 'Gambar berhasil diperbarui.');
    }

    public function destroy(GambarRumah $gambarRumah)
    {
        if ($gambarRumah->gambar) {
            Storage::disk('public')->delete($gambarRumah->gambar);
        }
        $gambarRumah->delete();

        return redirect()->route('marketing.galeri.index')
            ->with('success', 'Gambar berhasil dihapus dari galeri.');
    }
}
