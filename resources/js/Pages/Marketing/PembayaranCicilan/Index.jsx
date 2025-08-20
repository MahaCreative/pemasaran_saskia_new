import React from "react";
import { Head, Link, router } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { formatRupiah } from "@/Hooks/FormatRupiah";
import AuthLayout from "@/Layouts/AuthLayout";
import SelectOption from "@/Components/Form/SelectOption";

export default function Index({ auth, pembayaranCicilans }) {
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus pembayaran ini?")) {
            router.delete(route("marketing.pembayaran-cicilan.destroy", id));
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            diterima: "bg-green-100 text-green-800",
            ditolak: "bg-red-100 text-red-800",
            "tepat waktu": "bg-green-100 text-green-800",
            terlambat: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };
    const changeStatus = (id, e) => {
        router.post(
            route("marketing.pembayaran-cicilan.update_status", { id }),
            { status: e.target.value }
        );
    };
    return (
        <AuthLayout>
            <Head title="Pembayaran Cicilan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Daftar Pembayaran Cicilan
                                </h2>
                                {auth.user.role == "marketing" && (
                                    <Link
                                        href={route(
                                            "marketing.pembayaran-cicilan.create"
                                        )}
                                    >
                                        <PrimaryButton>
                                            Tambah Pembayaran
                                        </PrimaryButton>
                                    </Link>
                                )}
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No. Invoice
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Pembeli
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jumlah Bayar
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal Bayar
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Bukti Pembayaran
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status Pembayaran
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status Terlambat
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Petugas Pemproses
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pembayaranCicilans.data.length ===
                                        0 ? (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="px-6 py-4 text-center text-gray-500"
                                                >
                                                    Tidak ada data pembayaran
                                                    cicilan
                                                </td>
                                            </tr>
                                        ) : (
                                            pembayaranCicilans.data.map(
                                                (pembayaran) => (
                                                    <tr key={pembayaran.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {
                                                                pembayaran.nomor_invoice
                                                            }
                                                        </td>
                                                        <td className="px-6 capitalize py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {pembayaran
                                                                .permintaan_pembelian
                                                                ?.user?.name ||
                                                                "-"}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {formatRupiah(
                                                                pembayaran.jumlah_pembayaran
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(
                                                                pembayaran.tanggal_pembayaran
                                                            ).toLocaleDateString(
                                                                "id-ID"
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <a
                                                                href={
                                                                    "/storage/" +
                                                                    pembayaran.bukti_pembayaran
                                                                }
                                                                target="_blank"
                                                            >
                                                                <img
                                                                    src={
                                                                        "/storage/" +
                                                                        pembayaran.bukti_pembayaran
                                                                    }
                                                                    className="w-10 h-10"
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {auth.user.role ==
                                                            "marketing1" ? (
                                                                <span
                                                                    className={`uppercase px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                                        pembayaran.status
                                                                    )}`}
                                                                >
                                                                    {
                                                                        pembayaran.status
                                                                    }
                                                                </span>
                                                            ) : (
                                                                <SelectOption
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        changeStatus(
                                                                            pembayaran.id,
                                                                            e
                                                                        )
                                                                    }
                                                                    value={
                                                                        pembayaran.status
                                                                    }
                                                                >
                                                                    <option
                                                                        value={
                                                                            ""
                                                                        }
                                                                    >
                                                                        Pilih
                                                                        Status
                                                                    </option>
                                                                    <option
                                                                        className="capitalize"
                                                                        disabled={
                                                                            pembayaran.status ==
                                                                            "pending"
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        value={
                                                                            "pending"
                                                                        }
                                                                    >
                                                                        pending
                                                                    </option>
                                                                    <option
                                                                        className="capitalize"
                                                                        disabled={
                                                                            pembayaran.status ==
                                                                            "diterima"
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        value={
                                                                            "diterima"
                                                                        }
                                                                    >
                                                                        Diterima
                                                                    </option>
                                                                    <option
                                                                        className="capitalize"
                                                                        disabled={
                                                                            pembayaran.status ==
                                                                            "ditolak"
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        value={
                                                                            "ditolak"
                                                                        }
                                                                    >
                                                                        ditolak
                                                                    </option>
                                                                </SelectOption>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`uppercase px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                                    pembayaran.status_terlambat
                                                                )}`}
                                                            >
                                                                {
                                                                    pembayaran.status_terlambat
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                                                            {
                                                                pembayaran
                                                                    .petugas
                                                                    ?.name
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                            {/* <Link
                                                                href={route(
                                                                    "marketing.pembayaran-cicilan.show",
                                                                    pembayaran.id
                                                                )}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Detail
                                                            </Link> */}
                                                            {auth.user.role !==
                                                                "manager" &&
                                                                (auth.user.id ==
                                                                    pembayaran.petugas_id ||
                                                                    pembayaran.status !==
                                                                        "diterima") && (
                                                                    <Link
                                                                        href={route(
                                                                            "marketing.pembayaran-cicilan.edit",
                                                                            pembayaran.id
                                                                        )}
                                                                        className="text-yellow-600 hover:text-yellow-900"
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                )}
                                                            {(pembayaran.status !==
                                                                "diterima" ||
                                                                auth.user
                                                                    .role ==
                                                                    "manager") && (
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            pembayaran.id
                                                                        )
                                                                    }
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Hapus
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* {pembayaranCicilans.links && (
                                <div className="mt-4">
                                    {pembayaranCicilans.links}
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
