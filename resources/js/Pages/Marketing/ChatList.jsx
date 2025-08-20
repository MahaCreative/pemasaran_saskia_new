import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function ChatList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUnresolvedChats();
    }, []);

    const fetchUnresolvedChats = () => {
        fetch("/marketing/chat/unresolved")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (users.length === 0) {
        return <div>Tidak ada chat yang belum selesai.</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Chat Belum Selesai</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="mb-2">
                        <a
                            href={`/marketing/chat/${user.id}`}
                            className="text-blue-600 hover:underline"
                        >
                            {user.name} ({user.email})
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
