import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import TableLayout from "@/Components/Table/TableLayout";

export default function HistoryPemesanan({ pemesanan }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "approved":
                return "bg-green-100 text-green-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            case "processing":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);
    };

    const deleteHandler = (id) => {
        router.delete(route("pemesanan.delete", id));
    };

    return (
        <AuthLayout title="History Pemesanan">
            <Head title="History Pemesanan" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            History Pemesanan Pembelian
                        </h2>

                        {pemesanan.length === 0 ? (
                            <div className="text-center py-8">
                                <p className=" text-lg">
                                    Belum ada pemesanan yang dilakukan
                                </p>
                                <Link
                                    href={route("home")}
                                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Lihat Rumah
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <TableLayout className="min-w-full divide-y divide-gray-200">
                                    <TableLayout.Table>
                                        <TableLayout.Thead className="bg-gray-50">
                                            <tr>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    No
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Kode
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider ">
                                                    Rumah
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Tipe Rumah
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Total Harga
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Uang Muka
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Cicilan/Bulan
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Jangka Waktu
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Tanggal Pembayaran
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Status
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Status Lunas
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Tanggal Pengajuan
                                                </TableLayout.Th>
                                                <TableLayout.Th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                    Aksi
                                                </TableLayout.Th>
                                            </tr>
                                        </TableLayout.Thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {pemesanan.map((item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-gray-50 "
                                                >
                                                    <TableLayout.Td className="max-w-[10px] px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {index + 1}
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="max-w-[120px] px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.kode_permintaan}
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="px-6 py-4 min-w-[200px] ">
                                                        <div className="w-full">
                                                            <div className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                                                {
                                                                    item.nama_rumah
                                                                }
                                                            </div>
                                                            <div className="text-sm ">
                                                                {item.rumah
                                                                    ?.alamat ||
                                                                    "N/A"}
                                                            </div>
                                                        </div>
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="max-w-[40px] px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {
                                                            item.rumah.tipe
                                                                .nama_tipe
                                                        }
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="max-w-[150px] px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <p>
                                                            Harga Rumah:{" "}
                                                            {formatRupiah(
                                                                item.total_harga_rumah
                                                            )}
                                                        </p>
                                                        <p>
                                                            Uang Muka:{" "}
                                                            {formatRupiah(
                                                                item.uang_muka
                                                            )}
                                                        </p>
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></TableLayout.Td>
                                                    <TableLayout.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatRupiah(
                                                            item.jumlah_cicilan_per_bulan
                                                        )}
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.jangka_waktu}{" "}
                                                        bulan
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {new Date(
                                                            item.tanggal_pembayaran
                                                        ).toLocaleDateString(
                                                            "id-ID"
                                                        )}
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                                item.status
                                                            )}`}
                                                        >
                                                            {item.status.toUpperCase()}
                                                        </span>
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                item.status_lunas ==
                                                                "lunas"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "text-red-800 bg-red-100"
                                                            }`}
                                                        >
                                                            {item.status_lunas}
                                                        </span>
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {new Date(
                                                            item.created_at
                                                        ).toLocaleDateString(
                                                            "id-ID"
                                                        )}
                                                    </TableLayout.Td>
                                                    <TableLayout.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="flex flex-col gap-1">
                                                            {item.status ==
                                                                "diterima" && (
                                                                <Link
                                                                    as="button"
                                                                    className="bg-blue-500 py-2 px-3 text-xs text-white rounded-md"
                                                                >
                                                                    Lihat
                                                                    Riwayat
                                                                    Pembayaran
                                                                </Link>
                                                            )}
                                                            <Link
                                                                href={route(
                                                                    "pemesanan.show",
                                                                    item.id
                                                                )}
                                                                as="button"
                                                                className="bg-blue-500 py-2 px-3 text-xs text-white rounded-md"
                                                            >
                                                                Detail
                                                            </Link>
                                                            {item.status !==
                                                                "diterima" && (
                                                                <button
                                                                    onClick={() =>
                                                                        deleteHandler(
                                                                            item.id
                                                                        )
                                                                    }
                                                                    className="bg-red-500 py-2 px-3 text-xs text-white rounded-md"
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
                                                        </div>
                                                    </TableLayout.Td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </TableLayout.Table>
                                </TableLayout>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
