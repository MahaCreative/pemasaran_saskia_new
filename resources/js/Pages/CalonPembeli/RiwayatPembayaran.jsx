import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";

import { formatRupiah } from "@/Hooks/FormatRupiah";
import AuthLayout from "@/Layouts/AuthLayout";

export default function RiwayatPembayaran() {
    const [pembayaran, setPembayaran] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Fetch data pembayaran
    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (startDate) params.append("start_date", startDate);
            if (endDate) params.append("end_date", endDate);

            const response = await fetch(`/riwayat-pembayaran/data?${params}`);
            const data = await response.json();
            setPembayaran(data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData();
    };

    const resetFilter = () => {
        setStartDate("");
        setEndDate("");
        fetchData();
    };

    return (
        <AuthLayout>
            <Head title="Riwayat Pembayaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">
                                Riwayat Pembayaran
                            </h2>

                            {/* Form Pencarian */}
                            <form
                                onSubmit={handleSearch}
                                className="mb-6 bg-gray-50 p-4 rounded-lg"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tanggal Mulai
                                        </label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) =>
                                                setStartDate(e.target.value)
                                            }
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tanggal Akhir
                                        </label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) =>
                                                setEndDate(e.target.value)
                                            }
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                        >
                                            Cari
                                        </button>
                                        <button
                                            type="button"
                                            onClick={resetFilter}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Tabel Data */}
                            <div className="overflow-x-auto">
                                {loading ? (
                                    <div className="text-center py-4">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                                        <p className="mt-2 text-gray-600">
                                            Memuat data...
                                        </p>
                                    </div>
                                ) : pembayaran.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">
                                            Tidak ada data pembayaran yang
                                            ditemukan.
                                        </p>
                                    </div>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    No. Invoice
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Rumah
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tipe Rumah
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Jumlah Pembayaran
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tanggal
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Metode
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {pembayaran.map((item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {item.nomor_invoice}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.rumah}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.tipe_rumah}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatRupiah(
                                                            item.jumlah_pembayaran
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {new Date(
                                                            item.tanggal_pembayaran
                                                        ).toLocaleDateString(
                                                            "id-ID"
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.metode_pembayaran}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                item.status ===
                                                                "terverifikasi"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                        >
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
