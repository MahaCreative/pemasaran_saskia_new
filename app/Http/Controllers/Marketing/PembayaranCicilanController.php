<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\PembayaranCicilan;
use App\Models\PermintaanPembelian;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PembayaranCicilanController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware(['auth', 'role:marketing']);
    // }

    public function index()
    {
        $pembayaranCicilans = PembayaranCicilan::with(['permintaanPembelian.user', 'petugas'])

            ->latest()
            ->paginate(10);

        return inertia('Marketing/PembayaranCicilan/Index', [
            'pembayaranCicilans' => $pembayaranCicilans,
        ]);
    }

    public function create()
    {
        $permintaanPembelians = PermintaanPembelian::with(['user', 'rumah'])
            ->where('status', 'disetujui')
            ->latest()
            ->get();
        // dd($permintaanPembelians);
        $Count = PembayaranCicilan::count() + 1;
        $nomor_invoice = 'INV-' . str_pad($Count, 3, '0', STR_PAD_LEFT) . now()->format('dmy');
        return Inertia::render('Marketing/PembayaranCicilan/Form', [
            'permintaanPembelians' => $permintaanPembelians,
            'nomor_invoice' => $nomor_invoice
        ]);
    }

    public function createWithPermintaan(PermintaanPembelian $permintaanPembelian)
    {
        return Inertia::render('Marketing/Cicilan/Form', [
            'permintaanPembelian' => $permintaanPembelian->load(['user', 'rumah']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomor_invoice' => 'required',
            'permintaan_pembelian_id' => 'required|exists:permintaan_pembelians,id',
            'jumlah_pembayaran' => 'required|numeric|min:0',
            'tanggal_pembayaran' => 'required|date',
            'metode_pembayaran' => 'required|string|max:50',
            'catatan' => 'nullable|string|max:500',
            'bukti_transfer' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        $permintaan_pembelian = PermintaanPembelian::find($request->permintaan_pembelian_id);
        $validated['petugas_id'] = auth()->id();
        $validated['user_id'] = $permintaan_pembelian->user_id;

        if ($request->hasFile('bukti_transfer')) {
            $validated['bukti_transfer'] = $request->file('bukti_transfer')->store('bukti_transfer', 'public');
        }

        $pembayaranCicilan = PembayaranCicilan::create($validated);

        // Send notification to user who owns the permintaan pembelian
        $permintaanPembelian = $pembayaranCicilan->permintaanPembelian;
        $user = $permintaanPembelian->user;



        return redirect()->route('marketing.pembayaran-cicilan.index')
            ->with('success', 'Pembayaran cicilan berhasil dibuat dan notifikasi telah dikirim.');
    }

    public function show(PembayaranCicilan $pembayaranCicilan)
    {
        return Inertia::render('Marketing/Cicilan/Show', [
            'pembayaranCicilan' => $pembayaranCicilan->load(['permintaanPembelian.user', 'permintaanPembelian.rumah']),
        ]);
    }

    public function edit($id)
    {
        $pembayaranCicilan = PembayaranCicilan::find($id);
        // $this->authorize('update', $pembayaranCicilan);

        return Inertia::render('Marketing/PembayaranCicilan/Form', [
            'pembayaranCicilan' => $pembayaranCicilan->load(['permintaanPembelian.user', 'permintaanPembelian.rumah']),
        ]);
    }

    public function update(Request $request, PembayaranCicilan $pembayaranCicilan)
    {


        $validated = $request->validate([
            'jumlah_pembayaran' => 'required|numeric|min:0',
            'tanggal_pembayaran' => 'required|date',
            'metode_pembayaran' => 'required|string|max:50',
            'keterangan' => 'nullable|string|max:500',
            'bukti_transfer' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        $validated['bukti_transfer'] = $pembayaranCicilan->bukti_transfer;

        if ($request->hasFile('bukti_transfer')) {
            if ($pembayaranCicilan->bukti_transfer) {
                Storage::disk('public')->delete($pembayaranCicilan->bukti_transfer);
            }
            $validated['bukti_transfer'] = $request->file('bukti_transfer')->store('bukti_transfer', 'public');
        }

        $pembayaranCicilan->update($validated);

        return redirect()->route('marketing.pembayaran-cicilan.index')
            ->with('success', 'Pembayaran cicilan berhasil diperbarui.');
    }

    public function update_status(PembayaranCicilan $pembayaranCicilan, Request $request)
    {
        $pembayaranCicilan->update(['status' => $request->status]);
        $pembayaranCicilan->load(['permintaanPembelian']);
        $permintaanPembelian = $pembayaranCicilan->permintaanPembelian()->first();
        $user = User::find($permintaanPembelian->user_id);

        $sisa_pembayaran = $permintaanPembelian->sisa_pembayaran;
        if ($request->status === 'diterima') {
            $totalMasuk = PembayaranCicilan::where('user_id', $user->id)
                ->where('permintaan_pembelian_id', $pembayaranCicilan->permintaan_pembelian_id)->sum('jumlah_pembayaran');
            $check_sisa = $sisa_pembayaran - $totalMasuk;

            if ($check_sisa <= 1) {
                $permintaanPembelian->update(['status_lunas' => 'lunas']);
            }
            $message = "
            \n Bapak/Ibu $user->name Pembayaran anda 
            \nSenilai :$pembayaranCicilan->jumlah_pembayaran 
            \nTanggal Bayar: $pembayaranCicilan->tanggal_pembayaran
            \nTelah diterima, terima kasih sudah melakukan pembayaran";
            $this->send_notif($user->phone, $message);
        } else {
            $permintaanPembelian->update(['status_lunas' => 'belum lunas']);
        }
    }
    public function destroy(PembayaranCicilan $pembayaranCicilan)
    {


        if ($pembayaranCicilan->bukti_transfer) {
            Storage::disk('public')->delete($pembayaranCicilan->bukti_transfer);
        }

        $pembayaranCicilan->delete();

        return redirect()->route('marketing.pembayaran-cicilan.index')
            ->with('success', 'Pembayaran cicilan berhasil dihapus.');
    }
    public function send_notif($phone, $message)
    {
        $token = 'vxGCUC7iSgTfRG1vMU7h'; // Set token di .env jika mau
        $target = $phone;


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
    }
}
