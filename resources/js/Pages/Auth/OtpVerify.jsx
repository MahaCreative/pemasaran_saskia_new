import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";

export default function OtpVerify({ phone }) {
    const { data, setData, post, processing, errors } = useForm({
        phone: phone || "",
        otp: "",
    });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("otp.verify"));
    };

    const handleResendOtp = () => {
        // Kirim ulang OTP ke backend by phone
        post(route("forgot-password"), {
            data: { phone: data.phone },
            preserveScroll: true,
            onSuccess: () => setSent(true),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-500">
            <Head title="Verifikasi OTP" />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                    Verifikasi OTP
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">
                            No. WhatsApp
                        </label>
                        <input
                            type="text"
                            value={data.phone}
                            disabled
                            className="w-full px-3 py-2 border rounded bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Kode OTP</label>
                        <input
                            type="text"
                            value={data.otp}
                            onChange={(e) => setData("otp", e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Masukkan kode OTP"
                        />
                        {errors.otp && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.otp}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
                    >
                        Verifikasi
                    </button>
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-green-700 font-semibold py-2 rounded transition"
                    >
                        Kirim Ulang OTP
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-500">
                    Kode OTP berlaku selama 5 menit.
                    <br />
                    {sent && (
                        <span className="text-green-600">
                            OTP baru telah dikirim!
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
