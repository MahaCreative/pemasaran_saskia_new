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
        Schema::create('pembayaran_cicilans', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('permintaan_pembelian_id');
            $table->string('nomor_invoice')->unique();
            $table->decimal('jumlah_pembayaran', 15, 2);
            $table->string('metode_pembayaran'); // e.g., Transfer Bank, Cash, QRIS
            $table->string('bukti_transfer'); // e.g., Transfer Bank, Cash, QRIS
            $table->date('tanggal_pembayaran');
            $table->text('catatan')->nullable();
            $table->text('status_terlambat')->default('tepat waktu');
            $table->enum('status', ['pending', 'diterima', 'ditolak'])->default('pending');
            $table->unsignedBigInteger('user_id'); // siapa yang mencatat pembayaran
            $table->unsignedBigInteger('petugas_id')->nullable(); // siapa yang mencatat pembayaran
            $table->timestamps();

            // Foreign Keys
            $table->foreign('permintaan_pembelian_id')
                ->references('id')
                ->on('permintaan_pembelians')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->foreign('petugas_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran_cicilans');
    }
};
