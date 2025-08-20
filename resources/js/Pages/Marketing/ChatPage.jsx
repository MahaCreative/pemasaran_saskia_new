import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatList from "./ChatList";

export default function ChatPage({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Chat Marketing</h1>
                <ChatList />
            </div>
        </AuthenticatedLayout>
    );
}
