import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import SelectPermintaanModal from "./SelectPermintaanModal";
import { formatRupiah } from "@/Hooks/FormatRupiah";
import AuthLayout from "@/Layouts/AuthLayout";
import CurrencyInput from "react-currency-input-field";
import ResponseAlert from "@/Hooks/ResponseAlert";

export default function Form({
    auth,
    nomor_invoice,
    permintaanPembelians = [],
    pembayaranCicilan = null,
    permintaanPembelian = null,
}) {
    const { showResponse } = ResponseAlert();
    const [showModal, setShowModal] = useState(false);
    const [selectedPermintaan, setSelectedPermintaan] = useState(
        permintaanPembelian || pembayaranCicilan?.permintaan_pembelian || null
    );

    const isEditMode = !!pembayaranCicilan;

    const { data, setData, post, processing, errors } = useForm({
        permintaan_pembelian_id: selectedPermintaan?.id || "",
        nomor_invoice: pembayaranCicilan?.nomor_invoice || nomor_invoice,
        jumlah_pembayaran: pembayaranCicilan?.jumlah_pembayaran || "",
        tanggal_pembayaran:
            pembayaranCicilan?.tanggal_pembayaran ||
            new Date().toISOString().split("T")[0],
        metode_pembayaran: pembayaranCicilan?.metode_pembayaran || "transfer",
        catatan: pembayaranCicilan?.catatan || "",
        bukti_transfer: null,
    });

    useEffect(() => {
        if (selectedPermintaan) {
            setData({
                ...data,
                permintaan_pembelian_id: selectedPermintaan.id,
                jumlah_pembayaran: selectedPermintaan.jumlah_cicilan_per_bulan,
            });
        }
    }, [selectedPermintaan]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "bukti_transfer" && data[key] instanceof File) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key]);
            }
        });

        if (isEditMode) {
            post(
                route(
                    "marketing.pembayaran-cicilan.update",
                    pembayaranCicilan.id
                ),
                {
                    data: formData,
                    forceFormData: true,
                    onSuccess: () => {
                        showResponse(
                            "success",
                            "Berhasil",
                            "Berhasil memperbaharui data"
                        );
                    },
                    onError: () => {
                        showResponse(
                            "error",
                            "Gagal",
                            "Silahkan periksa kembali isian anda"
                        );
                    },
                }
            );
        } else {
            post(route("marketing.pembayaran-cicilan.store"), {
                data: formData,
                forceFormData: true,
                onSuccess: () => {
                    showResponse(
                        "success",
                        "Berhasil",
                        "Berhasil menambahkan 1 data"
                    );
                },
                onError: () => {
                    showResponse(
                        "error",
                        "Gagal",
                        "Silahkan periksa kembali isian anda"
                    );
                },
            });
        }
    };

    const handleSelectPermintaan = (permintaan) => {
        console.log(permintaan);

        setSelectedPermintaan(permintaan);
        setShowModal(false);
    };

    return (
        <AuthLayout>
            <Head
                title={
                    isEditMode
                        ? "Edit Pembayaran Cicilan"
                        : "Tambah Pembayaran Cicilan"
                }
            />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {isEditMode
                                        ? "Edit Pembayaran Cicilan"
                                        : "Tambah Pembayaran Cicilan"}
                                </h2>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="permintaan_pembelian_id"
                                    value="Permintaan Pembelian"
                                />
                                <div className="mt-1 flex items-center space-x-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={
                                            selectedPermintaan
                                                ? `${selectedPermintaan.kode_permintaan} - ${selectedPermintaan.user?.name}`
                                                : "Pilih permintaan pembelian"
                                        }
                                        className="w-full bg-gray-50"
                                    />
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Pilih
                                    </SecondaryButton>
                                </div>
                                {selectedPermintaan && (
                                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                                        <p className="text-sm text-gray-600">
                                            <strong>Rumah:</strong>{" "}
                                            {selectedPermintaan.rumah?.alamat ||
                                                "-"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Total Harga:</strong>{" "}
                                            {formatRupiah(
                                                selectedPermintaan.total_harga_rumah
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Cicilan Bulanan:</strong>{" "}
                                            {formatRupiah(
                                                selectedPermintaan.jumlah_cicilan_per_bulan
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>
                                                Tanggal Pembayaran:{" "}
                                            </strong>
                                            <span>
                                                {
                                                    selectedPermintaan.tanggal_pembayaran
                                                }
                                            </span>
                                        </p>
                                    </div>
                                )}
                                <InputError
                                    message={errors.permintaan_pembelian_id}
                                    className="mt-2"
                                />
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 grid md:grid-cols-2 gap-3 my-2"
                            >
                                {/* Permintaan Pembelian */}

                                {/* Nomor Invoice */}
                                <div>
                                    <InputLabel
                                        htmlFor="nomor_invoice"
                                        value="Nomor Invoice"
                                    />
                                    <TextInput
                                        disabled
                                        id="nomor_invoice"
                                        type="text"
                                        value={data.nomor_invoice}
                                        onChange={(e) =>
                                            setData(
                                                "nomor_invoice",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.nomor_invoice}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Jumlah Pembayaran */}
                                <div>
                                    <InputLabel
                                        htmlFor="jumlah_pembayaran"
                                        value="Jumlah Pembayaran"
                                    />
                                    <CurrencyInput
                                        value={data.jumlah_pembayaran}
                                        prefix="Rp. "
                                        onValueChange={(value) =>
                                            setData("jumlah_pembayaran", value)
                                        }
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.jumlah_pembayaran}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Tanggal Pembayaran */}
                                <div>
                                    <InputLabel
                                        htmlFor="tanggal_pembayaran"
                                        value="Tanggal Pembayaran"
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
                                        required
                                    />
                                    <InputError
                                        message={errors.tanggal_pembayaran}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Metode Pembayaran */}
                                <div>
                                    <InputLabel
                                        htmlFor="metode_pembayaran"
                                        value="Metode Pembayaran"
                                    />
                                    <select
                                        id="metode_pembayaran"
                                        value={data.metode_pembayaran}
                                        onChange={(e) =>
                                            setData(
                                                "metode_pembayaran",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="">Pilih Metode</option>
                                        <option value="transfer">
                                            Transfer Bank
                                        </option>
                                        <option value="tunai">Tunai</option>
                                        <option value="qris">QRIS</option>
                                    </select>
                                    <InputError
                                        message={errors.metode_pembayaran}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Catatan */}
                                <div>
                                    <InputLabel
                                        htmlFor="catatan"
                                        value="Catatan"
                                    />
                                    <textarea
                                        id="catatan"
                                        value={data.catatan}
                                        onChange={(e) =>
                                            setData("catatan", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        rows={3}
                                    />
                                    <InputError
                                        message={errors.catatan}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Bukti Transfer */}
                                <div>
                                    <InputLabel
                                        htmlFor="bukti_transfer"
                                        value="Bukti Transfer"
                                    />
                                    <input
                                        id="bukti_transfer"
                                        type="file"
                                        onChange={(e) =>
                                            setData(
                                                "bukti_transfer",
                                                e.target.files[0]
                                            )
                                        }
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        accept="image/*"
                                    />
                                    <InputError
                                        message={errors.bukti_transfer}
                                        className="mt-2"
                                    />
                                    {pembayaranCicilan && (
                                        <p>
                                            * Kosongkan jika tidak ingin
                                            mengganti bukti transfer
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <SecondaryButton
                                        onClick={() => window.history.back()}
                                    >
                                        Batal
                                    </SecondaryButton>
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {isEditMode ? "Update" : "Simpan"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClick={() => setShowModal(false)}>
                <SelectPermintaanModal
                    permintaanPembelians={permintaanPembelians}
                    onSelect={handleSelectPermintaan}
                    onClose={() => setShowModal(false)}
                />
            </Modal>
        </AuthLayout>
    );
}
