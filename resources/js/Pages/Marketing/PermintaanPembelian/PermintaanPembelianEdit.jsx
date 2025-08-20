import React, { useState, useEffect } from "react";
import { useForm, Link } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import ResponseAlert from "@/Hooks/ResponseAlert";

/**
 * Edit Permintaan Pembelian (Marketing)
 * Props:
 *  - permintaan: object (permintaan pembelian beserta relasi user, rumah, petugas)
 *
 * Notes:
 *  - Mengirim form via post(route("marketing.permintaan_pembelian.update", permintaan.id))
 *  - Backend harus menerima file 'berkas_perjanjian' (pdf) jika ada
 */
export default function PermintaanPembelianEdit({ permintaan }) {
    // inisialisasi form
    const { showResponse } = ResponseAlert();
    const { data, setData, post, processing, errors, reset } = useForm({
        uang_muka: permintaan.uang_muka ?? 0,
        jumlah_cicilan_per_bulan: permintaan.jumlah_cicilan_per_bulan ?? 0,
        jangka_waktu: permintaan.jangka_waktu ?? 0,

        tanggal_pembayaran: permintaan.tanggal_pembayaran ?? "",
        status: permintaan.status ?? "pending",

        catatan: permintaan.catatan ?? "",
        alasan_penolakan: permintaan.alasan_penolakan ?? "",
        // file input will send as 'berkas_perjanjian' (nullable)
        berkas_perjanjian: null,
        // helper flag to remove existing file if marketing wants
        remove_berkas: false,
    });

    const [localPdfPreview, setLocalPdfPreview] = useState(null); // preview for newly selected pdf
    const [hasExistingBerkas, setHasExistingBerkas] = useState(
        !!permintaan.berkas_perjanjian
    );

    useEffect(() => {
        // clear local preview on unmount
        return () => {
            if (localPdfPreview) URL.revokeObjectURL(localPdfPreview);
        };
    }, [localPdfPreview]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setData("berkas_perjanjian", null);
            setLocalPdfPreview(null);
            return;
        }

        // only allow pdf
        if (file.type !== "application/pdf") {
            alert("Silakan pilih file PDF.");
            e.target.value = "";
            return;
        }

        setData("berkas_perjanjian", file);
        // create preview URL
        const url = URL.createObjectURL(file);
        setLocalPdfPreview(url);
        // if upload new file, default remove existing flag false but hasExistingBerkas true still (we'll replace)
        setHasExistingBerkas(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // post to update route (marketing.permintaan_pembelian.update)
        post(route("marketing.permintaan_pembelian.update", permintaan.id), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil memperbaharui permintaan pembelian"
                );
            },
            onError: () => {
                showResponse(
                    "error",
                    "Gagal",
                    "Silahkan periksa kembali isian anda"
                );
            },
            // You can use onError to focus or show custom messages
        });
    };

    const formatRupiah = (angka) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka ?? 0);

    const formatDate = (d) =>
        d
            ? new Date(d).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
              })
            : "-";

    return (
        <AuthLayout title="Revisi Permintaan Pembelian">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Tinjau & Revisi Permintaan
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Kode:{" "}
                            <span className="font-mono text-sm">
                                {permintaan.kode_permintaan}
                            </span>{" "}
                            • Pengajuan:{" "}
                            {formatDate(permintaan.tanggal_pengajuan)}
                        </p>
                    </div>

                    <div className="text-right">
                        <div className="text-sm text-gray-700">
                            Pelanggan:{" "}
                            <span className="font-medium">
                                {permintaan.user?.name}
                            </span>
                        </div>
                        <div className="text-sm text-gray-600">
                            {permintaan.user?.email}
                        </div>
                    </div>
                </div>

                {/* Summary card */}
                <div className="bg-white shadow rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-700">
                            Informasi Rumah
                        </h3>
                        <p className="text-sm text-gray-800 mt-1">
                            {permintaan.rumah?.nama_rumah}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            {permintaan.rumah?.alamat}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700">
                            Ringkasan Keuangan
                        </h3>
                        <div className="mt-2 space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Total Harga
                                </span>
                                <span className="font-medium">
                                    {formatRupiah(permintaan.total_harga_rumah)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Uang Muka (default)
                                </span>
                                <span className="font-medium">
                                    {formatRupiah(permintaan.uang_muka)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Sisa Pembayaran
                                </span>
                                <span className="font-medium">
                                    {formatRupiah(permintaan.sisa_pembayaran)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Cicilan / bulan
                                </span>
                                <span className="font-medium">
                                    {formatRupiah(
                                        permintaan.jumlah_cicilan_per_bulan
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow rounded-lg p-6 space-y-6"
                >
                    <h2 className="text-lg font-semibold text-gray-800">
                        Perbarui Data Keuangan & Status
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Uang Muka */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Uang Muka (Rp)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="1000"
                                value={data.uang_muka}
                                onChange={(e) =>
                                    setData(
                                        "uang_muka",
                                        e.target.value === ""
                                            ? ""
                                            : parseFloat(e.target.value)
                                    )
                                }
                                className="mt-1 w-full rounded border-gray-300 p-2"
                            />
                            {errors.uang_muka && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.uang_muka}
                                </div>
                            )}
                        </div>

                        {/* Jumlah cicilan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Jumlah Cicilan per Bulan (Rp)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="1000"
                                value={data.jumlah_cicilan_per_bulan}
                                onChange={(e) =>
                                    setData(
                                        "jumlah_cicilan_per_bulan",
                                        e.target.value === ""
                                            ? ""
                                            : parseFloat(e.target.value)
                                    )
                                }
                                className="mt-1 w-full rounded border-gray-300 p-2"
                            />
                            {errors.jumlah_cicilan_per_bulan && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.jumlah_cicilan_per_bulan}
                                </div>
                            )}
                        </div>

                        {/* Jangka waktu */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Jangka Waktu (bulan)
                            </label>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                value={data.jangka_waktu}
                                onChange={(e) =>
                                    setData(
                                        "jangka_waktu",
                                        e.target.value === ""
                                            ? ""
                                            : parseInt(e.target.value)
                                    )
                                }
                                className="mt-1 w-full rounded border-gray-300 p-2"
                            />
                            {errors.jangka_waktu && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.jangka_waktu}
                                </div>
                            )}
                        </div>

                        {/* Tanggal pembayaran pertama */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tanggal Pembayaran Pertama
                            </label>
                            <input
                                type="date"
                                value={data.tanggal_pembayaran}
                                onChange={(e) =>
                                    setData(
                                        "tanggal_pembayaran",
                                        e.target.value
                                    )
                                }
                                className="mt-1 w-full rounded border-gray-300 p-2"
                            />
                            {errors.tanggal_pembayaran && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.tanggal_pembayaran}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Status Permintaan
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className="mt-1 w-full rounded border-gray-300 p-2"
                            >
                                <option value="pending">Pending</option>
                                <option value="disetujui">Disetujui</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                            {errors.status && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.status}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Jika ditolak => alasan */}
                    {data.status === "ditolak" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Alasan Penolakan
                            </label>
                            <textarea
                                value={data.alasan_penolakan}
                                onChange={(e) =>
                                    setData("alasan_penolakan", e.target.value)
                                }
                                rows={3}
                                className="mt-1 w-full rounded border-gray-300 p-2"
                            />
                            {errors.alasan_penolakan && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.alasan_penolakan}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Catatan */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Catatan Marketing
                        </label>
                        <textarea
                            value={data.catatan}
                            onChange={(e) => setData("catatan", e.target.value)}
                            rows={4}
                            className="mt-1 w-full rounded border-gray-300 p-2"
                            placeholder="Catatan tambahan atau instruksi..."
                        />
                        {errors.catatan && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.catatan}
                            </div>
                        )}
                    </div>

                    {/* Berkas Perjanjian (PDF) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Berkas Perjanjian (PDF)
                            </label>
                            <div className="mt-2 flex items-center gap-3">
                                <input
                                    id="berkas_perjanjian"
                                    name="berkas_perjanjian"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="text-sm"
                                />
                                <label className="ml-2 text-sm text-gray-500">
                                    {localPdfPreview
                                        ? "File PDF siap di-upload"
                                        : hasExistingBerkas
                                        ? "Terdapat perjanjian lama"
                                        : "Belum ada berkas"}
                                </label>
                            </div>
                            {errors.berkas_perjanjian && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.berkas_perjanjian}
                                </div>
                            )}

                            {/* option: remove existing berkas */}
                            {permintaan.berkas_perjanjian && (
                                <div className="mt-3 flex items-center gap-2">
                                    <input
                                        id="remove_berkas"
                                        type="checkbox"
                                        checked={data.remove_berkas}
                                        onChange={(e) =>
                                            setData(
                                                "remove_berkas",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="remove_berkas"
                                        className="text-sm text-gray-700"
                                    >
                                        Hapus berkas perjanjian lama setelah
                                        simpan
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Preview PDF */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Preview Berkas
                            </label>
                            <div className="mt-2 border rounded overflow-hidden">
                                {localPdfPreview ? (
                                    <iframe
                                        title="preview-pdf"
                                        src={localPdfPreview}
                                        className="w-full h-40"
                                    />
                                ) : permintaan.berkas_perjanjian ? (
                                    // existing berkas URL, asumi full URL stored in permintaan.berkas_perjanjian or path to /storage
                                    <iframe
                                        title="preview-existing-pdf"
                                        src={permintaan.berkas_perjanjian}
                                        className="w-full h-40"
                                    />
                                ) : (
                                    <div className="p-4 text-sm text-gray-500">
                                        Tidak ada berkas untuk ditampilkan
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Link
                            href={route(
                                "marketing.permintaan_pembelian.show",
                                permintaan.id
                            )}
                            className="inline-block px-4 py-2 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-block px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                        >
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
