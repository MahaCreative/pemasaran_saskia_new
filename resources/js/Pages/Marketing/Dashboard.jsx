import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link } from "@inertiajs/react";

export default function MarketingDashboard({ auth, count }) {
    //
    // rumah_count
    //
    //
    //
    //
    // booking_diterima
    // booking_ditolak
    // booking_selesai

    return (
        <AuthLayout title="Dashboard Marketing" auth={auth}>
            <div className="px-4 md:px-8 lg:px-16 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-500 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Total Rumah
                        </h3>
                        <p className="text-3xl font-bold text-blue-100">
                            {count?.rumah_count || 0}
                        </p>
                    </div>

                    <div className="bg-yellow-500 rounded-lg shadow-md p-6">
                        <h3 className=" font-semibold text-white mb-2">
                            Permintaan Pembelian Pending
                        </h3>
                        <p className="text-3xl font-bold text-yellow-100">
                            {count?.permintaan_pending || 0}
                        </p>
                    </div>

                    <div className="bg-green-500 rounded-lg shadow-md p-6">
                        <h3 className=" font-semibold text-white mb-2">
                            Permintaan Pembelian Disetujui
                        </h3>
                        <p className="text-3xl font-bold text-green-100">
                            {count?.permintaan_diterima || 0}
                        </p>
                    </div>

                    <div className="bg-red-500 rounded-lg shadow-md p-6">
                        <h3 className=" font-semibold text-white mb-2">
                            Permintaan Pembelian Ditolak
                        </h3>
                        <p className="text-3xl font-bold text-red-100">
                            {count?.permintaan_ditolak || 0}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-orange-500 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Booking Pending
                        </h3>
                        <p className="text-3xl font-bold text-orange-100">
                            {count?.booking_pending || 0}
                        </p>
                    </div>

                    <div className="bg-blue-500 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Booking Diterima
                        </h3>
                        <p className="text-3xl font-bold text-blue-100">
                            {count?.booking_diterima || 0}
                        </p>
                    </div>

                    <div className="bg-red-500 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Booking Ditolak
                        </h3>
                        <p className="text-3xl font-bold text-red-100">
                            {count?.booking_ditolak || 0}
                        </p>
                    </div>

                    <div className="bg-green-500 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Booking Selesai
                        </h3>
                        <p className="text-3xl font-bold text-green-100">
                            {count?.booking_selesai || 0}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Permintaan Pembelian Terbaru
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Kelola dan review permintaan pembelian rumah
                            terbaru.
                        </p>
                        <Link
                            href={route("marketing.permintaan_pembelian.index")}
                            as="button"
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                        >
                            Lihat Permintaan
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Booking Kunjungan
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Kelola dan review booking kunjungan pelanggan.
                        </p>
                        <Link
                            href={route("marketing.booking.index")}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                        >
                            Lihat Booking
                        </Link>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Alat Marketing
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-md p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Promosi
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                                Buat dan kelola promo khusus
                            </p>
                            <Link
                                href={route("marketing.promosi.index")}
                                className="text-green-500 hover:text-green-600 text-sm"
                            >
                                Kelola Promosi
                            </Link>
                        </div>

                        <div className="border border-gray-200 rounded-md p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Pembayaran
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                                Pantau dan catat pembayaran pelanggan
                            </p>
                            <Link
                                href={route(
                                    "marketing.pembayaran-cicilan.create"
                                )}
                                className="text-green-500 hover:text-green-600 text-sm"
                            >
                                Kelola Pembayaran
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
