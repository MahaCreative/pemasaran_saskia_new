<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\PermintaanPembelian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PermintaanPembelianRevisiController extends Controller
{
    /**
     * Display a listing of the permintaan pembelian with draft/revisi status.
     */
    public function index()
    {
        $permintaans = PermintaanPembelian::with(['rumah', 'user', 'petugas'])
            ->whereIn('status_revisi', ['draft', 'revisi'])
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('Marketing/PermintaanPembelian/PermintaanPembelianRevisiList', [
            'permintaans' => $permintaans,
        ]);
    }

    /**
     * Show the form for revising the specified permintaan pembelian.
     */
    public function edit(PermintaanPembelian $permintaan)
    {
        return Inertia::render('Marketing/PermintaanPembelianRevisiForm', [
            'permintaan' => $permintaan->load(['rumah', 'user']),
        ]);
    }

    /**
     * Update the specified permintaan pembelian with revised financial data.
     */
    public function update(Request $request, $id)
    {
        $permintaan = PermintaanPembelian::findOrFail($id);

        $validated = $request->validate([
            'uang_muka' => 'nullable|numeric|min:0',
            'jumlah_cicilan_per_bulan' => 'required|numeric|min:0',
            'jangka_waktu' => 'required|integer|min:1',
            'bunga_persen' => 'nullable|numeric|min:0|max:100',
            'tanggal_pembayaran' => 'nullable|date',
            'status' => 'required|in:pending,disetujui,ditolak',
            'status_revisi' => 'required|in:draft,revisi,final',
            'catatan' => 'nullable|string|max:1000',
            'alasan_penolakan' => 'nullable|string|max:1000',
            'berkas_perjanjian' => 'nullable|file|mimes:pdf|max:5120',
            'remove_berkas' => 'nullable|boolean',
        ]);

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

    /**
     * Display permintaan pembelian yang sudah final.
     */
    public function final()
    {
        $permintaans = PermintaanPembelian::with(['rumah', 'user', 'petugas'])
            ->where('status_revisi', 'final')
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('Marketing/PermintaanPembelianFinal', [
            'permintaans' => $permintaans,
        ]);
    }

    /**
     * Mark the permintaan as final (after both parties agree).
     */
    public function markFinal(PermintaanPembelian $permintaan)
    {
        $permintaan->update([
            'status_revisi' => 'final',
            'status' => 'disetujui',
            'tanggal_disetujui' => now(),
        ]);

        return redirect()->route('marketing.permintaan.final')
            ->with('success', 'Permintaan pembelian telah disetujui dan ditandai sebagai final.');
    }
}
