import AuthLayout from "@/Layouts/AuthLayout";

import { Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function Index({ rumahs, tipes }) {
    const [selectedTipe, setSelectedTipe] = useState("");
    const [search, setSearch] = useState("");
    const [hargaMin, setHargaMin] = useState("");
    const [hargaMax, setHargaMax] = useState("");

    const filteredRumah = rumahs.data.filter((rumah) => {
        const matchTipe = selectedTipe
            ? rumah.tipe_id === parseInt(selectedTipe)
            : true;
        const matchNama = rumah.nama_rumah
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchLokasi = rumah.alamat
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchHarga =
            (!hargaMin || rumah.harga >= parseFloat(hargaMin)) &&
            (!hargaMax || rumah.harga <= parseFloat(hargaMax));

        return matchTipe && (matchNama || matchLokasi) && matchHarga;
    });

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);
    };

    return (
        <AuthLayout>
            <div className="min-h-screen bg-gray-50 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Filter */}
                    <div className="grid md:grid-cols-4 gap-4 mb-10">
                        <select
                            value={selectedTipe}
                            onChange={(e) => setSelectedTipe(e.target.value)}
                            className="p-3 rounded border border-gray-300"
                        >
                            <option value="">Semua Tipe</option>
                            {tipes.map((tipe) => (
                                <option key={tipe.id} value={tipe.id}>
                                    {tipe.nama_tipe}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Cari nama atau lokasi"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-3 rounded border border-gray-300"
                        />

                        <input
                            type="number"
                            placeholder="Harga Min"
                            value={hargaMin}
                            onChange={(e) => setHargaMin(e.target.value)}
                            className="p-3 rounded border border-gray-300"
                        />

                        <input
                            type="number"
                            placeholder="Harga Max"
                            value={hargaMax}
                            onChange={(e) => setHargaMax(e.target.value)}
                            className="p-3 rounded border border-gray-300"
                        />
                    </div>
                    <Link
                        href={route("marketing.rumah.create")}
                        as="button"
                        className="py-2 px-3 rounded-md bg-blue-600 text-white"
                    >
                        Tambah Rumah
                    </Link>
                    {/* Grid Rumah */}
                    {filteredRumah.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredRumah.map((rumah) => (
                                <div
                                    key={rumah.id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 overflow-hidden"
                                >
                                    <div className="relative">
                                        {rumah.gambar && (
                                            <img
                                                src={"/storage/" + rumah.gambar}
                                                alt={rumah.nama_rumah}
                                                className="w-full h-52 object-cover"
                                            />
                                        )}
                                        <div className="absolute top-2 right-2 flex gap-2">
                                            <Link
                                                href={route(
                                                    "marketing.rumah.destroy",
                                                    rumah.id
                                                )}
                                                method="delete"
                                                as="button"
                                                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow"
                                            >
                                                Hapus
                                            </Link>
                                            <Link
                                                href={route(
                                                    "rumah.detail",
                                                    rumah.id
                                                )}
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded shadow"
                                            >
                                                Lihat
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="p-5 space-y-2">
                                        <h3 className="text-xl font-semibold text-gray-800 capitalize">
                                            {rumah.nama_rumah}
                                        </h3>
                                        <p className="text-green-600 font-bold">
                                            {formatRupiah(rumah.harga)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {rumah.alamat}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {rumah.jumlah_kamar_tidur} Kamar
                                            Tidur • {rumah.jumlah_kamar_mandi}{" "}
                                            Kamar Mandi
                                        </p>

                                        <span
                                            className={`text-xs px-3 py-1 rounded-full font-semibold inline-block mt-3 ${
                                                rumah.status === "tersedia"
                                                    ? "bg-green-100 text-green-700"
                                                    : rumah.status === "dipesan"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {rumah.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 text-lg mt-10">
                            Tidak ada rumah yang sesuai dengan filter.
                        </div>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
}
