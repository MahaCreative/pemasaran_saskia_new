<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipeRumah extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_tipe',
        'deskripsi',
    ];

    public function rumahs()
    {
        return $this->hasMany(Rumah::class, 'tipe_id');
    }
}
