import ResponseAlert from "@/Hooks/ResponseAlert";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register() {
    const { showResponse } = ResponseAlert();
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Sukses",
                    "Berhasil melakukan pendaftaran akun"
                );
                setSent(true);
            },
            onError: () => {
                showResponse("error", "Gagal", "Periksa kembali isian anda");
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-500">
            <Head title="Register" />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center mb-2">
                        <svg
                            className="h-12 w-12 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-green-700">
                        Daftar Akun Baru
                    </h2>
                    <p className="text-sm text-gray-500">
                        Macinna House Property Management System
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Nama lengkap"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Email"
                            />
                            {errors.email && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700">
                                No. WhatsApp{" "}
                            </label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="w-full px-3 py-2 border rounded"
                                placeholder="08xxxxxxxxxx"
                            />
                            {errors.phone && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.phone}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Password"
                        />
                        {errors.password && (
                            <div className="text-red-500 text-xs mt-1">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Konfirmasi Password
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Konfirmasi Password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
                    >
                        Daftar
                    </button>
                </form>
                <div className="flex justify-between mt-4 text-sm">
                    <Link
                        href={route("login")}
                        className="text-green-700 hover:underline"
                    >
                        Sudah punya akun? Masuk
                    </Link>
                </div>
                {sent && (
                    <div className="mt-4 text-green-600 text-center text-sm">
                        OTP telah dikirim ke email/WA Anda.
                    </div>
                )}
            </div>
        </div>
    );
}
// ...existing code...
