<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\BookingKunjungan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingKunjunganController extends Controller
{
    /**
     * Display a listing of the booking requests.
     */
    public function index()
    {
        $bookings = BookingKunjungan::with(['rumah', 'user', 'petugas'])
            ->orderBy('jadwal_kunjungan', 'desc')
            ->get();

        return Inertia::render('Marketing/BookingList', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Display the specified booking request.
     */
    public function show(BookingKunjungan $booking)
    {
        $booking->load(['rumah', 'user', 'petugas']);

        return Inertia::render('Marketing/BookingDetail', [
            'booking' => $booking,
        ]);
    }

    /**
     * Update the specified booking request status.
     */
    public function update(Request $request, BookingKunjungan $booking)
    {
        $request->validate([
            'status' => 'required|in:pending,disetujui,ditolak,selesai',
            'catatan' => 'nullable|string|max:1000',
        ]);
        $message = "";
        $auth = Auth::user();
        if ($request->status == "disetujui") {
            $message = "Permintaan Booking Kunjungan anda telah disetujui oleh $auth->name. Silakan menghubungi petugas kami untuk konfirmasi lebih lanjut. $auth->phone";
            $this->send_message($booking->user->phone, $message);
        }
        if ($request->status == "ditolak") {
            $message = "Permintaan Booking Kunjungan anda telah ditolak oleh $auth->name karena alasaan $request->catatan 
            \nSilahkan mengajukan permintaan kunjungan baru";
            $this->send_message($booking->user->phone, $message);
        }
        if ($request->status == "selesai") {
            $message = "Booking kunjungan rumah anda telah selesai. Terima kasih telah menggunakan layanan kami.";
            $this->send_message($booking->user->phone, $message);
        }


        $this->send_message($booking->user->phone, $message);
        $booking->update([
            'status' => $request->status,
            'catatan' => $request->catatan,
            'petugas_id' => Auth::id(),
        ]);

        return redirect()->route('marketing.booking.index')
            ->with('success', 'Status booking berhasil diperbarui.');
    }

    /**
     * Get booking statistics for dashboard.
     */
    public function statistics()
    {
        return [
            'booking_pending' => BookingKunjungan::where('status', 'pending')->count(),
            'booking_diterima' => BookingKunjungan::where('status', 'disetujui')->count(),
            'booking_ditolak' => BookingKunjungan::where('status', 'ditolak')->count(),
            'booking_selesai' => BookingKunjungan::where('status', 'selesai')->count(),
        ];
    }

    public function send_message($phone, $message)
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
