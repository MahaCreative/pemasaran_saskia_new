<?php

namespace Database\Factories;

use App\Models\KantorProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class KantorProfileFactory extends Factory
{
    protected $model = KantorProfile::class;

    public function definition()
    {
        return [
            'nama_pemilik' => fake()->name,
            'foto_pemilik' => fake()->imageUrl(640, 480, 'business', true, 'Faker'),
            'nama_kantor' => 'Maccinna House',
            'foto_kantor' => fake()->imageUrl(640, 480, 'business', true, 'Faker'),
            'logo' => fake()->imageUrl(640, 480, 'business', true, 'Faker'),
            'alamat' => fake()->address(),
            'telepon' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'website' => 'maccinnahouse',
            'deskripsi' => fake()->paragraph(),
            'lat' => fake()->latitude(),
            'long' => fake()->longitude(),
        ];
    }
}
