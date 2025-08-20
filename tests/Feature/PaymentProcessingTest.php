<?php

namespace Tests\Feature;

use App\Models\PembayaranCicilan;
use App\Models\User;
use App\Models\PermintaanPembelian;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentProcessingTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_pembayaran_cicilan()
    {
        $user = User::factory()->create();
        $permintaan = PermintaanPembelian::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $data = [
            'permintaan_pembelian_id' => $permintaan->id,
            'jumlah_pembayaran' => 5000000,
            'tanggal_pembayaran' => now()->toDateString(),
            'metode_pembayaran' => 'transfer_bank',
            'bukti_pembayaran' => 'bukti123.jpg',
            'keterangan' => 'Pembayaran cicilan bulan pertama',
        ];

        $response = $this->post(route('pembayaran-cicilan.store'), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('pembayaran_cicilans', [
            'permintaan_pembelian_id' => $permintaan->id,
            'jumlah_pembayaran' => 5000000,
            'metode_pembayaran' => 'transfer_bank',
        ]);
    }

    public function test_user_can_view_payment_history()
    {
        $user = User::factory()->create();
        $permintaan = PermintaanPembelian::factory()->create(['user_id' => $user->id]);
        $payment = PembayaranCicilan::factory()->create([
            'permintaan_pembelian_id' => $permintaan->id,
        ]);

        $this->actingAs($user);

        $response = $this->get(route('pembayaran-cicilan.index'));
        $response->assertStatus(200);
    }

    public function test_admin_can_approve_payment()
    {
        $admin = User::factory()->create(['role' => 'manager']);
        $payment = PembayaranCicilan::factory()->create(['status' => 'pending']);

        $this->actingAs($admin);

        $response = $this->put(route('pembayaran-cicilan.approve', $payment->id));
        $response->assertRedirect();
        $this->assertDatabaseHas('pembayaran_cicilans', [
            'id' => $payment->id,
            'status' => 'disetujui',
        ]);
    }

    public function test_payment_calculation_is_correct()
    {
        $user = User::factory()->create();
        $permintaan = PermintaanPembelian::factory()->create([
            'user_id' => $user->id,
            'harga_rumah' => 500000000,
            'uang_muka' => 50000000,
            'jumlah_cicilan_per_bulan' => 5000000,
        ]);

        $this->actingAs($user);

        // Test total pembayaran calculation
        $this->assertEquals(450000000, $permintaan->sisa_pembayaran);
        $this->assertEquals(90, $permintaan->jangka_waktu);
    }
}
