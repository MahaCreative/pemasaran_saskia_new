<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Promosi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PromosiController extends Controller
{
    public function index()
    {
        $promosis = Promosi::orderByDesc('periode_mulai')->paginate(10);
        return Inertia::render('Marketing/Promosi/Index', [
            'promosis' => $promosis,
        ]);
    }

    public function create()
    {
        return Inertia::render('Marketing/Promosi/Form', [
            'promosi' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'periode_mulai' => 'required|date',
            'periode_selesai' => 'required|date|after_or_equal:periode_mulai',
        ]);

        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('promosi-images', 'public');
            $validated['gambar'] = $path;
        }

        Promosi::create($validated);

        return redirect()->route('marketing.promosi.index')
            ->with('success', 'Promosi berhasil ditambahkan.');
    }

    public function edit(Promosi $promosi)
    {
        return Inertia::render('Marketing/Promosi/Form', [
            'promosi' => $promosi,
        ]);
    }

    public function update(Request $request, Promosi $promosi)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'periode_mulai' => 'required|date',
            'periode_selesai' => 'required|date|after_or_equal:periode_mulai',
        ]);

        if ($request->hasFile('gambar')) {
            if ($promosi->gambar) {
                Storage::disk('public')->delete($promosi->gambar);
            }
            $path = $request->file('gambar')->store('promosi-images', 'public');
            $validated['gambar'] = $path;
        }

        $promosi->update($validated);

        return redirect()->route('marketing.promosi.index')
            ->with('success', 'Promosi berhasil diperbarui.');
    }

    public function destroy(Promosi $promosi)
    {
        // if ($promosi->gambar) {
        //     Storage::disk('public')->delete($promosi->gambar);
        // }
        $promosi->delete();

        return redirect()->route('marketing.promosi.index')
            ->with('success', 'Promosi berhasil dihapus.');
    }
}
