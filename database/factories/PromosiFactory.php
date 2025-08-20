<?php

namespace Database\Factories;

use App\Models\Promosi;
use Illuminate\Database\Eloquent\Factories\Factory;

class PromosiFactory extends Factory
{
    protected $model = Promosi::class;

    public function definition()
    {
        $start = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $end = (clone $start)->modify('+' . rand(3, 15) . ' days');
        return [
            'judul' => $this->faker->sentence(3),
            'deskripsi' => $this->faker->paragraph,
            'gambar' => $this->faker->imageUrl(800, 400, 'house', true, 'Promo'),
            'periode_mulai' => $start->format('Y-m-d'),
            'periode_selesai' => $end->format('Y-m-d'),
        ];
    }
}
