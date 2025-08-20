import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function PermintaanPembelianRevisiList({ auth, permintaans }) {
    const [searchTerm, setSearchTerm] = useState("");

    const [statusPermintaanFilter, setStatusPermintaanFilter] = useState("");

    // Filter data
    const filteredPermintaans = permintaans.filter((permintaan) => {
        const matchesSearch = permintaan.user.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesPermintaan = statusPermintaanFilter
            ? permintaan.status === statusPermintaanFilter
            : true;
        return matchesSearch && matchesPermintaan;
    });

    const getStatusPermintaanColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-50 text-yellow-700 border border-yellow-200";
            case "disetujui":
                return "bg-green-50 text-green-700 border border-green-200";
            case "ditolak":
                return "bg-red-50 text-red-700 border border-red-200";
            default:
                return "bg-gray-50 text-gray-700 border border-gray-200";
        }
    };

    return (
        <AuthLayout title="Kelola Permintaan Pembelian">
            <div className="px-4 md:px-8 lg:px-16 py-8 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Kelola Permintaan Pembelian
                    </h1>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Cari Pelanggan
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama pelanggan..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Status Permintaan
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={statusPermintaanFilter}
                                onChange={(e) =>
                                    setStatusPermintaanFilter(e.target.value)
                                }
                            >
                                <option value="">Semua</option>
                                <option value="pending">Pending</option>
                                <option value="disetujui">Disetujui</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tabel */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        "Pelanggan",
                                        "Rumah",
                                        "Total Harga",
                                        "Uang Muka",
                                        "Sisa Pembayaran",
                                        "Cicilan / Bunga",
                                        "Tgl Pengajuan",
                                        "Status",
                                        "Aksi",
                                    ].map((header) => (
                                        <th
                                            key={header}
                                            className="px-4 py-3 text-left font-semibold text-gray-500"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPermintaans.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="10"
                                            className="px-6 py-4 text-center text-gray-500"
                                        >
                                            Tidak ada permintaan pembelian
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPermintaans.map((p) => (
                                        <tr
                                            key={p.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-4">
                                                <div className="font-medium">
                                                    {p.user.name}
                                                </div>
                                                <div className="text-gray-500 text-xs">
                                                    {p.user.email}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                {p.rumah.nama_rumah}
                                            </td>
                                            <td className="px-4 py-4 font-semibold text-green-600">
                                                Rp{" "}
                                                {p.total_harga_rumah.toLocaleString(
                                                    "id-ID"
                                                )}
                                            </td>
                                            <td className="px-4 py-4">
                                                {p.uang_muka
                                                    ? "Rp " +
                                                      p.uang_muka.toLocaleString(
                                                          "id-ID"
                                                      )
                                                    : "-"}
                                            </td>
                                            <td className="px-4 py-4">
                                                {p.sisa_pembayaran
                                                    ? "Rp " +
                                                      p.sisa_pembayaran.toLocaleString(
                                                          "id-ID"
                                                      )
                                                    : "-"}
                                            </td>
                                            <td className="px-4 py-4">
                                                Rp{" "}
                                                {p.jumlah_cicilan_per_bulan.toLocaleString(
                                                    "id-ID"
                                                )}
                                            </td>
                                            <td className="px-4 py-4">
                                                {p.tanggal_pengajuan}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusPermintaanColor(
                                                        p.status
                                                    )}`}
                                                >
                                                    {p.status}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-center">
                                                <Link
                                                    href={route(
                                                        "marketing.permintaan_pembelian.show",
                                                        p.id
                                                    )}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Lihat
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
