<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\TipeRumah;
use App\Models\User;
use Illuminate\Database\Seeder;

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
        TipeRumah::factory(5)->create();
        // Seed rumah dan gambar rumah
        // \App\Models\Rumah::factory(10)->create()->each(function ($rumah) {
        //     \App\Models\GambarRumah::factory(2)->create(['rumah_id' => $rumah->id]);
        // });
    }
}
