<?php

namespace App\Http\Controllers;

use App\Models\BookingKunjungan;
use App\Models\Rumah;
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
}
