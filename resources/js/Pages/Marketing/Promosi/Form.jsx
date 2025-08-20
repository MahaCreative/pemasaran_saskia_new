import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Head, Link } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function PromosiForm({ promosi }) {
    const isEdit = !!promosi;

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: promosi?.judul || "",
        deskripsi: promosi?.deskripsi || "",
        gambar: null,
        gambar_url: promosi?.gambar || null,
        periode_mulai: promosi?.periode_mulai || "",
        periode_selesai: promosi?.periode_selesai || "",
    });

    const [preview, setPreview] = useState(
        promosi?.gambar ? `/storage/${promosi.gambar}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("judul", data.judul);
        formData.append("deskripsi", data.deskripsi);
        formData.append("periode_mulai", data.periode_mulai);
        formData.append("periode_selesai", data.periode_selesai);

        if (data.gambar) {
            formData.append("gambar", data.gambar);
        }

        if (isEdit) {
            post(route("marketing.promosi.update", promosi.id), {
                data: formData,
                forceFormData: true,
            });
        } else {
            post(route("marketing.promosi.store"), {
                data: formData,
                forceFormData: true,
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("gambar", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData("gambar", null);
        setData("gambar_url", null);
        setPreview(null);
    };

    return (
        <AuthLayout>
            <Head title={isEdit ? "Edit Promosi" : "Tambah Promosi"} />

            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white">
                            {isEdit ? "Edit Promosi" : "Tambah Promosi Baru"}
                        </h1>
                        <p className="text-blue-100 mt-1">
                            {isEdit
                                ? "Perbarui informasi promosi"
                                : "Buat promosi baru untuk menarik calon pembeli"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Gambar Preview */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <InputLabel
                                    value="Gambar Promosi"
                                    className="mb-2"
                                />
                                <div className="relative">
                                    {preview ? (
                                        <div className="relative group">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                            <div className="text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Upload gambar promosi
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    <InputError
                                        message={errors.gambar}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Judul */}
                                <div>
                                    <InputLabel
                                        value="Judul Promosi"
                                        required
                                    />
                                    <TextInput
                                        value={data.judul}
                                        onChange={(e) =>
                                            setData("judul", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.judul}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Periode */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            value="Periode Mulai"
                                            required
                                        />
                                        <TextInput
                                            type="date"
                                            value={data.periode_mulai}
                                            onChange={(e) =>
                                                setData(
                                                    "periode_mulai",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.periode_mulai}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            value="Periode Selesai"
                                            required
                                        />
                                        <TextInput
                                            type="date"
                                            value={data.periode_selesai}
                                            onChange={(e) =>
                                                setData(
                                                    "periode_selesai",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.periode_selesai}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <InputLabel value="Deskripsi Promosi" />
                            <ReactQuill
                                theme="snow"
                                value={data.deskripsi}
                                onChange={(val) => setData("deskripsi", val)}
                                className="bg-white"
                            />
                            <InputError
                                message={errors.deskripsi}
                                className="mt-2"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                            <Link
                                href={route("marketing.promosi.index")}
                                className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                            >
                                Batal
                            </Link>
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing
                                    ? "Menyimpan..."
                                    : isEdit
                                    ? "Perbarui Promosi"
                                    : "Simpan Promosi"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}
