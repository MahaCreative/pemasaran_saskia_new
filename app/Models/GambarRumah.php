<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GambarRumah extends Model
{
    use HasFactory;

    protected $fillable = [
        'rumah_id',
        'nama_gambar',
        'path',
    ];

    protected $casts = [
        'rumah_id' => 'integer',
    ];

    public function rumah()
    {
        return $this->belongsTo(Rumah::class);
    }
}
