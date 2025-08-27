<?php

namespace App\Http\Controllers;

use App\Models\BookingKunjungan;
use App\Models\Rumah;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingKunjunganController extends Controller
{
    public function create(Rumah $rumah)
    {
        return Inertia::render('CalonPembeli/BookingKunjungan', [
            'rumah' => $rumah,
        ]);
    }

    public function store(Request $request, Rumah $rumah)
    {
        $request->validate([
            'jadwal_kunjungan' => 'required|date|after:now',
            'catatan' => 'nullable|string|max:500',
        ]);

        $booking = BookingKunjungan::create([
            'user_id' => Auth::id(),
            'rumah_id' => $rumah->id,
            'jadwal_kunjungan' => $request->jadwal_kunjungan,
            'status' => 'pending',
            'catatan' => $request->catatan,
        ]);

        $user = User::find(Auth::id());
        $message = "Halo admin, terdapat permintaan booking kunjungan, silahkan melakukan konfirmasi ke Calon Pembeli \n
        \n Nama Pembeli : $user->name
        \n WhatsApp     : $user->phone
        \n Harap Melakukan pelayanan terbaik, jika permintaan booking disetujui, silahkan lakukan konfirmasi di halaman Booking Kunjungan,
        ";
        $marketing = User::where('role', '=', 'marketing')->get();
        foreach ($marketing as $item) {
            $this->send_notif($item->phone, $message);
        }
        return redirect()->route('rumah.detail', $rumah)
            ->with('success', 'Booking kunjungan berhasil dibuat. Kami akan mengonfirmasi jadwal Anda.');
    }

    public function index()
    {
        $bookings = BookingKunjungan::with(['rumah', 'user', 'petugas'])
            ->where('user_id', Auth::id())
            ->orderBy('jadwal_kunjungan', 'desc')
            ->get();

        return Inertia::render('CalonPembeli/BookingList', [
            'bookings' => $bookings,
        ]);
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
