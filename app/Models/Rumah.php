<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rumah extends Model
{
    use HasFactory;

    protected $guarded = [];
    public function gambars()
    {
        return $this->hasMany(GambarRumah::class);
    }

    public function tipe()
    {
        return $this->belongsTo(TipeRumah::class, 'tipe_id');
    }
}
