import React, { useState, useEffect, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useParams } from "react-router-dom";

export default function ChatDetail() {
    const { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [userId]);

    const fetchMessages = () => {
        fetch(`/marketing/chat/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
                scrollToBottom();
            })
            .catch((err) => console.error(err));
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        Inertia.post(
            "/chat/send",
            { message: input },
            {
                onSuccess: () => {
                    setInput("");
                    fetchMessages();
                },
            }
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-4 flex flex-col h-screen">
            <h2 className="text-2xl font-semibold mb-4">
                Chat dengan Pelanggan
            </h2>
            <div className="flex-1 overflow-y-auto border border-gray-300 rounded p-4 mb-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`mb-2 ${
                            msg.user_id === window.Laravel.user.id
                                ? "text-right"
                                : "text-left"
                        }`}
                    >
                        <div
                            className={`inline-block px-3 py-2 rounded ${
                                msg.user_id === window.Laravel.user.id
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {msg.message}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="flex">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 mr-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tulis pesan..."
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Kirim
                </button>
            </form>
        </div>
    );
}
