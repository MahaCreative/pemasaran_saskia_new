<?php

namespace Database\Factories;

use App\Models\TipeRumah;
use Illuminate\Database\Eloquent\Factories\Factory;

class TipeRumahFactory extends Factory
{
    protected $model = TipeRumah::class;

    public function definition()
    {
        return [
            'nama_tipe' => $this->faker->randomElement(['36', '45', '54', '70', '90']),
            'deskripsi' => $this->faker->sentence(8),
        ];
    }
}
