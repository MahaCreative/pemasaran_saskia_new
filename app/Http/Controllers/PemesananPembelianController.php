<?php

namespace App\Http\Controllers;

use App\Models\PermintaanPembelian;
use App\Models\Rumah;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PemesananPembelianController extends Controller
{
    public function create(Rumah $rumah)
    {
        return Inertia::render('CalonPembeli/PemesananPembelian', [
            'rumah' => $rumah,
        ]);
    }



    public function store(Request $request, Rumah $rumah)
    {
        $request->validate([
            'jumlah_cicilan_per_bulan' => 'required|numeric|min:1000000',
            'jangka_waktu' => 'required|integer|min:6|max:240',
            'tanggal_pembayaran' => 'required|date|after:today',
            'catatan' => 'nullable|string|max:1000',
            'terms' => 'required|accepted',
        ]);

        DB::beginTransaction();

        try {
            $totalHarga = $rumah->harga;
            $defaultUangMuka = 0.3 * $totalHarga;
            $sisaPembayaran = $totalHarga - $defaultUangMuka;
            $chek = PermintaanPembelian::where('user_id', Auth::id())->count();
            $kode_permintaan = 'PL-' . Auth::id() . str_pad($chek, 3, '0', STR_PAD_LEFT) . now()->format('dmy');

            $pemesanan = PermintaanPembelian::create([
                'user_id' => Auth::id(),
                'kode_permintaan' => $kode_permintaan,
                'rumah_id' => $rumah->id,
                'jumlah_cicilan_per_bulan' => $request->jumlah_cicilan_per_bulan,
                'total_harga_rumah' => $totalHarga,
                'uang_muka' => $defaultUangMuka,
                'sisa_pembayaran' => $sisaPembayaran,
                'jangka_waktu' => $request->jangka_waktu,
                'bunga_persen' => null,
                'tanggal_pengajuan' => now(),
                'tanggal_pembayaran' => $request->tanggal_pembayaran,
                'catatan' => $request->catatan,
                'status' => 'pending',
            ]);
            $rumah->update(['status' => 'dipesan']);

            // Kirim pesan ke semua user dengan role "marketing"
            $marketings = User::where('role', '=', 'marketing')->get();

            foreach ($marketings as $marketing) {
                if ($marketing->phone) {
                    $this->sendOtpFonnte(
                        $marketing->phone,
                        '-', // tidak perlu OTP, jadi isi placeholder
                        $marketing->name,
                        "Ada permintaan pembelian baru dari " . Auth::user()->name . ".\n\n" .
                            "📌 *Detail Rumah:*\n" .
                            "Nama: {$rumah->nama_rumah}\n" .
                            "Harga: Rp " . number_format($totalHarga, 0, ',', '.') . "\n" .
                            "Cicilan per bulan: Rp " . number_format($request->jumlah_cicilan_per_bulan, 0, ',', '.') . "\n" .
                            "Jangka waktu: {$request->jangka_waktu} bulan\n" .
                            "Jatuh tempo pertama: " . \Carbon\Carbon::parse($request->tanggal_pembayaran)->format('d M Y')
                    );
                }
            }

            DB::commit();

            return redirect()->route('rumah.detail', $rumah)
                ->with('success', 'Permintaan pembelian berhasil dikirim. Kami akan segera menghubungi Anda.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()
            ]);
        }
    }

    public function sendOtpFonnte($phone, $otp = '-', $name = null, $customMessage = null)
    {
        $token = 'vxGCUC7iSgTfRG1vMU7h'; // Set token di .env jika mau
        $target = $phone;
        $message = $customMessage ?: "Halo" . ($name ? " $name" : "") . ", kode OTP Anda adalah: $otp. Kode berlaku selama 5 menit. Jangan berikan kode ini kepada siapapun.";

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array(
                'target' => $target,
                'message' => $message,
                'countryCode' => '62',
            ),
            CURLOPT_HTTPHEADER => array(
                'Authorization: ' . $token,
            ),
        ));

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);
        if (isset($error_msg)) {
            // Log error if needed
        }
        // Optional: log response
    }



    public function index()
    {
        $pemesanan = PermintaanPembelian::with(['rumah' => function ($q) {
            $q->with('tipe');
        }, 'user'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('CalonPembeli/HistoryPemesanan', [
            'pemesanan' => $pemesanan,
        ]);
    }

    public function show($id)
    {
        $pemesanan = PermintaanPembelian::with(['rumah' => function ($q) {
            $q->with('tipe');
        }, 'petugas'])
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        // Assuming you have a PembayaranCicilan model for payment history
        $pembayaran = \App\Models\PembayaranCicilan::where('permintaan_pembelian_id', $id)
            ->orderBy('tanggal_pembayaran', 'desc')
            ->get();

        return Inertia::render('CalonPembeli/DetailPemesanan', [
            'pemesanan' => $pemesanan,
            'rumah' => $pemesanan->rumah,
            'pembayaran' => $pembayaran,
        ]);
    }

    public function delete(Request $request, $id)
    {

        PermintaanPembelian::find($id)->delete();
    }

    public function paymentHistory()
    {
        $userId = Auth::id();

        $pembayaran = \App\Models\PembayaranCicilan::with(['permintaanPembelian', 'permintaanPembelian.rumah'])
            ->whereHas('permintaanPembelian', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->orderBy('tanggal_pembayaran', 'desc')
            ->get();

        return Inertia::render('CalonPembeli/RiwayatPembayaran', [
            'pembayaran' => $pembayaran,
        ]);
    }
}
