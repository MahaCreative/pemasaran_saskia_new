<?php

namespace App\Http\Controllers;

use App\Models\PembayaranCicilan;
use App\Models\PermintaanPembelian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RiwayatPembayaranController extends Controller
{
    /**
     * Menampilkan halaman riwayat pembayaran untuk pelanggan
     */
    public function index()
    {
        return inertia('CalonPembeli/RiwayatPembayaran');
    }

    /**
     * API endpoint untuk data riwayat pembayaran
     */
    public function data(Request $request)
    {
        $user = Auth::user();

        // Validasi input tanggal
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        // Query pembayaran yang dimiliki user
        $query = PembayaranCicilan::with(['permintaanPembelian.rumah'])
            ->whereHas('permintaanPembelian', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->where('status', 'terverifikasi')
            ->orderBy('tanggal_pembayaran', 'desc');

        // Filter berdasarkan tanggal jika ada
        if ($request->filled('start_date')) {
            $query->whereDate('tanggal_pembayaran', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('tanggal_pembayaran', '<=', $request->end_date);
        }

        $pembayaran = $query->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'nomor_invoice' => $item->nomor_invoice,
                'rumah' => $item->permintaanPembelian->rumah->alamat ?? 'N/A',
                'tipe_rumah' => $item->permintaanPembelian->rumah->tipeRumah->nama_tipe ?? 'N/A',
                'jumlah_pembayaran' => $item->jumlah_pembayaran,
                'tanggal_pembayaran' => $item->tanggal_pembayaran,
                'metode_pembayaran' => $item->metode_pembayaran,
                'status' => $item->status,
                'catatan' => $item->catatan,
            ];
        });

        return response()->json([
            'data' => $pembayaran
        ]);
    }
}
