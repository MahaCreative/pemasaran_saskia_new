<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Rumah;
use App\Models\PermintaanPembelian;
use App\Models\BookingKunjungan;
use App\Models\PembayaranCicilan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class LaporanController extends Controller
{
    /**
     * Laporan Rumah dengan filter status dan harga
     */
    public function laporanRumah(Request $request)
    {
        $query = Rumah::with(['tipe', 'gambars']);

        // Filter berdasarkan status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter berdasarkan harga
        if ($request->filled('harga_min')) {
            $query->where('harga', '>=', $request->harga_min);
        }

        if ($request->filled('harga_max')) {
            $query->where('harga', '<=', $request->harga_max);
        }

        $rumahs = $query->get();

        // Jika request PDF
        if ($request->has('export_pdf')) {
            $pdf = PDF::loadView('pdf.laporan-rumah', compact('rumahs'));
            return $pdf->download('laporan-rumah.pdf');
        }

        return Inertia::render('Manager/LaporanRumah', [
            'rumahs' => $rumahs,
            'filters' => $request->only(['status', 'harga_min', 'harga_max']),
        ]);
    }

    /**
     * Laporan Permintaan Pembelian dengan filter status, tanggal, petugas, rumah
     */
    public function laporanPermintaanPembelian(Request $request)
    {
        $query = PermintaanPembelian::with(['rumah', 'rumah.tipe', 'user', 'petugas']);

        // Filter berdasarkan status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter berdasarkan tanggal pengajuan
        if ($request->filled('tanggal_mulai')) {
            $query->whereDate('created_at', '>=', $request->tanggal_mulai);
        }

        if ($request->filled('tanggal_selesai')) {
            $query->whereDate('created_at', '<=', $request->tanggal_selesai);
        }

        // Filter berdasarkan petugas
        if ($request->filled('petugas_id')) {
            $query->where('petugas_id', $request->petugas_id);
        }

        // Filter berdasarkan rumah
        if ($request->filled('rumah_id')) {
            $query->where('rumah_id', $request->rumah_id);
        }

        $permintaans = $query->orderBy('created_at', 'desc')->get();

        // Jika request PDF
        if ($request->has('export_pdf')) {
            $pdf = PDF::loadView('pdf.laporan-permintaan-pembelian', compact('permintaans'));
            return $pdf->download('laporan-permintaan-pembelian.pdf');
        }

        $users = User::where('role', 'marketing')->get();
        $rumahs = Rumah::all();

        return Inertia::render('Manager/LaporanPermintaanPembelian', [
            'permintaans' => $permintaans,
            'users' => $users,
            'rumahs' => $rumahs,
            'filters' => $request->only(['status', 'tanggal_mulai', 'tanggal_selesai', 'petugas_id', 'rumah_id']),
        ]);
    }

    /**
     * Laporan Booking Kunjungan dengan filter status, petugas, tanggal
     */
    public function laporanBookingKunjungan(Request $request)
    {
        $query = BookingKunjungan::with(['rumah', 'rumah.tipe', 'user', 'petugas']);

        // Filter berdasarkan status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter berdasarkan petugas
        if ($request->filled('petugas_id')) {
            $query->where('petugas_id', $request->petugas_id);
        }

        // Filter berdasarkan tanggal
        if ($request->filled('tanggal_mulai')) {
            $query->whereDate('jadwal_kunjungan', '>=', $request->tanggal_mulai);
        }

        if ($request->filled('tanggal_selesai')) {
            $query->whereDate('jadwal_kunjungan', '<=', $request->tanggal_selesai);
        }

        $bookings = $query->orderBy('jadwal_kunjungan', 'desc')->get();

        // Jika request PDF
        if ($request->has('export_pdf')) {
            $pdf = PDF::loadView('pdf.laporan-booking-kunjungan', compact('bookings'));
            return $pdf->download('laporan-booking-kunjungan.pdf');
        }

        $users = User::where('role', 'marketing')->get();

        return Inertia::render('Manager/LaporanBookingKunjungan', [
            'bookings' => $bookings,
            'users' => $users,
            'filters' => $request->only(['status', 'petugas_id', 'tanggal_mulai', 'tanggal_selesai']),
        ]);
    }

    /**
     * Laporan Pembayaran Cicilan dengan filter metode, pelanggan, petugas, tanggal
     */
    public function laporanPembayaranCicilan(Request $request)
    {
        $query = PembayaranCicilan::with(['permintaanPembelian.rumah', 'permintaanPembelian.user', 'petugas']);

        // Filter berdasarkan metode pembayaran
        if ($request->filled('metode_pembayaran')) {
            $query->where('metode_pembayaran', $request->metode_pembayaran);
        }

        // Filter berdasarkan pelanggan (user_id)
        if ($request->filled('user_id')) {
            $query->whereHas('permintaanPembelian', function ($q) use ($request) {
                $q->where('user_id', $request->user_id);
            });
        }

        // Filter berdasarkan petugas
        if ($request->filled('petugas_id')) {
            $query->where('petugas_id', $request->petugas_id);
        }

        // Filter berdasarkan tanggal pembayaran
        if ($request->filled('tanggal_mulai')) {
            $query->whereDate('tanggal_pembayaran', '>=', $request->tanggal_mulai);
        }

        if ($request->filled('tanggal_selesai')) {
            $query->whereDate('tanggal_pembayaran', '<=', $request->tanggal_selesai);
        }

        $pembayarans = $query->orderBy('tanggal_pembayaran', 'desc')->get();

        // Jika request PDF
        if ($request->has('export_pdf')) {
            $pdf = PDF::loadView('pdf.laporan-pembayaran-cicilan', compact('pembayarans'));
            return $pdf->download('laporan-pembayaran-cicilan.pdf');
        }

        $users = User::all();

        return Inertia::render('Manager/LaporanPembayaranCicilan', [
            'pembayarans' => $pembayarans,
            'users' => $users,
            'filters' => $request->only(['metode_pembayaran', 'user_id', 'petugas_id', 'tanggal_mulai', 'tanggal_selesai']),
        ]);
    }
}
