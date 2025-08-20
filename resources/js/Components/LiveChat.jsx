import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function LiveChat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();

        window.Echo.channel("chat").listen("ChatMessageSent", (e) => {
            setMessages((prevMessages) => [...prevMessages, e]);
        });

        return () => {
            window.Echo.leaveChannel("chat");
        };
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get("/chat/messages");
            setMessages(response.data);
            scrollToBottom();
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        try {
            await axios.post("/chat/messages", { message: newMessage });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="live-chat border rounded p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Live Chat</h2>
            <div className="messages h-64 overflow-y-auto mb-4 border p-2 rounded bg-white">
                {messages.map((msg) => (
                    <div key={msg.id} className="mb-2">
                        <strong>{msg.user.name}:</strong> {msg.message}
                        <div className="text-xs text-gray-500">
                            {new Date(msg.created_at).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    className="flex-grow border rounded-l px-3 py-2"
                    placeholder="Tulis pesan..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r"
                >
                    Kirim
                </button>
            </form>
        </div>
    );
}
