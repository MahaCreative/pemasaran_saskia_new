import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LayersIcon from "@mui/icons-material/Layers";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import ForestIcon from "@mui/icons-material/Forest";
import GarageIcon from "@mui/icons-material/Garage";
import KitchenIcon from "@mui/icons-material/Kitchen";
import PaymentIcon from "@mui/icons-material/Payment";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export default function DetailRumah({ rumah, gambars }) {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % gambars.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + gambars.length) % gambars.length);
    };

    return (
        <GuestLayout>
            <Head title={`Detail Rumah - ${rumah.nama_rumah}`} />

            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto py-4 px-4">
                    <Link
                        href={route("home")}
                        className="text-blue-600 hover:underline"
                    >
                        ← Kembali ke Beranda
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto px-4 pb-10 grid lg:grid-cols-3 gap-8">
                    {/* Gambars Rumah */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow overflow-hidden">
                            <div className="relative">
                                <img
                                    src={`${gambars[currentImage]?.path}`}
                                    alt={gambars[currentImage]?.nama_gambar}
                                    className="w-full h-[450px] object-cover"
                                />
                                {gambars.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
                                        >
                                            ‹
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
                                        >
                                            ›
                                        </button>
                                    </>
                                )}
                            </div>

                            {gambars.length > 1 && (
                                <div className="flex gap-2 p-4 overflow-x-auto">
                                    {gambars.map((img, index) => (
                                        <img
                                            key={img.id}
                                            src={`${img.path}`}
                                            className={`w-20 h-20 object-cover rounded cursor-pointer ${
                                                index === currentImage
                                                    ? "ring-2 ring-blue-600"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setCurrentImage(index)
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Video Tour */}
                        {rumah.video_tour && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-2">
                                    Video Tour
                                </h3>
                                <iframe
                                    src={rumah.video_tour}
                                    className="w-full h-[300px] rounded-lg"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>

                    {/* Info Rumah */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow p-6">
                            <h1 className="text-3xl font-bold capitalize">
                                {rumah.nama_rumah}
                            </h1>
                            <p className="text-gray-600 mb-3">
                                {rumah.deskripsi || "Tidak ada deskripsi"}
                            </p>

                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                    Status: {rumah.status}
                                </span>
                                <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                                    Kode: {rumah.kode_rumah}
                                </span>
                            </div>

                            <div className="text-2xl font-bold text-blue-600 mb-4">
                                Rp{" "}
                                {parseInt(rumah.harga).toLocaleString("id-ID")}
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                                <p className="flex items-center gap-1">
                                    <LocationOnIcon fontSize="small" />{" "}
                                    {rumah.alamat}
                                </p>
                                <p className="flex items-center gap-1">
                                    <HomeWorkIcon fontSize="small" /> Tipe:{" "}
                                    {rumah.tipe?.nama_tipe || "-"}
                                </p>
                                <p className="flex items-center gap-1">
                                    <CalendarMonthIcon fontSize="small" />{" "}
                                    Tahun: {rumah.tahun_bangun}
                                </p>
                                <p className="flex items-center gap-1">
                                    <LayersIcon fontSize="small" /> Lantai:{" "}
                                    {rumah.lantai}
                                </p>
                                <p className="flex items-center gap-1">
                                    <BedIcon fontSize="small" /> Tidur:{" "}
                                    {rumah.jumlah_kamar_tidur}
                                </p>
                                <p className="flex items-center gap-1">
                                    <BathtubIcon fontSize="small" /> Mandi:{" "}
                                    {rumah.jumlah_kamar_mandi}
                                </p>
                                <p className="flex items-center gap-1">
                                    <CropSquareIcon fontSize="small" />{" "}
                                    Bangunan: {rumah.luas_bangunan} m²
                                </p>
                                <p className="flex items-center gap-1">
                                    <ForestIcon fontSize="small" /> Kelebihan:{" "}
                                    {rumah.luas_kelebihan_tanah ?? 0} m²
                                </p>
                                <p className="flex items-center gap-1">
                                    <GarageIcon fontSize="small" /> Parkiran:{" "}
                                    {rumah.parkiran}
                                </p>
                                <p className="flex items-center gap-1">
                                    <KitchenIcon fontSize="small" /> Dapur:{" "}
                                    {rumah.dapur}
                                </p>
                                <p className="flex items-center gap-1">
                                    <PaymentIcon fontSize="small" /> Pembayaran:{" "}
                                    {rumah.tipe_pembayaran}
                                </p>
                                <p className="flex items-center gap-1">
                                    <EventAvailableIcon fontSize="small" />{" "}
                                    Tersedia: {rumah.tanggal_tersedia}
                                </p>
                            </div>

                            {rumah.fasilitas_tambahan && (
                                <div className="mt-4">
                                    <h4 className="font-semibold mb-1">
                                        Fasilitas Tambahan:
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {rumah.fasilitas_tambahan}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-xl shadow p-6 space-y-4">
                            <Link
                                as="button"
                                href={route("booking.create", rumah.id)}
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
                            >
                                Booking Kunjungan
                            </Link>
                            <Link
                                as="button"
                                href={route("pemesanan.create", rumah.id)}
                                className="w-full bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 transition"
                            >
                                Permintaan Pembelian
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
