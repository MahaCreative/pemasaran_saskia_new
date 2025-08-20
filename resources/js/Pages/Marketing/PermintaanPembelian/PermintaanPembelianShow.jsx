import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link } from "@inertiajs/react";

export default function PermintaanPembelianShow({ auth, permintaan }) {
    const formatRupiah = (angka) => {
        if (angka == null) return "-";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);
    };

    const formatTanggal = (tanggal) => {
        if (!tanggal) return "-";
        return new Date(tanggal).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "disetujui":
                return "bg-green-100 text-green-800";
            case "ditolak":
                return "bg-red-100 text-red-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "disetujui":
                return "Disetujui";
            case "ditolak":
                return "Ditolak";
            case "pending":
                return "Menunggu Persetujuan";
            default:
                return status;
        }
    };

    const badge = (text, color) => (
        <span
            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${color}`}
        >
            {text}
        </span>
    );

    return (
        <AuthLayout title="Detail Permintaan Pembelian">
            <div className="px-4 md:px-8 lg:px-16 py-8 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Detail Permintaan Pembelian
                        </h1>
                        <p className="text-sm text-gray-500">
                            Kode Permintaan:{" "}
                            <span className="font-semibold">
                                {permintaan.kode_permintaan}
                            </span>
                        </p>
                    </div>
                    <Link
                        href={route("marketing.permintaan_pembelian.index")}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                    >
                        Kembali
                    </Link>
                </div>

                {/* Informasi Pelanggan & Rumah */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                            Informasi Pelanggan
                        </h2>
                        <dl className="space-y-2">
                            <div>
                                <dt className="text-sm text-gray-500">Nama</dt>
                                <dd className="font-medium">
                                    {permintaan.user.name}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Email</dt>
                                <dd className="font-medium">
                                    {permintaan.user.email}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">
                                    Telepon
                                </dt>
                                <dd className="font-medium">
                                    {permintaan.user.phone || "-"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">
                                    Alamat
                                </dt>
                                <dd className="font-medium">
                                    {permintaan.user.address || "-"}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                            Informasi Rumah
                        </h2>
                        <dl className="space-y-2">
                            <div>
                                <dt className="text-sm text-gray-500">
                                    Nama Rumah
                                </dt>
                                <dd className="font-medium">
                                    {permintaan.rumah.nama_rumah}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">
                                    Lokasi
                                </dt>
                                <dd className="font-medium">
                                    {permintaan.rumah.lokasi}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">
                                    Luas Bangunan
                                </dt>
                                <dd className="font-medium">
                                    {permintaan.rumah.luas_bangunan} m²
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Detail Transaksi */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                        Detail Transaksi
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <strong>Total Harga Rumah:</strong>{" "}
                            {formatRupiah(permintaan.total_harga_rumah)}
                        </div>
                        <div>
                            <strong>Uang Muka:</strong>{" "}
                            {formatRupiah(permintaan.uang_muka)}
                        </div>
                        <div>
                            <strong>Sisa Pembayaran:</strong>{" "}
                            {formatRupiah(permintaan.sisa_pembayaran)}
                        </div>
                        <div>
                            <strong>Cicilan Per Bulan:</strong>{" "}
                            {formatRupiah(permintaan.jumlah_cicilan_per_bulan)}
                        </div>
                        <div>
                            <strong>Jangka Waktu:</strong>{" "}
                            {permintaan.jangka_waktu} bulan
                        </div>

                        <div>
                            <strong>Tanggal Pengajuan:</strong>{" "}
                            {formatTanggal(permintaan.tanggal_pengajuan)}
                        </div>
                        <div>
                            <strong>Tanggal Pembayaran Pertama:</strong>{" "}
                            {formatTanggal(permintaan.tanggal_pembayaran)}
                        </div>
                    </div>
                </div>

                {/* Status & Catatan */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                        Status & Proses
                    </h2>
                    <div className="space-y-3">
                        <div className="flex gap-2 flex-wrap">
                            {badge(
                                getStatusText(permintaan.status),
                                getStatusColor(permintaan.status)
                            )}

                            {badge(
                                `Lunas: ${permintaan.status_lunas}`,
                                "bg-purple-100 text-purple-800"
                            )}
                            {permintaan.disetujui_user
                                ? badge(
                                      "Disetujui User",
                                      "bg-green-100 text-green-800"
                                  )
                                : badge(
                                      "Belum Disetujui User",
                                      "bg-yellow-100 text-yellow-800"
                                  )}
                        </div>
                        {permintaan.tanggal_disetujui && (
                            <p className="text-sm text-gray-600">
                                Disetujui Marketing:{" "}
                                {formatTanggal(permintaan.tanggal_disetujui)}
                            </p>
                        )}
                        {permintaan.tanggal_disetujui_user && (
                            <p className="text-sm text-gray-600">
                                Disetujui User:{" "}
                                {formatTanggal(
                                    permintaan.tanggal_disetujui_user
                                )}
                            </p>
                        )}
                        {permintaan.catatan && (
                            <div className="mt-2 p-3 bg-gray-50 rounded">
                                <p className="text-sm text-gray-600 font-medium">
                                    Catatan
                                </p>
                                <p>{permintaan.catatan}</p>
                            </div>
                        )}
                        {permintaan.alasan_penolakan && (
                            <div className="mt-2 p-3 bg-red-50 rounded">
                                <p className="text-sm text-red-600 font-medium">
                                    Alasan Penolakan
                                </p>
                                <p>{permintaan.alasan_penolakan}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Berkas */}
                {permintaan.berkas_perjanjian && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                            Berkas Perjanjian
                        </h2>
                        <a
                            href={`/storage/${permintaan.berkas_perjanjian}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            📄 Lihat / Download Berkas
                        </a>
                    </div>
                )}

                {/* Aksi */}
                <div className="flex justify-end gap-3">
                    <Link
                        href={route(
                            "marketing.permintaan_pembelian.edit",
                            permintaan.id
                        )}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                    >
                        Edit
                    </Link>
                    <Link
                        href={route("marketing.permintaan_pembelian.index")}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                    >
                        Kembali
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
