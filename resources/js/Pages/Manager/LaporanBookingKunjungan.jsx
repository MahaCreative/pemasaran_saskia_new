import React, { useState } from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function LaporanBookingKunjungan({
    auth,
    bookings,
    filters,
    users,
}) {
    const { data, setData, post, processing } = useForm({
        status: filters.status || "",
        petugas_id: filters.petugas_id || "",
        tanggal_mulai: filters.tanggal_mulai || "",
        tanggal_selesai: filters.tanggal_selesai || "",
    });

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);
    };

    const handleFilter = (e) => {
        e.preventDefault();
        post(route("manager.laporan.booking-kunjungan"));
    };

    const handlePrint = () => {
        window.print();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "disetujui":
                return "bg-green-100 text-green-800";
            case "ditolak":
                return "bg-red-100 text-red-800";
            case "selesai":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <AuthLayout title="Laporan Booking Kunjungan">
            <div className="px-4 md:px-8 lg:px-16 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Laporan Booking Kunjungan
                    </h1>
                    <button
                        onClick={() => {
                            const params = new URLSearchParams({
                                status: data.status,
                                petugas_id: data.petugas_id,
                                tanggal_mulai: data.tanggal_mulai,
                                tanggal_selesai: data.tanggal_selesai,
                                export_pdf: 1,
                            });
                            window.location.href =
                                route("manager.laporan.booking-kunjungan") +
                                "?" +
                                params.toString();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    >
                        Export PDF
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Filter Data</h2>
                    <form
                        onSubmit={handleFilter}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                            >
                                <option value="">Semua Status</option>
                                <option value="pending">Pending</option>
                                <option value="disetujui">Disetujui</option>
                                <option value="ditolak">Ditolak</option>
                                <option value="selesai">Selesai</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Petugas
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={data.petugas_id}
                                onChange={(e) =>
                                    setData("petugas_id", e.target.value)
                                }
                            >
                                <option value="">Semua Petugas</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Mulai
                            </label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={data.tanggal_mulai}
                                onChange={(e) =>
                                    setData("tanggal_mulai", e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Selesai
                            </label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={data.tanggal_selesai}
                                onChange={(e) =>
                                    setData("tanggal_selesai", e.target.value)
                                }
                            />
                        </div>

                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                            >
                                Filter
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pelanggan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rumah
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jadwal Kunjungan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Petugas
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-4 text-center text-gray-500"
                                        >
                                            Tidak ada data booking ditemukan
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {booking.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {booking.user.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {booking.rumah.nama_rumah}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {
                                                        booking.rumah.tipe
                                                            .nama_tipe
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(
                                                    booking.jadwal_kunjungan
                                                ).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                        booking.status
                                                    )}`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {booking.petugas?.name || "-"}
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
