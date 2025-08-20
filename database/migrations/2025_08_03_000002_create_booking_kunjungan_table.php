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
        Schema::create('booking_kunjungans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('petugas_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('rumah_id')->constrained('rumahs')->onDelete('cascade');
            $table->dateTime('jadwal_kunjungan');
            $table->string('status')->default('pending'); // pending, disetujui, ditolak, selesai
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_kunjungan');
    }
};
