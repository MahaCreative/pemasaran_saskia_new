<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class AuthController extends Controller
{
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }
    public function showRegister()
    {
        return inertia('Auth/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $otp = rand(100000, 999999);
        $otpExpires = now()->addMinutes(5);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'pelanggan',
            'otp' => $otp,
            'otp_expires_at' => $otpExpires,
        ]);

        // Kirim OTP via Fonnte WhatsApp
        if ($user->phone) {
            $this->sendOtpFonnte($user->phone, $otp, $user->name);
        }

        return redirect()->route('otp.verify.form', ['phone' => $user->phone]);
    }

    public function showLogin()
    {
        return inertia('Auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            return redirect()->route('dashboard');
        }
        return back()->withErrors(['email' => 'Email atau password salah']);
    }

    public function showForgotPassword()
    {
        return inertia('Auth/ForgotPassword');
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['phone' => 'required|exists:users,phone']);
        $user = User::where('phone', $request->phone)->first();
        $otp = rand(100000, 999999);
        $otpExpires = now()->addMinutes(5);
        $user->otp = $otp;
        $user->otp_expires_at = $otpExpires;
        $user->save();
        // Set session reset_password agar verifyOtp tahu ini flow reset password
        session(['reset_password' => true]);
        // Kirim OTP via Fonnte WhatsApp
        if ($user->phone) {
            $this->sendOtpFonnte($user->phone, $otp, $user->name);
        }
        return redirect()->route('otp.verify.form', ['phone' => $user->phone]);
    }
    /**
     * Send OTP via Fonnte WhatsApp API
     */
    public function sendOtpFonnte($phone, $otp, $name = null)
    {
        $token = 'oAMf+vjnQeV9gmqAGRb8'; // Set token di .env
        $target = $phone;
        $message = "Halo" . ($name ? " $name" : "") . ", kode OTP Anda adalah: $otp. Kode berlaku selama 5 menit. Jangan berikan kode ini kepada siapapun.";

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
        // Optionally log/send $response

    }

    public function showOtpForm(Request $request)
    {
        $phone = $request->query('phone');
        return inertia('Auth/OtpVerify', ['phone' => $phone]);
    }

    public function verifyOtp(Request $request)
    {

        $request->validate([
            'phone' => 'required|exists:users,phone',
            'otp' => 'required',
        ]);
        $user = User::where('phone', $request->phone)->first();
        if (!$user || !$user->otp || $user->otp !== $request->otp) {
            return back()->withErrors(['otp' => 'OTP salah']);
        }
        if (now()->gt($user->otp_expires_at)) {
            return back()->withErrors(['otp' => 'OTP expired']);
        }
        // Cek apakah ini flow reset password (ada session 'reset_password')
        if (session('reset_password')) {
            $user->update([
                'otp' => null,
                'otp_expires_at' => null,
            ]);
            // Set session user id untuk reset password
            session(['reset_user_id' => $user->id]);

            return redirect()->route('password.reset.form');
        } else {
            $user->update([
                'email_verified_at' => now(),
                'otp' => null,
                'otp_expires_at' => null,
            ]);

            Auth::login($user);

            return redirect()->route('home');
        }
    }
    public function showResetPasswordForm(Request $request)
    {
        // Pastikan user sudah diverifikasi OTP dan session reset_user_id ada
        if (!session('reset_user_id')) {
            return redirect()->route('login')->withErrors(['otp' => 'Akses tidak valid.']);
        }
        $user = \App\Models\User::find(session('reset_user_id'));
        if (!$user) {
            return redirect()->route('login')->withErrors(['otp' => 'User tidak ditemukan.']);
        }
        return inertia('Auth/ResetPassword', [
            'email' => $user->email
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:6|confirmed',
        ]);
        $userId = session('reset_user_id');
        if (!$userId) {
            return redirect()->route('login')->withErrors(['otp' => 'Akses tidak valid.']);
        }
        $user = User::find($userId);
        if (!$user) {
            return redirect()->route('login')->withErrors(['otp' => 'User tidak ditemukan.']);
        }
        $user->password = Hash::make($request->password);
        $user->save();
        // Hapus session agar tidak bisa reset ulang tanpa OTP
        session()->forget('reset_user_id');
        return redirect()->route('login')->with('status', 'Password berhasil direset. Silakan login.');
    }
}
