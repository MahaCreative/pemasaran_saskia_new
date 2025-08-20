<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\PermintaanPembelian;
use App\Models\Rumah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PermintaanPembelianController extends Controller
{
    /**
     * Display a listing of the permintaan pembelian.
     */
    public function index()
    {
        $permintaans = PermintaanPembelian::with(['rumah', 'user', 'petugas'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Marketing/PermintaanPembelian/PermintaanPembelianRevisiList', [
            'permintaans' => $permintaans,
        ]);
    }

    /**
     * Display the specified permintaan pembelian.
     */
    public function show(PermintaanPembelian $permintaanPembelian)
    {
        return Inertia::render('Marketing/PermintaanPembelian/PermintaanPembelianShow', [
            'permintaan' => $permintaanPembelian->load(['rumah', 'user', 'petugas']),
        ]);
    }

    /**
     * Show the form for editing the specified permintaan pembelian.
     */
    public function edit(PermintaanPembelian $permintaanPembelian)
    {
        return Inertia::render('Marketing/PermintaanPembelian/PermintaanPembelianEdit', [
            'permintaan' => $permintaanPembelian->load(['rumah', 'user']),
        ]);
    }

    /**
     * Update the specified permintaan pembelian with revised financial data.
     */
    public function update(Request $request, $id)
    {
        $permintaan = PermintaanPembelian::findOrFail($id);
        $rumah = Rumah::find($permintaan->rumah_id);

        $validated = $request->validate([
            'uang_muka' => 'nullable|numeric|min:0',
            'jumlah_cicilan_per_bulan' => 'required|numeric|min:0',
            'jangka_waktu' => 'required|integer|min:1',
            'tanggal_pembayaran' => 'nullable|date',
            'status' => 'required|in:pending,disetujui,ditolak',
            'catatan' => 'nullable|string|max:1000',
            'alasan_penolakan' => 'nullable|string|max:1000',
            'berkas_perjanjian' => 'nullable|file|mimes:pdf|max:5120',

        ]);

        if ($request->status == 'disetujui') {
            $rumah->update(['status' => 'terjual']);
        }
        if ($request->status == 'ditolak') {
            $rumah->update(['status' => 'tersedia']);
        }

        $validated['petugas_id'] = Auth::id(); // Set petugas_id ke ID user yang sedang login

        // Hapus file lama jika diminta
        if (!empty($validated['remove_berkas']) && $permintaan->berkas_perjanjian) {
            if (\Storage::disk('public')->exists($permintaan->berkas_perjanjian)) {
                \Storage::disk('public')->delete($permintaan->berkas_perjanjian);
            }
            $validated['berkas_perjanjian'] = null;
        }

        // Upload file baru jika ada
        if ($request->hasFile('berkas_perjanjian')) {
            if ($permintaan->berkas_perjanjian && \Storage::disk('public')->exists($permintaan->berkas_perjanjian)) {
                \Storage::disk('public')->delete($permintaan->berkas_perjanjian);
            }
            $path = $request->file('berkas_perjanjian')->store('berkas-perjanjian', 'public');
            $validated['berkas_perjanjian'] = $path;
        }

        $permintaan->update($validated);

        return redirect()
            ->route('marketing.permintaan_pembelian.show', $permintaan->id)
            ->with('success', 'Permintaan pembelian berhasil diperbarui.');
    }
}
