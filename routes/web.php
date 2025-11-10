<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingKunjunganController;
use App\Http\Controllers\CalonPembeliController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GambarRumahController;
use App\Http\Controllers\PemesananPembelianController;
use App\Http\Controllers\Marketing\PermintaanPembelianController;
use App\Http\Controllers\Marketing\PromosiController;
use App\Http\Controllers\Marketing\RumahController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Marketing\PembayaranCicilanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Manager\KantorProfileController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Marketing\BookingKunjunganController as MarketingBookingKunjunganController;
use App\Http\Controllers\Manager\LaporanController;
use App\Http\Controllers\OfferMailController;

// Auth routes
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/forgot-password', [AuthController::class, 'showForgotPassword'])->name('forgot-password');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::get('/otp-verify', [AuthController::class, 'showOtpForm'])->name('otp.verify.form');
Route::post('/otp-verify', [AuthController::class, 'verifyOtp'])->name('otp.verify');
Route::get('/reset-password', [AuthController::class, 'showResetPasswordForm'])->name('password.reset.form');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Public routes
Route::get('/', [CalonPembeliController::class, 'home'])->name('home');
Route::get('/tentang-kami', [CalonPembeliController::class, 'profileKantor'])->name('about');
Route::get('/galeri', [CalonPembeliController::class, 'galeri'])->name('galeri');
Route::get('/promosi', [CalonPembeliController::class, 'promosi'])->name('promosi');
Route::get('/katalog-rumah', [CalonPembeliController::class, 'katalog_rumah'])->name('rumah.index');
Route::get('/rumah/{rumah}', [CalonPembeliController::class, 'detail'])->name('rumah.detail');



// Riwayat Pembayaran routes
Route::get('/riwayat-pembayaran', [\App\Http\Controllers\RiwayatPembayaranController::class, 'index'])->name('riwayat_pembayaran.index');
Route::get('/riwayat-pembayaran/data', [\App\Http\Controllers\RiwayatPembayaranController::class, 'data'])->name('riwayat_pembayaran.data');

// Authenticated routes
Route::middleware(['auth'])->group(function () {

    // Booking routes
    Route::get('/rumah/{rumah}/booking', [BookingKunjunganController::class, 'create'])->name('booking.create');
    Route::post('/rumah/{rumah}/booking', [BookingKunjunganController::class, 'store'])->name('booking.store');
    Route::get('/booking-saya', [BookingKunjunganController::class, 'index'])->name('booking.index');

    // Pemesanan routes
    Route::get('/rumah/{rumah}/pesan', [PemesananPembelianController::class, 'create'])->name('pemesanan.create');
    Route::post('/rumah/{rumah}/pesan', [PemesananPembelianController::class, 'store'])->name('pemesanan.store');
    Route::get('/history-pesanan-pembelian', [PemesananPembelianController::class, 'index'])->name('pemesanan.index');
    Route::get('/history-pesanan-pembelian/{id}', [PemesananPembelianController::class, 'show'])->name('pemesanan.show');
    Route::delete('/delete-history-pesanan-pembelian/{id}', [PemesananPembelianController::class, 'delete'])->name('pemesanan.delete');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('marketing/pembayaran-cicilan', [PembayaranCicilanController::class, 'index'])->name('marketing.pembayaran-cicilan.index');
    Route::post('marketing/update-status-pembayaran-cicilan/{pembayaranCicilan}', [PembayaranCicilanController::class, 'update_status'])->name('marketing.pembayaran-cicilan.update_status');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Marketing routes
    // Route::middleware(['role:marketing'])->group(function () {
    // Pembayaran Cicilan routes



    Route::get('marketing/create-pembayaran-cicilan', [PembayaranCicilanController::class, 'create'])->name('marketing.pembayaran-cicilan.create');
    Route::post('marketing/create-pembayaran-cicilan', [PembayaranCicilanController::class, 'store'])->name('marketing.pembayaran-cicilan.store');
    Route::get('marketing/edit-pembayaran-cicilan/{id}', [PembayaranCicilanController::class, 'edit'])->name('marketing.pembayaran-cicilan.edit');
    Route::post('marketing/update-pembayaran-cicilan/{id}', [PembayaranCicilanController::class, 'update'])->name('marketing.pembayaran-cicilan.update');
    Route::delete('marketing/destroy-pembayaran-cicilan/{pembayaranCicilan}', [PembayaranCicilanController::class, 'destroy'])->name('marketing.pembayaran-cicilan.destroy');
    // Permintaan Pembelian routes
    Route::get('/marketing/permintaan-pembelian', [PermintaanPembelianController::class, 'index'])->name('marketing.permintaan_pembelian.index');
    Route::get('/marketing/permintaan-pembelian/{permintaanPembelian}', [PermintaanPembelianController::class, 'show'])->name('marketing.permintaan_pembelian.show');
    Route::get('/marketing/permintaan-pembelian/{permintaanPembelian}/edit', [PermintaanPembelianController::class, 'edit'])->name('marketing.permintaan_pembelian.edit');
    Route::post('/marketing/permintaan-pembelian/{permintaanPembelian}', [PermintaanPembelianController::class, 'update'])->name('marketing.permintaan_pembelian.update');

    // Rumah routes
    Route::get('/marketing/rumah', [RumahController::class, 'index'])->name('marketing.rumah.index');
    Route::get('/marketing/create-rumah', [RumahController::class, 'create'])->name('marketing.rumah.create');
    Route::post('/marketing/rumah', [RumahController::class, 'store'])->name('marketing.rumah.store');
    Route::get('/marketing/edit-rumah/{id}', [RumahController::class, 'edit'])->name('marketing.rumah.edit');
    Route::post('/marketing/rumah/{rumah}', [RumahController::class, 'update'])->name('marketing.rumah.update');
    Route::delete('/marketing/rumah/{rumah}', [RumahController::class, 'destroy'])->name('marketing.rumah.destroy');

    // Promosi routes
    Route::get('/marketing/promosi', [PromosiController::class, 'index'])->name('marketing.promosi.index');
    Route::get('/marketing/create-promosi', [PromosiController::class, 'create'])->name('marketing.promosi.create');
    Route::post('/marketing/promosi', [PromosiController::class, 'store'])->name('marketing.promosi.store');
    Route::get('/marketing/edit-promosi/{promosi}', [PromosiController::class, 'edit'])->name('marketing.promosi.edit');
    Route::post('/marketing/promosi/{promosi}', [PromosiController::class, 'update'])->name('marketing.promosi.update');
    Route::delete('/marketing/delete-promosi/{promosi}', [PromosiController::class, 'destroy'])->name('marketing.promosi.destroy');

    // Booking Kunjungan routes
    Route::get('/marketing/booking-kunjungan', [MarketingBookingKunjunganController::class, 'index'])->name('marketing.booking.index');
    Route::get('/marketing/booking-kunjungan/{booking}', [MarketingBookingKunjunganController::class, 'show'])->name('marketing.booking.show');
    Route::post('/marketing/booking-kunjungan/{booking}', [MarketingBookingKunjunganController::class, 'update'])->name('marketing.booking.update');

    // Galeri routes
    Route::get('/marketing/galeri', [GambarRumahController::class, 'index'])->name('marketing.galeri.index');

    // Permintaan Pembelian Revisi routes

});



// Manager routes
// Route::middleware(['role:manager'])->group(function () {
Route::get('/manager/kantor-profile', [\App\Http\Controllers\Manager\KantorProfileController::class, 'index'])->name('manager.kantor-profile.index');
Route::post('/manager/update-kantor-profile', [\App\Http\Controllers\Manager\KantorProfileController::class, 'store'])->name('manager.kantor-profile.store');
Route::get('/manager/user', [UserController::class, 'index'])->name('user.index');
Route::post('/manager/user', [UserController::class, 'store'])->name('user.store');
Route::post('/manager/user/{user}', [UserController::class, 'update'])->name('user.update');
Route::delete('/manager/user/{user}', [UserController::class, 'destroy'])->name('user.destroy');

// Manager Laporan routes
Route::get('/manager/laporan/rumah', [LaporanController::class, 'laporanRumah'])->name('manager.laporan.rumah');
Route::post('/manager/laporan/rumah', [LaporanController::class, 'laporanRumah'])->name('manager.laporan.rumah.filter');

Route::get('/manager/laporan/permintaan-pembelian', [LaporanController::class, 'laporanPermintaanPembelian'])->name('manager.laporan.permintaan-pembelian');
Route::post('/manager/laporan/permintaan-pembelian', [LaporanController::class, 'laporanPermintaanPembelian'])->name('manager.laporan.permintaan-pembelian.filter');

Route::get('/manager/laporan/booking-kunjungan', [LaporanController::class, 'laporanBookingKunjungan'])->name('manager.laporan.booking-kunjungan');
Route::post('/manager/laporan/booking-kunjungan', [LaporanController::class, 'laporanBookingKunjungan'])->name('manager.laporan.booking-kunjungan.filter');

Route::get('/manager/laporan/pembayaran-cicilan', [LaporanController::class, 'laporanPembayaranCicilan'])->name('manager.laporan.pembayaran-cicilan');
Route::post('/manager/laporan/pembayaran-cicilan', [LaporanController::class, 'laporanPembayaranCicilan'])->name('manager.laporan.pembayaran-cicilan.filter');
// });




// Profile routes
Route::middleware(['auth'])->group(function () {});
// });

Route::get('/send-offer', [OfferMailController::class, 'sendOffer']);
Route::get('/preview-offer', [OfferMailController::class, 'previewOffer']);
