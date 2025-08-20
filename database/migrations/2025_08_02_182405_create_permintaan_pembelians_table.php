<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permintaan_pembelians', function (Blueprint $table) {
            $table->id();
            $table->string('kode_permintaan');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('petugas_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('rumah_id')->constrained('rumahs')->onDelete('cascade');

            // Informasi Keuangan
            $table->float('total_harga_rumah', 15, 2);             // Harga total rumah
            $table->float('uang_muka', 15, 2)->nullable();         // Uang muka jika ada
            $table->float('sisa_pembayaran', 15, 2)->nullable();   // Total - uang muka
            $table->float('jumlah_cicilan_per_bulan', 15, 2);      // Besar cicilan
            $table->integer('jangka_waktu');                       // Lama cicilan dalam bulan
            $table->float('bunga_persen', 5, 2)->nullable();       // Bunga jika ada

            // Tanggal dan Waktu
            $table->date('tanggal_pengajuan');                     // Kapan user mengajukan
            $table->date('tanggal_pembayaran');                    // Tanggal cicilan pertama
            $table->timestamp('tanggal_disetujui')->nullable();    // Kapan admin menyetujui

            // Status dan Validasi
            $table->enum('status', ['pending', 'disetujui', 'ditolak'])->default('pending');


            // Informasi Tambahan
            $table->text('catatan')->nullable();
            $table->string('berkas_perjanjian')->nullable();
            $table->text('alasan_penolakan')->nullable();
            $table->string('status_lunas')->default('belum_lunas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_pembelians');
    }
};
