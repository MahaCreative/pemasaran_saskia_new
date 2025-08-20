import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function BookingList({ bookings }) {
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "confirmed":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            case "completed":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <AuthLayout title="Daftar Booking Kunjungan">
            <Head title="Daftar Booking Kunjungan" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Daftar Booking Kunjungan
                            </h2>
                            <Link
                                href={route("home")}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Booking Baru
                            </Link>
                        </div>

                        {bookings.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 text-lg mb-4">
                                    Belum ada booking kunjungan yang dilakukan.
                                </p>
                                <Link
                                    href={route("home")}
                                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Lihat Rumah
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            {[
                                                "No",
                                                "Rumah",
                                                "Jadwal Kunjungan",
                                                "Status",
                                                "Catatan",
                                                "Tanggal Booking",
                                                "Petugas Menangani",
                                                "WhatsApp Petugas",
                                            ].map((head) => (
                                                <th
                                                    key={head}
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    {head}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {bookings.map((booking, index) => (
                                            <tr
                                                key={booking.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-4 text-sm">
                                                    <div className="font-semibold text-gray-800">
                                                        {booking.rumah
                                                            ?.nama_rumah ||
                                                            "N/A"}
                                                    </div>
                                                    <div className="text-gray-500 text-xs">
                                                        {booking.rumah
                                                            ?.alamat || "N/A"}
                                                    </div>
                                                    <div className="text-gray-600 text-sm">
                                                        {formatRupiah(
                                                            booking.rumah
                                                                ?.harga || 0
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {formatDate(
                                                        booking.jadwal_kunjungan
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                            booking.status
                                                        )}`}
                                                    >
                                                        {booking.status.toUpperCase()}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {booking.catatan || "-"}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {formatDate(
                                                        booking.created_at
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {booking.petugas?.name ||
                                                        "N/A"}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-blue-600">
                                                    {booking.petugas
                                                        ?.no_telepon ? (
                                                        <a
                                                            href={`https://wa.me/${booking.petugas.no_telepon}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:underline"
                                                        >
                                                            {
                                                                booking.petugas
                                                                    .no_telepon
                                                            }
                                                        </a>
                                                    ) : (
                                                        "N/A"
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
