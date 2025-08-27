<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\TipeRumah;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'manager',
            'email' => 'manager@gmail.com',
            'phone' => '085334703292',
            'email_verified_at' => now(),
            'password' => bcrypt('password123'),
            'role' => 'manager',
        ]);

        User::create([
            'name' => 'marketing',
            'email' => 'marketing@gmail.com',
            'phone' => fake()->phoneNumber(),
            'password' => bcrypt('password123'),
            'role' => 'marketing',
            'email_verified_at' => now(),
        ]);
        // Seed slider
        \App\Models\Slider::factory(5)->create();

        // Seed kantor profile
        \App\Models\KantorProfile::factory()->create();

        // Seed promosi
        \App\Models\Promosi::factory(5)->create();
        DB::table('tipe_rumahs')->insert([
            [
                'nama_tipe' => '21',
                'deskripsi' => 'rumah sederhana dengan 1 kamar tidur, 1 kamar mandi dan ruang tamu',
            ],
            [
                'nama_tipe' => '27',
                'deskripsi' => 'rumah sederhana dengan 2 kamar tidur, 1 kamar mandi dan ruang tamu',
            ],
            [
                'nama_tipe' => '36',
                'deskripsi' => 'rumah sederhana dengan 2 kamar tidur, 1 kamar mandi dan ruang tamu',
            ],
            [
                'nama_tipe' => '45',
                'deskripsi' => 'rumah sederhana dengan 3 kamar tidur, 1 kamar mandi dan ruang tamu',
            ],
            [
                'nama_tipe' => '54',
                'deskripsi' => 'rumah sederhana dengan 3 kamar tidur, 2 kamar mandi dan ruang tamu',
            ],
            [
                'nama_tipe' => '60',
                'deskripsi' => 'rumah sederhana dengan 3 kamar tidur, 3 kamar mandi dan ruang tamu',
            ],
            [
                'nama_tipe' => '70',
                'deskripsi' => 'rumah sederhana dengan 4 kamar tidur, 4 kamar mandi dan ruang tamu',
            ],
        ]);
        // Seed rumah dan gambar rumah
        // \App\Models\Rumah::factory(10)->create()->each(function ($rumah) {
        //     \App\Models\GambarRumah::factory(2)->create(['rumah_id' => $rumah->id]);
        // });
    }
}
