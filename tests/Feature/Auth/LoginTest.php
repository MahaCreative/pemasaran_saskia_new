<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Database\Factories\PelangganFactory;
use Database\Factories\MarketingFactory;
use Database\Factories\ManagerFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function calon_pelanggan_can_login()
    {
        // Create a calon_pelanggan user using the factory
        $user = PelangganFactory::new()->state([
            'name' => 'Calon Pembeli',
            'email' => 'calon_pembeli@gmail.com',
            'role' => 'calon_pelanggan',
        ])->create();

        // Attempt to login
        $response = $this->post('/login', [
            'email' => 'calon_pembeli@gmail.com',
            'password' => 'password123', // Common password used in factories
        ]);

        // Assert that the user is redirected to the dashboard
        $response->assertRedirect('/dashboard');

        // Assert that the user is authenticated
        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function marketing_can_login()
    {
        // Create a marketing user using the factory
        $user = MarketingFactory::new()->state([
            'name' => 'Marketing',
            'email' => 'marketing@gmail.com',
            'role' => 'marketing',
        ])->create();

        // Attempt to login
        $response = $this->post('/login', [
            'email' => 'marketing@gmail.com',
            'password' => 'password123', // Common password used in factories
        ]);

        // Assert that the user is redirected to the dashboard
        $response->assertRedirect('/dashboard');

        // Assert that the user is authenticated
        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function manager_can_login()
    {
        // Create a manager user using the factory
        $user = ManagerFactory::new()->state([
            'name' => 'Manager',
            'email' => 'manager@gmail.com',
            'role' => 'manager',
        ])->create();

        // Attempt to login
        $response = $this->post('/login', [
            'email' => 'manager@gmail.com',
            'password' => 'password123', // Common password used in factories
        ]);

        // Assert that the user is redirected to the dashboard
        $response->assertRedirect('/dashboard');

        // Assert that the user is authenticated
        $this->assertAuthenticatedAs($user);
    }
}
