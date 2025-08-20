import React, { useState, useEffect, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function PelangganChat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // polling setiap 3 detik
        return () => clearInterval(interval);
    }, []);

    const fetchMessages = () => {
        fetch("/chat/messages")
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
        <div className="fixed bottom-5 right-5 w-80 bg-white border border-gray-300 rounded shadow-lg flex flex-col">
            <div className="bg-blue-600 text-white p-3 font-semibold rounded-t">
                Chat Pelanggan
            </div>
            <div className="flex-1 p-3 overflow-y-auto h-64">
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
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {msg.message}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form
                onSubmit={handleSend}
                className="p-3 border-t border-gray-300 flex"
            >
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded px-2 py-1 mr-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tulis pesan..."
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                    Kirim
                </button>
            </form>
        </div>
    );
}
