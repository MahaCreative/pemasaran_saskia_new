<?php

namespace Tests\Feature;

use App\Models\PermintaanPembelian;
use App\Models\Rumah;
use App\Models\User;
use Illuminate\Foundation\Testing\<thinking>
User confirmed to proceed with creating comprehensive PHPUnit tests for all identified data processes:
1. Permintaan Pembelian (Purchase Requests)
2. Pemesanan Pembelian (Purchase Orders)
3. Booking Kunjungan (Visit Bookings)
4. User Management (Authentication and roles)
5. Payment Processing (Installments)
6. Report Generation (Manager reports)

Next step:
- Create test files in tests/Feature or tests/Unit as appropriate.
- Write test cases covering CRUD, validation, business logic, and authorization where applicable.
- Focus on backend PHP tests using Laravel's testing framework.

I will start by creating a test file for PermintaanPembelian features as a sample and then proceed to others.
</thinking>

<create_file>
<path>tests/Feature/PermintaanPembelianTest.php</path>
<content>
<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\PermintaanPembelian;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PermintaanPembelianTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_permintaan_pembelian_routes()
    {
        $response = $this->get(route('marketing.permintaan_pembelian.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_view_permintaan_pembelian_index()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('marketing.permintaan_pembelian.index'));
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Marketing/PermintaanPembelian/PermintaanPembelianRevisiList'));
    }

    public function test_authenticated_user_can_update_permintaan_pembelian()
    {
        $user = User::factory()->create();
        $permintaan = PermintaanPembelian::factory()->create();

        $this->actingAs($user);

        $data = [
            'uang_muka' => 1000000,
            'jumlah_cicilan_per_bulan' => 500000,
            'jangka_waktu' => 12,
            'tanggal_pembayaran' => now()->addMonth()->toDateString(),
            'status' => 'pending',
            'catatan' => 'Test catatan',
            'alasan_penolakan' => null,
        ];

        $response = $this->post(route('marketing.permintaan_pembelian.update', $permintaan->id), $data);

        $response->assertRedirect(route('marketing.permintaan_pembelian.show', $permintaan->id));
        $this->assertDatabaseHas('permintaan_pembelians', [
            'id' => $permintaan->id,
            'uang_muka' => $data['uang_muka'],
            'jumlah_cicilan_per_bulan' => $data['jumlah_cicilan_per_bulan'],
            'jangka_waktu' => $data['jangka_waktu'],
            'status' => $data['status'],
        ]);
    }
}
