import React, { useState, useEffect } from "react";
import { Head, usePage, router } from "@inertiajs/react";

import AuthLayout from "@/Layouts/AuthLayout";

export default function LaporanPembayaranCicilan() {
    const { pembayarans, users, filters } = usePage().props;
    const [data, setData] = useState(pembayarans || []);
    const [loading, setLoading] = useState(false);
    const [filterData, setFilterData] = useState({
        metode_pembayaran: filters.metode_pembayaran || "",
        user_id: filters.user_id || "",
        petugas_id: filters.petugas_id || "",
        tanggal_mulai: filters.tanggal_mulai || "",
        tanggal_selesai: filters.tanggal_selesai || "",
    });

    const handleFilter = (e) => {
        e.preventDefault();
        setLoading(true);
        router.get("/manager/laporan/pembayaran-cicilan", filterData, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    };

    const handleExport = (type) => {
        const params = new URLSearchParams(filterData);
        if (type === "pdf") {
            window.location.href = `/manager/laporan/pembayaran-cicilan?${params.toString()}&export_pdf=1`;
        } else {
            window.location.href = `/manager/laporan/pembayaran-cicilan?${params.toString()}&export_excel=1`;
        }
    };

    const resetFilters = () => {
        setFilterData({
            metode_pembayaran: "",
            user_id: "",
            petugas_id: "",
            tanggal_mulai: "",
            tanggal_selesai: "",
        });
        router.get("/manager/laporan/pembayaran-cicilan");
    };

    return (
        <AuthLayout>
            <Head title="Laporan Pembayaran Cicilan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                                Laporan Pembayaran Cicilan
                            </h1>

                            {/* Filter Section */}
                            <form
                                onSubmit={handleFilter}
                                className="mb-6 bg-gray-50 p-4 rounded-lg"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Metode Pembayaran
                                        </label>
                                        <select
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            value={filterData.metode_pembayaran}
                                            onChange={(e) =>
                                                setFilterData({
                                                    ...filterData,
                                                    metode_pembayaran:
                                                        e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">Semua</option>
                                            <option value="cash">Cash</option>
                                            <option value="transfer">
                                                Transfer
                                            </option>
                                            <option value="cicilan">
                                                Cicilan
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Pelanggan
                                        </label>
                                        <select
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            value={filterData.user_id}
                                            onChange={(e) =>
                                                setFilterData({
                                                    ...filterData,
                                                    user_id: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">
                                                Semua Pelanggan
                                            </option>
                                            {users.map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tanggal Mulai
                                        </label>
                                        <input
                                            type="date"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            value={filterData.tanggal_mulai}
                                            onChange={(e) =>
                                                setFilterData({
                                                    ...filterData,
                                                    tanggal_mulai:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tanggal Akhir
                                        </label>
                                        <input
                                            type="date"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            value={filterData.tanggal_selesai}
                                            onChange={(e) =>
                                                setFilterData({
                                                    ...filterData,
                                                    tanggal_selesai:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="flex items-end space-x-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                        >
                                            {loading ? "Loading..." : "Filter"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={resetFilters}
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => handleExport("pdf")}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Export PDF
                                    </button>
                                </div>
                            </form>

                            {/* Summary Section */}
                            <div className="mb-4 bg-blue-50 p-4 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            {data.length}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Total Transaksi
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">
                                            Rp{" "}
                                            {data
                                                .reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        parseInt(
                                                            item.jumlah_pembayaran ||
                                                                0
                                                        ),
                                                    0
                                                )
                                                .toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Total Nominal
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600">
                                            {
                                                data.filter(
                                                    (item) =>
                                                        item.status ===
                                                        "diterima"
                                                ).length
                                            }
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Diterima
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-purple-600">
                                            {
                                                data.filter(
                                                    (item) =>
                                                        item.status ===
                                                        "ditolak"
                                                ).length
                                            }
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Ditolak
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-orange-600">
                                            {
                                                data.filter(
                                                    (item) =>
                                                        item.status ===
                                                        "pending"
                                                ).length
                                            }
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Pending
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Table Section */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Pelanggan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Petugas
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Rumah
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Metode
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nominal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {loading ? (
                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="px-6 py-4 text-center text-gray-500"
                                                >
                                                    Loading...
                                                </td>
                                            </tr>
                                        ) : data.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="px-6 py-4 text-center text-gray-500"
                                                >
                                                    Tidak ada data pembayaran
                                                </td>
                                            </tr>
                                        ) : (
                                            data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {
                                                            item.tanggal_pembayaran
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-900">
                                                        {item
                                                            .permintaan_pembelian
                                                            ?.user?.name || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-900">
                                                        {item?.petugas?.name ||
                                                            "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item
                                                            .permintaan_pembelian
                                                            ?.rumah
                                                            ?.nama_rumah || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.metode_pembayaran}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        Rp{" "}
                                                        {parseInt(
                                                            item.jumlah_pembayaran ||
                                                                0
                                                        ).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                item.status ===
                                                                "diterima"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : item.status ===
                                                                      "pending"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                        >
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                                                            Detail
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
