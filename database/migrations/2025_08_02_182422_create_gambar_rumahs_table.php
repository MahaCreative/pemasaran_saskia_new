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
        Schema::create('gambar_rumahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rumah_id')->constrained('rumahs')->onDelete('cascade');
            $table->string('nama_gambar');
            $table->string('path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gambar_rumahs');
    }
};
