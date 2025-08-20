import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        phone: "",
    });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("forgot-password"), {
            onSuccess: () => setSent(true),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-500">
            <Head title="Lupa Password" />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                    Lupa Password
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">WhatsApp </label>
                        <input
                            type="number"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Masukkan Nomor WhatsaApp Anda"
                        />
                        {errors.phone && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.phone}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
                    >
                        Kirim OTP
                    </button>
                </form>
                {sent && (
                    <div className="mt-4 text-green-600 text-center text-sm">
                        OTP telah dikirim ke WhatsApp Anda.
                    </div>
                )}
            </div>
        </div>
    );
}
