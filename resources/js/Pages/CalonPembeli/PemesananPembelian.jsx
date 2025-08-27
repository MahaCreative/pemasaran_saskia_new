import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
} from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { formatRupiah } from "@/Hooks/FormatRupiah";

import GuestLayout from "@/Layouts/GuestLayout";
import CurrencyInput from "react-currency-input-field";
import ResponseAlert from "@/Hooks/ResponseAlert";

export default function PemesananPembelian({ auth, rumah }) {
    const { showResponse } = ResponseAlert();
    const { data, setData, post, processing, errors } = useForm({
        jumlah_cicilan_per_bulan: "",
        jangka_waktu: "",
        tanggal_pembayaran: "",
        catatan: "",
        terms: false,
    });

    const [openModal, setOpenModal] = useState(false);
    const [modalAgreed, setModalAgreed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenModal(false);
        post(route("pemesanan.store", rumah.id), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil membuat permintaan pembelian, silahkan menunggu konfirmasi petugas"
                );
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Silahkan periksa kembali isian anda" + err.error
                );
            },
        });
    };
    const handleValidationBeforeModal = () => {
        const totalPembayaran =
            parseFloat(data.jumlah_cicilan_per_bulan || 0) *
            parseInt(data.jangka_waktu || 0);

        const hargaRumah = parseFloat(rumah.harga);

        if (totalPembayaran < hargaRumah) {
            alert(
                `Total cicilan (${formatRupiah(
                    totalPembayaran
                )}) harus lebih besar atau sama dengan harga rumah (${formatRupiah(
                    hargaRumah
                )}).`
            );
            return;
        }

        setOpenModal(true);
    };

    const minDate = new Date().toISOString().split("T")[0];

    return (
        <GuestLayout>
            {/* MODAL SYARAT & KETENTUAN */}
            <Dialog open={openModal} disableEscapeKeyDown>
                <DialogTitle>Syarat & Ketentuan</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body2" gutterBottom>
                        Dengan mengajukan permintaan pembelian, Anda setuju:
                    </Typography>
                    <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                        <li>Uang muka minimal 30% dari harga rumah</li>
                        <li>Cicilan tidak boleh kurang dari Rp 1.000.000</li>
                        <li>Data akan diverifikasi oleh admin</li>
                        <li>
                            Setelah disetujui oleh admin, perubahan tidak
                            diperbolehkan
                        </li>
                        <li>
                            Pelanggan wajib menyediakan dokumen pendukung (KTP,
                            NPWP, Slip Gaji)
                        </li>
                    </ul>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={data.terms}
                                onChange={(e) =>
                                    setData("terms", e.target.checked)
                                }
                            />
                        }
                        label="Saya telah membaca dan menyetujui syarat & ketentuan di atas."
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        disabled={!data.terms || processing}
                        variant="contained"
                    >
                        Lanjutkan
                    </Button>
                </DialogActions>
            </Dialog>
            <Head title={`Pemesanan Pembelian - ${rumah.nama}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold mb-2">
                                    Formulir Pemesanan Pembelian
                                </h1>
                                <p className="text-gray-600">
                                    Ajukan permintaan pembelian rumah dengan
                                    cicilan yang sesuai kemampuan Anda.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                {/* Detail Rumah */}
                                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Detail Properti
                                    </h2>
                                    <div className="space-y-3">
                                        <img
                                            src={`/storage/${rumah.gambar}`}
                                            alt={rumah.nama}
                                            className="w-full h-56 object-cover rounded-md mb-4"
                                        />

                                        <div>
                                            <h3 className="text-lg font-medium">
                                                {rumah.nama}
                                            </h3>
                                            <p className="text-gray-600">
                                                {rumah.alamat}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-blue-600">
                                                {formatRupiah(rumah.harga)}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                                                {rumah.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Formulir Pengajuan */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Jumlah Cicilan */}
                                    <div>
                                        <InputLabel
                                            htmlFor="jumlah_cicilan_per_bulan"
                                            value="Jumlah Cicilan per Bulan"
                                        />
                                        <CurrencyInput
                                            id="jumlah_cicilan_per_bulan"
                                            prefix="Rp. "
                                            value={
                                                data.jumlah_cicilan_per_bulan
                                            }
                                            onValueChange={(value) =>
                                                setData(
                                                    "jumlah_cicilan_per_bulan",
                                                    value
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
                                            placeholder="Masukkan cicilan per bulan"
                                            min={1000000}
                                            required
                                        />
                                        <InputError
                                            message={
                                                errors.jumlah_cicilan_per_bulan
                                            }
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Minimal cicilan:{" "}
                                            {formatRupiah(1000000)}
                                        </p>
                                    </div>

                                    {/* Jangka Waktu */}
                                    <div>
                                        <InputLabel
                                            htmlFor="jangka_waktu"
                                            value="Jangka Waktu (bulan)"
                                        />
                                        <TextInput
                                            id="jangka_waktu"
                                            type="number"
                                            value={data.jangka_waktu}
                                            onChange={(e) =>
                                                setData(
                                                    "jangka_waktu",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            min={6}
                                            max={240}
                                            required
                                            placeholder="Contoh: 120 untuk 10 tahun"
                                        />
                                        <InputError
                                            message={errors.jangka_waktu}
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Minimal 6 bulan, maksimal 240 bulan
                                            (20 tahun)
                                        </p>
                                    </div>

                                    {/* Tanggal Pembayaran */}
                                    <div>
                                        <InputLabel
                                            htmlFor="tanggal_pembayaran"
                                            value="Tanggal Jatuh Tempo"
                                        />
                                        <TextInput
                                            id="tanggal_pembayaran"
                                            type="date"
                                            value={data.tanggal_pembayaran}
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_pembayaran",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            min={minDate}
                                            required
                                        />
                                        <InputError
                                            message={errors.tanggal_pembayaran}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Catatan */}
                                    <div>
                                        <InputLabel
                                            htmlFor="catatan"
                                            value="Catatan Tambahan"
                                        />
                                        <textarea
                                            id="catatan"
                                            value={data.catatan}
                                            onChange={(e) =>
                                                setData(
                                                    "catatan",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
                                            rows="4"
                                            placeholder="Tulis catatan atau permintaan khusus..."
                                        />
                                        <InputError
                                            message={errors.catatan}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Informasi Penting */}
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-blue-900 mb-2">
                                            Informasi Penting
                                        </h3>
                                        <ul className="text-sm text-blue-800 space-y-1 list-disc pl-5">
                                            <li>
                                                Permintaan akan diproses dalam
                                                1-3 hari kerja
                                            </li>
                                            <li>
                                                Tim kami akan menghubungi Anda
                                                untuk verifikasi
                                            </li>
                                            <li>
                                                Siapkan dokumen: KTP, NPWP, Slip
                                                Gaji
                                            </li>
                                            <li>
                                                Uang muka minimal 30% dari harga
                                                rumah
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Aksi */}
                                    <div className="flex items-center justify-end space-x-4">
                                        <Link
                                            href={route(
                                                "rumah.detail",
                                                rumah.id
                                            )}
                                            className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-xs rounded-md uppercase tracking-widest transition"
                                        >
                                            Kembali
                                        </Link>
                                        <button
                                            onClick={
                                                handleValidationBeforeModal
                                            }
                                            type="button"
                                            className="py-2 px-3 rounded-md bg-green-500 text-white"
                                        >
                                            Ajukan Pembelian
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
