import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

/**
 * Props expected:
 *  - pemesanan: object (permintaan pembelian) with relations: user, petugas (nullable), rumah
 *  - rumah: optional (but we use pemesanan.rumah)
 *  - pembayaran: array of pembayaran_cicilan objects
 *
 * Note: berkas_perjanjian is assumed to be an URL or storage path accessible from the browser.
 */

export default function DetailPemesanan({ pemesanan, pembayaran = [] }) {
    const formatRupiah = (angka) => {
        if (angka === null || angka === undefined) return "-";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Number(angka));
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "disetujui":
                return "bg-green-100 text-green-800";
            case "ditolak":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <AuthLayout title="Detail Pemesanan Pembelian">
            <Head title="Detail Pemesanan Pembelian" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Detail Permintaan Pembelian
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Lihat detail pengajuan pembelian, berkas, dan
                            riwayat pembayaran.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route("pemesanan.index")}
                            className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Kembali ke History
                        </Link>
                        <Link
                            href={route("home")}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                        >
                            Lihat Rumah Lain
                        </Link>
                    </div>
                </div>

                {/* Main layout: left details, right summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LEFT: Detail lengkap */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Identitas & kode */}
                        <div className="bg-white border rounded-lg shadow-sm p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Informasi Pengajuan
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Kode:{" "}
                                        <span className="font-mono">
                                            {pemesanan.kode_permintaan}
                                        </span>{" "}
                                        • Pengajuan:{" "}
                                        {formatDate(
                                            pemesanan.tanggal_pengajuan
                                        )}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                                            pemesanan.status
                                        )}`}
                                    >
                                        {String(pemesanan.status).toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Pemohon
                                    </p>
                                    <p className="font-medium">
                                        {pemesanan.user?.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {pemesanan.user?.email}
                                    </p>
                                    {pemesanan.user?.phone && (
                                        <p className="text-sm text-gray-500">
                                            {pemesanan.user.phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">
                                        Petugas Penanggung Jawab
                                    </p>
                                    {pemesanan.petugas ? (
                                        <>
                                            <p className="font-medium">
                                                {pemesanan.petugas.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {pemesanan.petugas.email}
                                            </p>
                                            {pemesanan.petugas.phone && (
                                                <p className="text-sm text-gray-500">
                                                    {pemesanan.petugas.phone}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="italic text-sm text-red-600">
                                            Permohonan belum ditangani
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Rumah */}
                            <div className="mt-6 border-t pt-4">
                                <h3 className="text-sm font-semibold text-gray-700">
                                    Detail Rumah
                                </h3>
                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-gray-500">
                                            Nama / Tipe
                                        </p>
                                        <p className="font-medium">
                                            {pemesanan.rumah?.nama_rumah}{" "}
                                            {pemesanan.rumah?.tipe?.nama_tipe
                                                ? `/ ${pemesanan.rumah.tipe.nama_tipe}`
                                                : ""}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Alamat</p>
                                        <p className="font-medium">
                                            {pemesanan.rumah?.alamat}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">
                                            Harga Rumah
                                        </p>
                                        <p className="font-medium">
                                            {formatRupiah(
                                                pemesanan.total_harga_rumah
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">
                                            Tanggal Pembayaran Pertama
                                        </p>
                                        <p className="font-medium">
                                            {formatDate(
                                                pemesanan.tanggal_pembayaran
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Catatan & alasan penolakan */}
                            <div className="mt-6 border-t pt-4">
                                <h3 className="text-sm font-semibold text-gray-700">
                                    Catatan & Lampiran
                                </h3>
                                <div className="mt-2 text-sm text-gray-700 space-y-2">
                                    <div>
                                        <p className="text-gray-500">
                                            Catatan Pelanggan
                                        </p>
                                        <p className="font-medium">
                                            {pemesanan.catatan || (
                                                <span className="text-gray-400">
                                                    Tidak ada catatan
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    {pemesanan.alasan_penolakan && (
                                        <div>
                                            <p className="text-gray-500">
                                                Alasan Penolakan
                                            </p>
                                            <p className="text-red-600 font-medium">
                                                {pemesanan.alasan_penolakan}
                                            </p>
                                        </div>
                                    )}

                                    {/* Berkas Perjanjian */}
                                    <div>
                                        <p className="text-gray-500">
                                            Berkas Perjanjian
                                        </p>
                                        {pemesanan.berkas_perjanjian ? (
                                            <div className="flex items-center gap-3 mt-2">
                                                <a
                                                    href={
                                                        pemesanan.berkas_perjanjian
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm inline-flex items-center gap-2 px-3 py-1 border rounded text-blue-700 hover:bg-blue-50"
                                                >
                                                    Buka Berkas (PDF)
                                                </a>
                                                <a
                                                    href={
                                                        pemesanan.berkas_perjanjian
                                                    }
                                                    download
                                                    className="text-sm inline-flex items-center gap-2 px-3 py-1 border rounded text-gray-700 hover:bg-gray-50"
                                                >
                                                    Unduh
                                                </a>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-400 mt-2">
                                                Belum ada berkas perjanjian
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Riwayat pembayaran (card) */}
                        <div className="bg-white border rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Riwayat Pembayaran
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {pembayaran.length} pembayaran
                                </span>
                            </div>

                            <div className="mt-4">
                                {pembayaran.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm">
                                            <thead className="text-left text-xs text-gray-500 uppercase">
                                                <tr>
                                                    <th className="pb-2 pr-4">
                                                        No
                                                    </th>
                                                    <th className="pb-2 pr-4">
                                                        Invoice
                                                    </th>
                                                    <th className="pb-2 pr-4">
                                                        Tanggal
                                                    </th>
                                                    <th className="pb-2 pr-4">
                                                        Jumlah
                                                    </th>
                                                    <th className="pb-2 pr-4">
                                                        Metode
                                                    </th>
                                                    <th className="pb-2 pr-4">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-700">
                                                {pembayaran.map((pay, idx) => (
                                                    <tr
                                                        key={pay.id}
                                                        className={`${
                                                            idx % 2 === 0
                                                                ? "bg-white"
                                                                : "bg-gray-50"
                                                        }`}
                                                    >
                                                        <td className="py-3 pr-4">
                                                            {idx + 1}
                                                        </td>
                                                        <td className="py-3 pr-4 font-mono">
                                                            {pay.nomor_invoice}
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            {formatDate(
                                                                pay.tanggal_pembayaran
                                                            )}
                                                        </td>
                                                        <td className="py-3 pr-4 font-medium">
                                                            {formatRupiah(
                                                                pay.jumlah_pembayaran
                                                            )}
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            {
                                                                pay.metode_pembayaran
                                                            }
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            <span
                                                                className={`px-2 py-1 text-xs rounded-full ${
                                                                    pay.status ===
                                                                    "terverifikasi"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : pay.status ===
                                                                          "gagal"
                                                                        ? "bg-red-100 text-red-800"
                                                                        : "bg-yellow-100 text-yellow-800"
                                                                }`}
                                                            >
                                                                {String(
                                                                    pay.status
                                                                ).toUpperCase()}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-gray-500">
                                        Belum ada riwayat pembayaran.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Ringkasan & tindakan */}
                    <aside className="space-y-6">
                        <div className="bg-white border rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                Ringkasan Pembayaran
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Total Harga
                                    </span>
                                    <span className="font-medium">
                                        {formatRupiah(
                                            pemesanan.total_harga_rumah
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Uang Muka
                                    </span>
                                    <span>
                                        {formatRupiah(pemesanan.uang_muka)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Sisa Pembayaran
                                    </span>
                                    <span>
                                        {formatRupiah(
                                            pemesanan.sisa_pembayaran ??
                                                pemesanan.total_harga_rumah -
                                                    (pemesanan.uang_muka || 0)
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Cicilan / Bulan
                                    </span>
                                    <span>
                                        {formatRupiah(
                                            pemesanan.jumlah_cicilan_per_bulan
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Jangka Waktu
                                    </span>
                                    <span>{pemesanan.jangka_waktu} bulan</span>
                                </div>
                            </div>

                            {/* actions */}
                            <div className="mt-4 space-y-2">
                                <Link
                                    href={route(
                                        "marketing.permintaan_pembelian.edit",
                                        pemesanan.id
                                    )}
                                    className="w-full block text-center border border-gray-200 py-2 rounded hover:bg-gray-50"
                                >
                                    Revisi Permintaan (Marketing)
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white border rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                Informasi Tambahan
                            </h3>
                            <div className="text-sm text-gray-700 space-y-2">
                                <div>
                                    <p className="text-gray-500">
                                        Tanggal Pengajuan
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(
                                            pemesanan.tanggal_pengajuan
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">
                                        Tanggal Disetujui
                                    </p>
                                    <p className="font-medium">
                                        {pemesanandateOrNA(
                                            pemesanan.tanggal_disetujui
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500">
                                        Status Lunas
                                    </p>
                                    <p className="font-medium capitalize">
                                        {pemesanan.status_lunas ||
                                            "belum_lunas"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </AuthLayout>
    );

    // helper fallback for tanggal disetujui display
    function pemesanandateOrNA(val) {
        if (!val) return "-";
        try {
            return new Date(val).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return val;
        }
    }
}
