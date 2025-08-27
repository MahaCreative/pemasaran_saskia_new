import React, { useState } from "react";

import PrimaryButton from "@/Components/PrimaryButton";
import AuthLayout from "@/Layouts/AuthLayout";

const dummyRumah = [
    { id: 1, nama: "Rumah A", tipe: "Tipe 36", harga: 500000000 },
    { id: 2, nama: "Rumah B", tipe: "Tipe 45", harga: 750000000 },
];

export default function Rumah() {
    const [rumahList, setRumahList] = useState(dummyRumah);
    const [form, setForm] = useState({ nama: "", tipe: "", harga: "" });
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        if (!form.nama || !form.tipe || !form.harga) return;
        const newRumah = {
            id: rumahList.length + 1,
            nama: form.nama,
            tipe: form.tipe,
            harga: parseInt(form.harga),
        };
        setRumahList([...rumahList, newRumah]);
        setForm({ nama: "", tipe: "", harga: "" });
    };

    const handleEdit = (id) => {
        const rumah = rumahList.find((r) => r.id === id);
        setForm({
            nama: rumah.nama,
            tipe: rumah.tipe,
            harga: rumah.harga.toString(),
        });
        setEditingId(id);
    };

    const handleUpdate = () => {
        setRumahList(
            rumahList.map((r) =>
                r.id === editingId
                    ? { ...r, ...form, harga: parseInt(form.harga) }
                    : r
            )
        );
        setForm({ nama: "", tipe: "", harga: "" });
        setEditingId(null);
    };

    const handleDelete = (id) => {
        setRumahList(rumahList.filter((r) => r.id !== id));
    };

    return (
        <AuthLayout title="Kelola Rumah - Marketing">
            <div className="max-w-5xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-green-700 mb-6">
                    Kelola Data Rumah
                </h1>

                <div className="mb-6">
                    <input
                        type="text"
                        name="nama"
                        placeholder="Nama Rumah"
                        value={form.nama}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 mr-2"
                    />
                    <input
                        type="text"
                        name="tipe"
                        placeholder="Tipe Rumah"
                        value={form.tipe}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 mr-2"
                    />
                    <input
                        type="number"
                        name="harga"
                        placeholder="Harga"
                        value={form.harga}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 mr-2"
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
                                Nama
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Tipe
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Harga
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rumahList.map((rumah) => (
                            <tr key={rumah.id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {rumah.nama}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {rumah.tipe}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    Rp {rumah.harga.toLocaleString("id-ID")}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(rumah.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(rumah.id)}
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
        </AuthLayout>
    );
}
