<?php

namespace Database\Factories;

use App\Models\Rumah;
use Illuminate\Database\Eloquent\Factories\Factory;

class RumahFactory extends Factory
{
    protected $model = Rumah::class;


    public function definition()
    {
        return [
            'tipe_id' => rand(1, 5),

            'kode_rumah' => 'RMH-' . $this->faker->unique()->numerify('###'),
            'nama_rumah' => $this->faker->words(2, true),
            'harga' => $this->faker->randomFloat(2, 50000000, 1500000000),

            'status' => $this->faker->randomElement(['tersedia', 'dipesan', 'terjual']),
            'deskripsi' => $this->faker->paragraph(),
            'gambar' => 'rumah_' . $this->faker->numberBetween(1, 5) . '.jpg',
            'video_tour' => 'https://youtube.com/embed/' . $this->faker->lexify('???????'),

            'alamat' => $this->faker->address,
            'latitude' => $this->faker->latitude(-8.5, -5.0),
            'longitude' => $this->faker->longitude(118.0, 122.0),

            'luas_bangunan' => $this->faker->randomFloat(2, 40, 300),
            'luas_kelebihan_tanah' => $this->faker->randomFloat(2, 0, 50),
            'parkiran' => $this->faker->randomElement(['1 mobil', '2 mobil', 'tidak ada']),
            'dapur' => $this->faker->randomElement(['terbuka', 'tertutup']),
            'jumlah_kamar_tidur' => $this->faker->numberBetween(1, 5),
            'jumlah_kamar_mandi' => $this->faker->numberBetween(1, 3),
            'lantai' => $this->faker->numberBetween(1, 3),
            'tahun_bangun' => $this->faker->year(),

            'fasilitas_tambahan' => $this->faker->optional()->sentence(),
            'tipe_pembayaran' => $this->faker->randomElement(['cash', 'kredit', 'keduanya']),
            'is_favorit' => $this->faker->boolean(10), // 10% favorit
            'tanggal_tersedia' => $this->faker->date(),

            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
