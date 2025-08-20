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
        Schema::create('rumahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipe_id')->constrained('tipe_rumahs')->onDelete('restrict');

            $table->string('kode_rumah')->unique();
            $table->string('nama_rumah');
            $table->decimal('harga', 15, 2);

            $table->enum('status', ['tersedia', 'dipesan', 'terjual'])->default('tersedia');
            $table->text('deskripsi')->nullable();
            $table->string('gambar')->nullable();
            $table->string('video_tour')->nullable();

            $table->string('alamat');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            $table->decimal('luas_bangunan', 8, 2);
            $table->decimal('luas_kelebihan_tanah', 8, 2)->nullable();
            $table->string('parkiran');
            $table->string('dapur');
            $table->string('jumlah_kamar_tidur');
            $table->string('jumlah_kamar_mandi');
            $table->integer('lantai')->default(1);
            $table->string('tahun_bangun')->nullable();

            $table->text('fasilitas_tambahan')->nullable();
            $table->enum('tipe_pembayaran', ['cash', 'kredit', 'keduanya'])->default('keduanya');
            $table->boolean('is_favorit')->default(false);
            $table->date('tanggal_tersedia')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rumah');
    }
};
