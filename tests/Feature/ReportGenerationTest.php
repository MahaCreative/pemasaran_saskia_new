<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\PermintaanPembelian;
use App\Models\BookingKunjungan;
use App\Models\PembayaranCicilan;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportGenerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_view_laporan_permintaan_pembelian()
    {
        $manager = User::factory()->create(['role' => 'manager']);
        $permintaan = PermintaanPembelian::factory()->count(5)->create();

        $this->actingAs($manager);

        $response = $this->get(route('manager.laporan.permintaan-pembelian'));
        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->component('Manager/LaporanPermintaanPembelian'));
    }

    public function test_manager_can_filter_reports_by_date()
    {
        $manager = User::factory()->create(['role' => 'manager']);

        $this->actingAs($manager);

        $startDate = now()->subMonth()->toDateString();
        $endDate = now()->toDateString();

        $response = $this->get(route('manager.laporan.permintaan-pembelian', [
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]));

        $response->assertStatus(200);
    }

    public function test_manager_can_export_reports()
    {
        $manager = User::factory()->create(['role' => 'manager']);
        PermintaanPembelian::factory()->count(10)->create();

        $this->actingAs($manager);

        $response = $this->get(route('manager.laporan.permintaan-pembelian.export'));
        $response->assertStatus(200);
        $response->assertHeader('content-type', 'application/pdf');
    }

    public function test_report_shows_correct_statistics()
    {
        $manager = User::factory()->create(['role' => 'manager']);

        // Create test data
        PermintaanPembelian::factory()->count(5)->create(['status' => 'pending']);
        PermintaanPembelian::factory()->count(3)->create(['status' => 'disetujui']);
        PermintaanPembelian::factory()->count(2)->create(['status' => 'ditolak']);

        BookingKunjungan::factory()->count(8)->create();
        PembayaranCicilan::factory()->count(15)->create();

        $this->actingAs($manager);

        $response = $this->get(route('manager.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('Manager/Dashboard')
                ->has('totalPermintaan', 10)
                ->has('totalBooking', 8)
                ->has('totalPembayaran', 15)
        );
    }

    public function test_non_manager_cannot_access_reports()
    {
        $user = User::factory()->create(['role' => 'pelanggan']);

        $this->actingAs($user);

        $response = $this->get(route('manager.laporan.permintaan-pembelian'));
        $response->assertForbidden();
    }
}
