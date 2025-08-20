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
        Schema::create('kantor_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pemilik');
            $table->string('foto_pemilik');
            $table->string('nama_kantor');
            $table->string('foto_kantor')->nullable();
            $table->string('logo');
            $table->string('alamat');
            $table->string('telepon');
            $table->string('email');
            $table->string('website')->nullable();
            $table->longText('deskripsi')->nullable();
            $table->string('lat');
            $table->string('long');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kantor_profiles');
    }
};
