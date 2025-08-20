import React, { useState } from "react";
import { formatRupiah } from "@/Hooks/FormatRupiah";

export default function SelectPermintaanModal({
    permintaanPembelians,
    onSelect,
    onClose,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPermintaan, setSelectedPermintaan] = useState(null);

    const filteredPermintaan = permintaanPembelians.filter(
        (permintaan) =>
            permintaan.kode_permintaan
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            permintaan.user.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            permintaan.rumah.alamat
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const handleSelect = (permintaan) => {
        setSelectedPermintaan(permintaan);
    };

    const handleConfirm = () => {
        if (selectedPermintaan) {
            onSelect(selectedPermintaan);
        }
    };

    return (
        <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                Pilih Permintaan Pembelian
            </h3>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Cari berdasarkan kode, nama pembeli, atau alamat rumah..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* List */}
            <div className="max-h-96 overflow-y-auto">
                {filteredPermintaan.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">
                        Tidak ada data permintaan pembelian
                    </p>
                ) : (
                    <div className="space-y-2">
                        {filteredPermintaan.map((permintaan) => (
                            <div
                                key={permintaan.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                    selectedPermintaan?.id === permintaan.id
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:bg-gray-50"
                                }`}
                                onClick={() => handleSelect(permintaan)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {permintaan.kode_permintaan}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {permintaan.user.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {permintaan.rumah.alamat}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">
                                            {formatRupiah(
                                                permintaan.total_harga_rumah
                                            )}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Cicilan:{" "}
                                            {formatRupiah(
                                                permintaan.jumlah_cicilan_per_bulan
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                                    <span>Status: {permintaan.status}</span>
                                    <span>
                                        Jangka: {permintaan.jangka_waktu} bulan
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Batal
                </button>
                <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={!selectedPermintaan}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Pilih
                </button>
            </div>
        </div>
    );
}
