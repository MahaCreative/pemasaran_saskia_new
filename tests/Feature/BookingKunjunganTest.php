<?php

namespace Tests\Feature;

use App\Models\BookingKunjungan;
use App\Models\User;
use App\Models\Rumah;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingKunjunganTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_booking_kunjungan()
    {
        $user = User::factory()->create();
        $rumah = Rumah::factory()->create();

        $this->actingAs($user);

        $data = [
            'rumah_id' => $rumah->id,
            'tanggal_kunjungan' => now()->addDay()->toDateString(),
            'jam_kunjungan' => '14:00',
            'jumlah_orang' => 2,
            'catatan' => 'Ingin melihat rumah tipe A',
        ];

        $response = $this->post(route('booking-kunjungan.store'), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('booking_kunjungan', [
            'rumah_id' => $rumah->id,
            'user_id' => $user->id,
            'jumlah_orang' => 2,
        ]);
    }

    public function test_user_can_view_booking_kunjungan()
    {
        $user = User::factory()->create();
        $booking = BookingKunjungan::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->get(route('booking-kunjungan.show', $booking->id));
        $response->assertStatus(200);
    }

    public function test_user_can_cancel_booking_kunjungan()
    {
        $user = User::factory()->create();
        $booking = BookingKunjungan::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->put(route('booking-kunjungan.cancel', $booking->id));
        $response->assertRedirect();
        $this->assertDatabaseHas('booking_kunjungan', [
            'id' => $booking->id,
            'status' => 'dibatalkan',
        ]);
    }
}
