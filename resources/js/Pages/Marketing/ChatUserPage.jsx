import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatDetail from "./ChatDetail";
import { usePage } from "@inertiajs/react";

export default function ChatUserPage() {
    const { userId } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Chat dengan Pelanggan
                </h1>
                <ChatDetail userId={userId} />
            </div>
        </AuthenticatedLayout>
    );
}
