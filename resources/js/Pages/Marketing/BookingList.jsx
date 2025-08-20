import React, { useState } from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, usePage } from "@inertiajs/react";
import ResponseAlert from "@/Hooks/ResponseAlert";

export default function BookingList({ auth, bookings }) {
    const { flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch = booking.user.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter
            ? booking.status === statusFilter
            : true;
        return matchesSearch && matchesStatus;
    });

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

    const getStatusText = (status) => {
        switch (status) {
            case "pending":
                return "Pending";
            case "disetujui":
                return "Disetujui";
            case "ditolak":
                return "Ditolak";
            case "selesai":
                return "Selesai";
            default:
                return status;
        }
    };

    return (
        <AuthLayout title="Kelola Booking Kunjungan" auth={auth}>
            <div className="px-4 md:px-8 lg:px-16 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Kelola Booking Kunjungan
                    </h1>
                </div>

                {/* {flash.success && <ResponseAlert type="success" message={flash.success} />}
                {flash.error && <ResponseAlert type="error" message={flash.error} />} */}

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cari Pelanggan
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama pelanggan..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter Status
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >
                                <option value="">Semua Status</option>
                                <option value="pending">Pending</option>
                                <option value="disetujui">Disetujui</option>
                                <option value="ditolak">Ditolak</option>
                                <option value="selesai">Selesai</option>
                            </select>
                        </div>
                    </div>
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
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-4 text-center text-gray-500"
                                        >
                                            Tidak ada booking kunjungan
                                            ditemukan
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((booking) => (
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
                                                {/* <div className="text-sm text-gray-500">
                                                    {
                                                        booking.rumah.tipe_rumah
                                                            .nama_tipe
                                                    }
                                                </div> */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(
                                                        booking.jadwal_kunjungan
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(
                                                        booking.jadwal_kunjungan
                                                    ).toLocaleTimeString(
                                                        "id-ID",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                        booking.status
                                                    )}`}
                                                >
                                                    {getStatusText(
                                                        booking.status
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    href={route(
                                                        "marketing.booking.show",
                                                        booking.id
                                                    )}
                                                    className="text-green-600 hover:text-green-900 mr-3"
                                                >
                                                    Detail
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
