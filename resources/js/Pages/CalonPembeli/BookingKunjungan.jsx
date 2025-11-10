import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { formatRupiah } from "@/Hooks/FormatRupiah";
import GuestLayout from "@/Layouts/GuestLayout";

// Komponen Reusable
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

// Material UI Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotesIcon from "@mui/icons-material/Notes";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import VerifiedIcon from "@mui/icons-material/Verified";
import ResponseAlert from "@/Hooks/ResponseAlert";

export default function BookingKunjungan({ rumah }) {
    const { showResponse } = ResponseAlert();
    const { data, setData, post, processing, errors } = useForm({
        jadwal_kunjungan: "",
        catatan: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("booking.store", rumah.id), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil membuat permintaan booking kunjungan"
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
    };

    const minDate = new Date().toISOString().split("T")[0];

    return (
        <GuestLayout judul={"Booking Kunjungan"}>
            <Head title={`Booking Kunjungan - ${rumah.nama}`} />

            <div className="py-12 bg-gray-100 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                        <div className="p-8 text-gray-900">
                            <h1 className="text-3xl font-bold mb-2">
                                Booking Kunjungan
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Jadwalkan kunjungan Anda untuk melihat properti
                                secara langsung
                            </p>

                            <div className="grid md:grid-cols-2 gap-10">
                                {/* KIRI - Info Properti */}
                                <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <HomeWorkIcon /> Detail Properti
                                    </h2>

                                    <img
                                        src={`/storage/${rumah.gambar}`}
                                        alt={rumah.nama}
                                        className="w-full h-56 object-cover rounded-md mb-4"
                                    />

                                    <div className="space-y-2 text-sm">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {rumah.nama}
                                        </h3>

                                        <p className="text-gray-600 flex items-center gap-1">
                                            <LocationOnIcon fontSize="small" />
                                            {rumah.alamat}
                                        </p>

                                        <p className="text-xl font-bold text-blue-600 flex items-center gap-1">
                                            <PriceCheckIcon fontSize="small" />
                                            {formatRupiah(rumah.harga)}
                                        </p>

                                        <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <VerifiedIcon fontSize="small" />
                                            {rumah.status}
                                        </span>
                                    </div>
                                </div>

                                {/* KANAN - Form Booking */}
                                <div>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <InputLabel
                                                htmlFor="jadwal_kunjungan"
                                                value="Tanggal & Waktu Kunjungan"
                                            />
                                            <div className="relative">
                                                <TextInput
                                                    id="jadwal_kunjungan"
                                                    type="datetime-local"
                                                    value={
                                                        data.jadwal_kunjungan
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "jadwal_kunjungan",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1 block w-full pr-10"
                                                    min={minDate + "T09:00"}
                                                    required
                                                />
                                                <CalendarMonthIcon className="absolute top-3 right-3 text-gray-400" />
                                            </div>
                                            <InputError
                                                message={
                                                    errors.jadwal_kunjungan
                                                }
                                                className="mt-2"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                Waktu kunjungan: 09.00 - 17.00
                                            </p>
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="catatan"
                                                value="Catatan Tambahan"
                                            />
                                            <div className="relative">
                                                <textarea
                                                    id="catatan"
                                                    value={data.catatan}
                                                    onChange={(e) =>
                                                        setData(
                                                            "catatan",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                                                    rows="4"
                                                    placeholder="Catatan khusus untuk kunjungan Anda..."
                                                />
                                                <NotesIcon className="absolute top-3 right-3 text-gray-400" />
                                            </div>
                                            <InputError
                                                message={errors.catatan}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Informasi Penting */}
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                            <h3 className="font-medium text-blue-900 mb-2">
                                                Informasi Penting
                                            </h3>
                                            <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
                                                <li>
                                                    Kunjungan akan dikonfirmasi
                                                    dalam 1x24 jam
                                                </li>
                                                <li>
                                                    Tim kami akan menghubungi
                                                    Anda
                                                </li>
                                                <li>
                                                    Mohon hadir 15 menit lebih
                                                    awal
                                                </li>
                                                <li>Bawa KTP saat kunjungan</li>
                                            </ul>
                                        </div>

                                        <div className="flex items-center justify-between mt-6">
                                            <Link
                                                href={route(
                                                    "rumah.detail",
                                                    rumah.id
                                                )}
                                                className="text-sm text-gray-600 hover:text-gray-900 underline"
                                            >
                                                ← Kembali ke Detail
                                            </Link>
                                            <PrimaryButton
                                                disabled={processing}
                                            >
                                                {processing
                                                    ? "Memproses..."
                                                    : "Booking Sekarang"}
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
