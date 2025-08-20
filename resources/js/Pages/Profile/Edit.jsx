import React, { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";

import AuthLayout from "@/Layouts/AuthLayout";

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: auth.user.name || "",
            email: auth.user.email || "",
            phone: auth.user.phone || "",
            address: auth.user.address || "",
        });

    const [passwordData, setPasswordData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [activeTab, setActiveTab] = useState("profile");

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        patch(route("password.update"), {
            data: passwordData,
            onSuccess: () =>
                setPasswordData({
                    current_password: "",
                    password: "",
                    password_confirmation: "",
                }),
        });
    };

    const handleAccountDeletion = () => {
        if (
            confirm(
                "Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan."
            )
        ) {
            router.delete(route("profile.destroy"));
        }
    };

    return (
        <AuthLayout>
            <Head title="Update Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                                Update Profile
                            </h1>

                            {/* Tab Navigation */}
                            <div className="border-b border-gray-200 mb-6">
                                <nav className="-mb-px flex space-x-8">
                                    <button
                                        onClick={() => setActiveTab("profile")}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === "profile"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                    >
                                        Informasi Profile
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("password")}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === "password"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                    >
                                        Update Password
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("delete")}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === "delete"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                    >
                                        Hapus Akun
                                    </button>
                                </nav>
                            </div>

                            {/* Profile Update Form */}
                            {activeTab === "profile" && (
                                <form
                                    onSubmit={handleProfileUpdate}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            required
                                        />
                                        {errors.name && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            required
                                        />
                                        {errors.email && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Nomor Telepon
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        />
                                        {errors.phone && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.phone}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Alamat
                                        </label>
                                        <textarea
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        />
                                        {errors.address && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.address}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                        >
                                            {processing
                                                ? "Menyimpan..."
                                                : "Simpan Perubahan"}
                                        </button>

                                        {recentlySuccessful && (
                                            <p className="text-sm text-gray-600">
                                                Tersimpan.
                                            </p>
                                        )}
                                    </div>
                                </form>
                            )}

                            {/* Password Update Form */}
                            {activeTab === "password" && (
                                <form
                                    onSubmit={handlePasswordUpdate}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Password Saat Ini
                                        </label>
                                        <input
                                            type="password"
                                            value={
                                                passwordData.current_password
                                            }
                                            onChange={(e) =>
                                                setPasswordData({
                                                    ...passwordData,
                                                    current_password:
                                                        e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            required
                                        />
                                        {errors.current_password && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.current_password}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Password Baru
                                        </label>
                                        <input
                                            type="password"
                                            value={passwordData.password}
                                            onChange={(e) =>
                                                setPasswordData({
                                                    ...passwordData,
                                                    password: e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            required
                                        />
                                        {errors.password && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Konfirmasi Password Baru
                                        </label>
                                        <input
                                            type="password"
                                            value={
                                                passwordData.password_confirmation
                                            }
                                            onChange={(e) =>
                                                setPasswordData({
                                                    ...passwordData,
                                                    password_confirmation:
                                                        e.target.value,
                                                })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            required
                                        />
                                        {errors.password_confirmation && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.password_confirmation}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Update Password
                                        </button>

                                        {recentlySuccessful && (
                                            <p className="text-sm text-gray-600">
                                                Password berhasil diperbarui.
                                            </p>
                                        )}
                                    </div>
                                </form>
                            )}

                            {/* Account Deletion Section */}
                            {activeTab === "delete" && (
                                <div className="space-y-6">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                        <h3 className="text-lg font-medium text-red-900 mb-2">
                                            Hapus Akun
                                        </h3>
                                        <p className="text-sm text-red-700 mb-4">
                                            Setelah akun Anda dihapus, semua
                                            data dan sumber daya akan dihapus
                                            secara permanen. Silakan unduh data
                                            yang ingin Anda simpan sebelum
                                            menghapus akun.
                                        </p>

                                        <button
                                            onClick={handleAccountDeletion}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Hapus Akun
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
