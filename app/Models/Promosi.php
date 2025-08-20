<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promosi extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'judul',
        'deskripsi',
        'gambar',
        'periode_mulai',
        'periode_selesai',
    ];

    protected $casts = [
        'periode_mulai' => 'date',
        'periode_selesai' => 'date',
    ];
}
