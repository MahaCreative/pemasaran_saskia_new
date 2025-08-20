<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register()
    {
        $data = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'no_telepon' => '081234567890',
            'alamat' => 'Jl. Test No. 123',
            'role' => 'pelanggan',
        ];

        $response = $this->post(route('register'), $data);

        $response->assertRedirect(route('dashboard'));
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'role' => 'pelanggan',
        ]);
    }

    public function test_user_can_login()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123'),
        ]);

        $response = $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticatedAs($user);
    }

    public function test_user_can_update_profile()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $data = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'no_telepon' => '081234567899',
            'alamat' => 'Jl. Updated No. 456',
        ];

        $response = $this->put(route('profile.update'), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);
    }

    public function test_user_can_logout()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post(route('logout'));
        $response->assertRedirect('/');
        $this->assertGuest();
    }
}
