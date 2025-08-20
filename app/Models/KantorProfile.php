<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KantorProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_pemilik',
        'foto_pemilik',
        'nama_kantor',
        'foto_kantor',
        'logo',
        'alamat',
        'telepon',
        'email',
        'website',
        'deskripsi',
        'lat',
        'long',
    ];
}
