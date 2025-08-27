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
            'nama_pemilik' => "Muh Sultan Syam, S.Ars",
            'foto_pemilik' => fake()->imageUrl(640, 480, 'business', true, 'Faker'),
            'nama_kantor' => 'Maccinna House',
            'foto_kantor' => fake()->imageUrl(640, 480, 'business', true, 'Faker'),
            'logo' => fake()->imageUrl(640, 480, 'business', true, 'Faker'),
            'alamat' => fake()->address(),
            'telepon' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'website' => 'https://macinnahouse.site',
            'deskripsi' => 'Jl. Atiek Soetedja Provinsi Suawesi Barat Kabupaten Mamuju',
            'lat' => fake()->latitude(),
            'long' => fake()->longitude(),
        ];
    }
}
