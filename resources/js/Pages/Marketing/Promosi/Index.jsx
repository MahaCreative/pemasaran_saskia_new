import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function PromosiIndex() {
    const { promosis } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus promosi ini?")) {
            router.delete(route("marketing.promosi.destroy", id));
        }
    };

    return (
        <AuthLayout>
            <Head title="Daftar Promosi" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Promosi
                    </h1>
                    <Link
                        href={route("marketing.promosi.create")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Tambah Promosi
                    </Link>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Judul
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Periode
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gambar
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {promosis.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        Tidak ada data promosi.
                                    </td>
                                </tr>
                            )}
                            {promosis.data.map((promosi) => (
                                <tr key={promosi.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {promosi.judul}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(
                                            promosi.periode_mulai
                                        ).toLocaleDateString()}{" "}
                                        -{" "}
                                        {new Date(
                                            promosi.periode_selesai
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {promosi.gambar ? (
                                            <img
                                                src={`/storage/${promosi.gambar}`}
                                                alt={promosi.judul}
                                                className="h-16 w-24 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400">
                                                Tidak ada gambar
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <Link
                                            href={route(
                                                "marketing.promosi.edit",
                                                promosi.id
                                            )}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit {String(promosi.id)}
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(promosi.id)
                                            }
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
                        <div>
                            Menampilkan {promosis.from} sampai {promosis.to}{" "}
                            dari {promosis.total} data
                        </div>
                        <div className="space-x-2">
                            {promosis.prev_page_url && (
                                <button
                                    onClick={() =>
                                        (window.location.href =
                                            promosis.prev_page_url)
                                    }
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Sebelumnya
                                </button>
                            )}
                            {promosis.next_page_url && (
                                <button
                                    onClick={() =>
                                        (window.location.href =
                                            promosis.next_page_url)
                                    }
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Berikutnya
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
