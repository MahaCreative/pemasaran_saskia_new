<?php

namespace Database\Factories;

use App\Models\GambarRumah;
use App\Models\Rumah;
use Illuminate\Database\Eloquent\Factories\Factory;

class GambarRumahFactory extends Factory
{
    protected $model = GambarRumah::class;

    public function definition()
    {
        return [
            'rumah_id' => Rumah::factory(),
            'nama_gambar' => $this->faker->words(2, true),
            'path' => $this->faker->imageUrl(640, 480, 'house', true, 'Rumah'),
        ];
    }
}
