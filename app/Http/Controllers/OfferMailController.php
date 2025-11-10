<?php

namespace App\Http\Controllers;

use App\Mail\JobOfferMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OfferMailController extends Controller
{
    public function sendOffer()
    {
        $details = [
            'name' => 'Guntur Madjid',
            'salary' => '$2582',
            'company' => 'Ifative',
            'address' => 'Perumahan Bida Asri 2 Blok F2 No 18, Kec. Batam Kota, Batam',
            'phone' => '085888141448',
            'email' => 'hi@ifative.com',
            'reason' => 'karena performa luar biasa Anda pada kejuaraan robotik tingkat nasional.'
        ];

        Mail::to('gunturmadjid.3@gmail.com')->send(new JobOfferMail($details));

        return '✅ Email tawaran berhasil dikirim ke Guntur Madjid!';
    }

    // Optional: untuk menampilkan tampilan email di browser tanpa mengirim
    public function previewOffer()
    {
        $details = [
            'name' => 'Guntur Madjid',
            'salary' => '$2582',
            'company' => 'Ifative',
            'address' => 'Perumahan Bida Asri 2 Blok F2 No 18, Kec. Batam Kota, Batam',
            'phone' => '085888141448',
            'email' => 'hi@ifative.com',
            'reason' => 'karena performa luar biasa Anda pada kejuaraan robotik tingkat nasional.'
        ];

        return view('emails.job_offer', compact('details'));
    }
}
