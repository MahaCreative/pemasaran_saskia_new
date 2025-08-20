<?php


namespace App\Http\Controllers;

use App\Models\BookingKunjungan;
use App\Models\PembayaranCicilan;
use App\Models\PermintaanPembelian;
use App\Models\Rumah;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{



    public function index(Request $request)
    {
        if ($request->user()->role == 'manager') {
            $bulanSekarang = Carbon::now()->month;
            $tahunSekarang = Carbon::now()->year;

            // Cards
            $cards = [
                ['title' => 'Total Permintaan Pembelian', 'value' => PermintaanPembelian::count()],
                ['title' => 'Permintaan Pembelian Pending ', 'value' => PermintaanPembelian::where('status', 'pending')->count()],
                ['title' => 'Permintaan Pembelian Disetujui ', 'value' => PermintaanPembelian::where('status', 'disetujui')->count()],
                ['title' => 'Permintaan Pembelian Ditolak ', 'value' => PermintaanPembelian::where('status', 'ditolak')->count()],
                ['title' => 'Total Booking ', 'value' => BookingKunjungan::count()],
                ['title' => 'Booking Pending', 'value' => BookingKunjungan::where('status', 'pending')->count()],
                ['title' => 'Booking Ditolak', 'value' => BookingKunjungan::where('status', 'ditolak')->count()],
                ['title' => 'Booking Disetujui', 'value' => BookingKunjungan::where('status', 'disetujui')->count()],
                ['title' => 'Booking Selesai', 'value' => BookingKunjungan::where('status', 'selesai')->count()],
                ['title' => 'Pembayaran Diterima', 'value' => PembayaranCicilan::where('status', 'diterima')->sum('jumlah_pembayaran')],
            ];


            // Permintaan per bulan (tahun ini)
            $chartPermintaan = [
                'labels' => [],
                'data'   => [],
            ];
            $permintaanBulanan = PermintaanPembelian::select(
                DB::raw('MONTH(tanggal_pengajuan) as bulan'),
                DB::raw('COUNT(*) as total')
            )
                ->whereYear('tanggal_pengajuan', $tahunSekarang)
                ->groupBy('bulan')
                ->orderBy('bulan')
                ->get();

            foreach ($permintaanBulanan as $row) {
                $chartPermintaan['labels'][] = Carbon::create()->month($row->bulan)->translatedFormat('F');
                $chartPermintaan['data'][]   = $row->total;
            }

            // Status Permintaan bulan ini
            $statusData = PermintaanPembelian::select('status', DB::raw('COUNT(*) as total'))
                ->whereMonth('tanggal_pengajuan', $bulanSekarang)
                ->whereYear('tanggal_pengajuan', $tahunSekarang)
                ->groupBy('status')
                ->pluck('total', 'status')
                ->toArray();

            $chartStatus = [
                'labels' => array_keys($statusData),
                'data'   => array_values($statusData),
            ];


            // Pembayaran Bulanan (bulan ini)
            $chartPembayaranBulanan = [
                'labels' => [],
                'data'   => [],
            ];
            $pembayaranBulanIni = PembayaranCicilan::select(
                DB::raw('DAY(tanggal_pembayaran) as hari'),
                DB::raw('SUM(jumlah_pembayaran) as total')
            )
                ->whereMonth('tanggal_pembayaran', $bulanSekarang)
                ->whereYear('tanggal_pembayaran', $tahunSekarang)
                ->groupBy('hari')
                ->orderBy('hari')
                ->get();

            foreach ($pembayaranBulanIni as $row) {
                $chartPembayaranBulanan['labels'][] = $row->hari;
                $chartPembayaranBulanan['data'][]   = $row->total;
            }

            // Pembayaran Tahunan (tahun ini)
            $chartPembayaranTahunan = [
                'labels' => [],
                'data'   => [],
            ];
            $pembayaranBulanan = PembayaranCicilan::select(
                DB::raw('MONTH(tanggal_pembayaran) as bulan'),
                DB::raw('SUM(jumlah_pembayaran) as total')
            )
                ->whereYear('tanggal_pembayaran', $tahunSekarang)
                ->groupBy('bulan')
                ->orderBy('bulan')
                ->get();

            foreach ($pembayaranBulanan as $row) {
                $chartPembayaranTahunan['labels'][] = Carbon::create()->month($row->bulan)->translatedFormat('F');
                $chartPembayaranTahunan['data'][]   = $row->total;
            }

            // Booking bulan ini
            $bookingData = BookingKunjungan::select('status', DB::raw('COUNT(*) as total'))
                ->whereMonth('jadwal_kunjungan', $bulanSekarang)
                ->whereYear('jadwal_kunjungan', $tahunSekarang)
                ->groupBy('status')
                ->pluck('total', 'status')
                ->toArray();

            $chartBooking = [
                'labels' => array_keys($bookingData),
                'data'   => array_values($bookingData),
            ];
            // return response()->json([
            //     'cards'                    => $cards,
            //     'chartPermintaan'          => $chartPermintaan,
            //     'chartStatus'              => $chartStatus,
            //     'chartPembayaranBulanan'   => $chartPembayaranBulanan,
            //     'chartPembayaranTahunan'   => $chartPembayaranTahunan,
            //     'chartBooking'             => $chartBooking,
            // ]);
            return inertia('Manager/Dashboard', [
                'cards'                    => $cards,
                'chartPermintaan'          => $chartPermintaan,
                'chartStatus'              => $chartStatus,
                'chartPembayaranBulanan'   => $chartPembayaranBulanan,
                'chartPembayaranTahunan'   => $chartPembayaranTahunan,
                'chartBooking'             => $chartBooking,
            ]);
        }

        if ($request->user()->role == 'marketing') {
            $count = [
                'rumah_count' => Rumah::count(),
                'permintaan_pending' => PermintaanPembelian::where('status', 'pending')->count(),
                'permintaan_diterima' => PermintaanPembelian::where('status', 'diterima')->count(),
                'permintaan_ditolak' => PermintaanPembelian::where('status', 'ditolak')->count(),
                'booking_pending' => BookingKunjungan::where('status', 'pending')->count(),
                'booking_diterima' => BookingKunjungan::where('status', 'diterima')->count(),
                'booking_ditolak' => BookingKunjungan::where('status', 'ditolak')->count(),
                'booking_selesai' => BookingKunjungan::where('status', 'selesai')->count(),
            ];
            return Inertia::render('Marketing/Dashboard', compact('count'));
        }
        return inertia('CalonPembeli/Dashboard');
    }
}
