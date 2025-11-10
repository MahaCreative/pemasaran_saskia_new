import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import InputText from "@/Components/Form/InputText";
import ResponseAlert from "@/Hooks/ResponseAlert";
import AuthLayout from "@/Layouts/AuthLayout";

export default function KantorProfile({ auth, profile }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_kantor: profile?.nama_kantor || "",
        alamat: profile?.alamat || "",
        telepon: profile?.telepon || "",
        email: profile?.email || "",
        website: profile?.website || "",
        deskripsi: profile?.deskripsi || "",
        logo: null,
        foto_pemilik: null,
        foto_kantor: null,
    });

    const [previewLogo, setPreviewLogo] = useState(
        profile?.logo ? `/storage/${profile.logo}` : null
    );
    const [previewPimpinan, setPreviewPimpinan] = useState(
        profile?.foto_pemilik ? `/storage/${profile.foto_pemilik}` : null
    );
    const [previewKantor, setPreviewKantor] = useState(
        profile?.foto_kantor ? `/storage/${profile.foto_kantor}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("manager.kantor-profile.store"), {
            preserveScroll: true,
            onSuccess: () => {
                ResponseAlert(
                    "success",
                    "Berhasil!",
                    "Profil kantor berhasil diperbarui"
                );
            },
        });
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === "logo") {
                    setPreviewLogo(reader.result);
                    setData("logo", file);
                } else if (type === "foto_pemilik") {
                    setPreviewPimpinan(reader.result);
                    setData("foto_pemilik", file);
                } else if (type === "foto_kantor") {
                    setPreviewKantor(reader.result);
                    setData("foto_kantor", file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthLayout title={"Profile Kantor"}>
            <Head title="Profil Kantor" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                            <h1 className="text-3xl font-bold mb-2">
                                Profil Kantor
                            </h1>
                            <p className="text-blue-100">
                                Kelola informasi dan identitas kantor Anda
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Informasi */}
                                <section>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        Informasi Kantor
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputText
                                            label="Nama Kantor"
                                            value={data.nama_kantor}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_kantor",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.nama_kantor}
                                            required
                                        />
                                        <InputText
                                            label="Email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            error={errors.email}
                                            required
                                        />
                                        <InputText
                                            label="Telepon"
                                            type="tel"
                                            value={data.telepon}
                                            onChange={(e) =>
                                                setData(
                                                    "telepon",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.telepon}
                                            required
                                        />
                                        <InputText
                                            label="Website"
                                            type="url"
                                            value={data.website}
                                            onChange={(e) =>
                                                setData(
                                                    "website",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.website}
                                        />
                                    </div>

                                    {/* Alamat */}
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alamat Lengkap
                                        </label>
                                        <textarea
                                            value={data.alamat}
                                            onChange={(e) =>
                                                setData(
                                                    "alamat",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            rows="3"
                                            placeholder="Masukkan alamat lengkap kantor"
                                        />
                                        {errors.alamat && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.alamat}
                                            </p>
                                        )}
                                    </div>

                                    {/* Deskripsi */}
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Deskripsi Kantor
                                        </label>
                                        <ReactQuill
                                            theme="snow"
                                            value={data.deskripsi}
                                            onChange={(val) =>
                                                setData("deskripsi", val)
                                            }
                                            className="bg-white"
                                        />
                                        {errors.deskripsi && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.deskripsi}
                                            </p>
                                        )}
                                    </div>
                                </section>

                                {/* Upload Logo & Foto */}
                                <section>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        Logo & Galeri Foto
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            {
                                                label: "Logo Kantor",
                                                preview: previewLogo,
                                                name: "logo",
                                            },
                                            {
                                                label: "Foto Pimpinan",
                                                preview: previewPimpinan,
                                                name: "foto_pemilik",
                                            },
                                            {
                                                label: "Foto Kantor",
                                                preview: previewKantor,
                                                name: "foto_kantor",
                                            },
                                        ].map(({ label, preview, name }) => (
                                            <div key={name}>
                                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                                    {label}
                                                </label>
                                                <div className="relative group">
                                                    {preview ? (
                                                        <img
                                                            src={preview}
                                                            alt={label}
                                                            className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                                                            <svg
                                                                className="mx-auto h-12 w-12 text-gray-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleImageChange(
                                                                e,
                                                                name
                                                            )
                                                        }
                                                        accept="image/*"
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                </div>
                                                {errors[`${name}`] && (
                                                    <p className="text-sm text-red-600 mt-1">
                                                        {errors[`${name}`]}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Submit */}
                                <div className="flex justify-end pt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                                    >
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan Perubahan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
