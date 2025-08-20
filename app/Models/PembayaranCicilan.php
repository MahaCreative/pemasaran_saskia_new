<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PembayaranCicilan extends Model
{
    use HasFactory;

    protected $guarded = [];
    public function permintaanPembelian()
    {
        return $this->belongsTo(PermintaanPembelian::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }
}
