import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import LoadingOverlay from "@/Components/LoadingOverlay";
import { useLoading } from "@/Hooks/useLoading";
import ResponseAlert from "@/Hooks/ResponseAlert";

const dummyPromosi = [
    {
        id: 1,
        judul: "Promo Diskon 10%",
        deskripsi: "Diskon 10% untuk pembelian rumah tipe 36.",
        periode_mulai: "2024-01-01",
        periode_selesai: "2024-01-31",
    },
    {
        id: 2,
        judul: "Promo Cicilan Ringan",
        deskripsi: "Cicilan ringan selama 12 bulan tanpa bunga.",
        periode_mulai: "2024-02-01",
        periode_selesai: "2024-02-28",
    },
];

export default function PromosiManagement() {
    const [promosiList, setPromosiList] = useState(dummyPromosi);
    const [form, setForm] = useState({
        judul: "",
        deskripsi: "",
        periode_mulai: "",
        periode_selesai: "",
    });
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        if (
            !form.judul ||
            !form.deskripsi ||
            !form.periode_mulai ||
            !form.periode_selesai
        )
            return;

        startLoading("Menambahkan promosi...");

        try {
            // Simulate API call - replace with actual API
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const newPromosi = {
                id: promosiList.length + 1,
                ...form,
            };
            setPromosiList([...promosiList, newPromosi]);
            setForm({
                judul: "",
                deskripsi: "",
                periode_mulai: "",
                periode_selesai: "",
            });

            showResponse(
                "success",
                "Berhasil!",
                "Promosi berhasil ditambahkan"
            );
        } catch (error) {
            showResponse("error", "Gagal!", "Gagal menambahkan promosi");
        } finally {
            stopLoading();
        }
    };

    const handleEdit = (id) => {
        const promosi = promosiList.find((p) => p.id === id);
        setForm({
            judul: promosi.judul,
            deskripsi: promosi.deskripsi,
            periode_mulai: promosi.periode_mulai,
            periode_selesai: promosi.periode_selesai,
        });
        setEditingId(id);
    };

    const handleUpdate = () => {
        setPromosiList(
            promosiList.map((p) => (p.id === editingId ? { ...p, ...form } : p))
        );
        setForm({
            judul: "",
            deskripsi: "",
            periode_mulai: "",
            periode_selesai: "",
        });
        setEditingId(null);
    };

    const handleDelete = (id) => {
        setPromosiList(promosiList.filter((p) => p.id !== id));
    };

    return (
        <AuthenticatedLayout title="Kelola Promosi - Manager">
            <div className="max-w-5xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-green-700 mb-6">
                    Kelola Promosi
                </h1>

                <div className="mb-6 space-y-2">
                    <input
                        type="text"
                        name="judul"
                        placeholder="Judul"
                        value={form.judul}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                    />
                    <textarea
                        name="deskripsi"
                        placeholder="Deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                    />
                    <input
                        type="date"
                        name="periode_mulai"
                        value={form.periode_mulai}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                    />
                    <input
                        type="date"
                        name="periode_selesai"
                        value={form.periode_selesai}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                    />
                    {editingId ? (
                        <PrimaryButton onClick={handleUpdate}>
                            Update
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton onClick={handleAdd}>
                            Tambah
                        </PrimaryButton>
                    )}
                </div>

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-green-100">
                            <th className="border border-gray-300 px-4 py-2">
                                Judul
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Deskripsi
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Periode Mulai
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Periode Selesai
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {promosiList.map((promosi) => (
                            <tr key={promosi.id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {promosi.judul}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {promosi.deskripsi}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {promosi.periode_mulai}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {promosi.periode_selesai}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(promosi.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(promosi.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
