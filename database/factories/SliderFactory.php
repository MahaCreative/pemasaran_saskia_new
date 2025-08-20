<?php

namespace Database\Factories;

use App\Models\Slider;
use Illuminate\Database\Eloquent\Factories\Factory;

class SliderFactory extends Factory
{
    protected $model = Slider::class;

    public function definition()
    {
        return [
            'judul' => $this->faker->sentence(3),
            'deskripsi' => $this->faker->sentence(8),
            'gambar' => $this->faker->imageUrl(800, 400, 'house', true, 'Rumah'),
            'urutan' => $this->faker->unique()->numberBetween(1, 10),
        ];
    }
}
