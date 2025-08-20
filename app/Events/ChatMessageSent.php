<?php

namespace App\Events;

use App\Models\ChatMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $chatMessage;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(ChatMessage $chatMessage)
    {
        $this->chatMessage = $chatMessage;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('chat');
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->chatMessage->id,
            'user_id' => $this->chatMessage->user_id,
            'message' => $this->chatMessage->message,
            'created_at' => $this->chatMessage->created_at->toDateTimeString(),
            'user' => [
                'id' => $this->chatMessage->user->id,
                'name' => $this->chatMessage->user->name,
            ],
        ];
    }
}
