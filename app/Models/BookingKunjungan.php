<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingKunjungan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'rumah_id',
        'jadwal_kunjungan',
        'status',
        'catatan',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'rumah_id' => 'integer',
        'jadwal_kunjungan' => 'datetime',
    ];

    // Relasi ke User (pelanggan)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Rumah
    public function rumah()
    {
        return $this->belongsTo(Rumah::class);
    }

    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }
}
