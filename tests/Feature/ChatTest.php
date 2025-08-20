<?php

namespace Tests\Feature;

use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatTest extends TestCase
{
    use RefreshDatabase;

    public function test_pelanggan_can_send_and_receive_messages()
    {
        $user = User::factory()->create(['role' => 'pelanggan']);
        $this->actingAs($user);

        // Send message
        $response = $this->post('/chat/send', ['message' => 'Halo, saya ingin bertanya']);
        $response->assertStatus(201);
        $this->assertDatabaseHas('chat_messages', [
            'user_id' => $user->id,
            'message' => 'Halo, saya ingin bertanya',
        ]);

        // Get messages
        $response = $this->get('/chat/messages');
        $response->assertStatus(200);
        $response->assertJsonFragment(['message' => 'Halo, saya ingin bertanya']);
    }

    public function test_marketing_can_list_unresolved_chats()
    {
        $marketing = User::factory()->create(['role' => 'marketing']);
        $pelanggan = User::factory()->create(['role' => 'pelanggan']);

        ChatMessage::factory()->create(['user_id' => $pelanggan->id, 'message' => 'Pertanyaan 1']);
        ChatMessage::factory()->create(['user_id' => $pelanggan->id, 'message' => 'Pertanyaan 2']);

        $this->actingAs($marketing);

        $response = $this->get('/marketing/chat/unresolved');
        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $pelanggan->id]);
    }

    public function test_marketing_can_view_chat_messages_by_user()
    {
        $marketing = User::factory()->create(['role' => 'marketing']);
        $pelanggan = User::factory()->create(['role' => 'pelanggan']);

        ChatMessage::factory()->create(['user_id' => $pelanggan->id, 'message' => 'Pertanyaan 1']);
        ChatMessage::factory()->create(['user_id' => $pelanggan->id, 'message' => 'Pertanyaan 2']);

        $this->actingAs($marketing);

        $response = $this->get("/marketing/chat/{$pelanggan->id}");
        $response->assertStatus(200);
        $response->assertJsonFragment(['message' => 'Pertanyaan 1']);
        $response->assertJsonFragment(['message' => 'Pertanyaan 2']);
    }

    public function test_guest_cannot_access_chat_routes()
    {
        $response = $this->get('/chat/messages');
        $response->assertRedirect('/login');

        $response = $this->post('/chat/send', ['message' => 'Test']);
        $response->assertRedirect('/login');

        $response = $this->get('/marketing/chat/unresolved');
        $response->assertRedirect('/login');

        $response = $this->get('/marketing/chat/1');
        $response->assertRedirect('/login');
    }
}
