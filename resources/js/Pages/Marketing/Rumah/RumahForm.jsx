import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

import InputText from "@/Components/Form/InputText";
import SelectOption from "@/Components/Form/SelectOption";
import CurrencyInput from "react-currency-input-field";
import AuthLayout from "@/Layouts/AuthLayout";

export default function RumahForm({
    rumah = {},
    tipeList = [],
    editMode = false,
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        tipe_id: rumah.tipe_id || "",
        nama_rumah: rumah.nama_rumah || "",
        harga: rumah.harga || "",
        status: rumah.status || "tersedia",
        deskripsi: rumah.deskripsi || "",
        gambar: null,
        video_tour: rumah.video_tour || "",
        alamat: rumah.alamat || "",
        latitude: rumah.latitude || "",
        longitude: rumah.longitude || "",
        luas_bangunan: rumah.luas_bangunan || "",
        luas_kelebihan_tanah: rumah.luas_kelebihan_tanah || "",
        parkiran: rumah.parkiran || "",
        dapur: rumah.dapur || "",
        jumlah_kamar_tidur: rumah.jumlah_kamar_tidur || "",
        jumlah_kamar_mandi: rumah.jumlah_kamar_mandi || "",
        lantai: rumah.lantai || 1,
        tahun_bangun: rumah.tahun_bangun || "",
        fasilitas_tambahan: rumah.fasilitas_tambahan || "",
        tipe_pembayaran: rumah.tipe_pembayaran || "keduanya",
        is_favorit: rumah.is_favorit || false,
        tanggal_tersedia: rumah.tanggal_tersedia || "",
        gambar_lain: rumah.gambars || [],
        nama_gambar_lain: [],
    });

    console.log(rumah);

    const [preview, setPreview] = useState(
        rumah.gambar ? `/storage/${rumah.gambar}` : null
    );
    const [previewGambarLain, setPreviewGambarLain] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        editMode
            ? put(route("rumah.update", rumah.id))
            : post(route("marketing.rumah.store"));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("gambar", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleGambarLainChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = [...previewGambarLain];
        const names = [...data.nama_gambar_lain];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                previews.push(reader.result);
                setPreviewGambarLain([...previews]);
            };
            reader.readAsDataURL(file);
            data.gambar_lain.push(file);
            names.push("");
        });

        setData("gambar_lain", data.gambar_lain);
        setData("nama_gambar_lain", names);
    };

    const handleNamaGambarChange = (index, value) => {
        const names = [...data.nama_gambar_lain];
        names[index] = value;
        setData("nama_gambar_lain", names);
    };

    return (
        <AuthLayout>
            <div className="max-w-6xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-6">
                    {editMode ? "Edit Rumah" : "Tambah Rumah"}
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white shadow rounded-xl p-6"
                >
                    <div className="w-full">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="gambarUtamaInput"
                        />
                        <label
                            htmlFor="gambarUtamaInput"
                            className="cursor-pointer inline-block mt-2 w-full"
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    className="w-full h-60 object-cover rounded shadow"
                                />
                            ) : (
                                <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded">
                                    Klik untuk pilih gambar
                                </div>
                            )}
                        </label>
                    </div>
                    <div className="flex flex-row w-full items-center gap-3 justify-between">
                        <div className="w-full">
                            <SelectOption
                                title="Tipe Rumah"
                                value={data.tipe_id}
                                onChange={(e) =>
                                    setData("tipe_id", e.target.value)
                                }
                                errors={errors.tipe_id}
                            >
                                <option value="">-- Pilih Tipe --</option>
                                {tipeList.map((tipe) => (
                                    <option key={tipe.id} value={tipe.id}>
                                        {tipe.nama_tipe}
                                    </option>
                                ))}
                            </SelectOption>
                        </div>

                        <div className="w-full">
                            <InputText
                                label="Nama Rumah"
                                name="nama_rumah"
                                value={data.nama_rumah}
                                onChange={(e) =>
                                    setData("nama_rumah", e.target.value)
                                }
                                error={errors.nama_rumah}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-3 w-full justify-between">
                        <div className="w-full">
                            <p>Harga Rumah</p>
                            <CurrencyInput
                                className="w-full"
                                prefix="Rp."
                                value={data.harga}
                                onValueChange={(value) =>
                                    setData("harga", value)
                                }
                            />
                            {errors.harga && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.harga}
                                </p>
                            )}
                        </div>

                        <div className="w-full ">
                            <SelectOption
                                title="Status"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                errors={errors.status}
                            >
                                <option value="tersedia">Tersedia</option>
                                <option value="dipesan">Dipesan</option>
                                <option value="terjual">Terjual</option>
                            </SelectOption>
                        </div>

                        <div className="w-full ">
                            <InputText
                                label="Video Tour (URL)"
                                name="video_tour"
                                value={data.video_tour}
                                onChange={(e) =>
                                    setData("video_tour", e.target.value)
                                }
                                error={errors.video_tour}
                            />
                        </div>
                    </div>

                    <InputText
                        label="Alamat"
                        name="alamat"
                        value={data.alamat}
                        onChange={(e) => setData("alamat", e.target.value)}
                        error={errors.alamat}
                    />

                    <div className="grid  md:grid-cols-2 gap-4">
                        <InputText
                            type="number"
                            label="Latitude"
                            name="latitude"
                            value={data.latitude}
                            onChange={(e) =>
                                setData("latitude", e.target.value)
                            }
                            error={errors.latitude}
                        />
                        <InputText
                            type="number"
                            label="Longitude"
                            name="longitude"
                            value={data.longitude}
                            onChange={(e) =>
                                setData("longitude", e.target.value)
                            }
                            error={errors.longitude}
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <InputText
                            label="Luas Bangunan"
                            name="luas_bangunan"
                            value={data.luas_bangunan}
                            onChange={(e) =>
                                setData("luas_bangunan", e.target.value)
                            }
                            error={errors.luas_bangunan}
                        />
                        <InputText
                            label="Luas Kelebihan Tanah"
                            name="luas_kelebihan_tanah"
                            value={data.luas_kelebihan_tanah}
                            onChange={(e) =>
                                setData("luas_kelebihan_tanah", e.target.value)
                            }
                            error={errors.luas_kelebihan_tanah}
                        />
                        <InputText
                            type="number"
                            label="Jumlah Kamar Tidur"
                            name="jumlah_kamar_tidur"
                            value={data.jumlah_kamar_tidur}
                            onChange={(e) =>
                                setData("jumlah_kamar_tidur", e.target.value)
                            }
                            error={errors.jumlah_kamar_tidur}
                        />
                        <InputText
                            type="number"
                            label="Jumlah Kamar Mandi"
                            name="jumlah_kamar_mandi"
                            value={data.jumlah_kamar_mandi}
                            onChange={(e) =>
                                setData("jumlah_kamar_mandi", e.target.value)
                            }
                            error={errors.jumlah_kamar_mandi}
                        />
                        <SelectOption
                            title="Parkiran"
                            value={data.parkiran}
                            onChange={(e) =>
                                setData("parkiran", e.target.value)
                            }
                            errors={errors.parkiran}
                        >
                            <option value="">
                                -- Pilih Status Parkiran --
                            </option>
                            <option value="ada">Ada</option>
                            <option value="tidak ada">Tidak Ada</option>
                        </SelectOption>
                        <SelectOption
                            title="Dapur"
                            value={data.dapur}
                            onChange={(e) => setData("dapur", e.target.value)}
                            errors={errors.dapur}
                        >
                            <option value="">-- Pilih Status Dapur --</option>
                            <option value="ada">Ada</option>
                            <option value="tidak ada">Tidak Ada</option>
                        </SelectOption>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3 w-full justify-between">
                        <InputText
                            type="number"
                            label="Lantai"
                            name="lantai"
                            placeholder={"1"}
                            value={data.lantai}
                            onChange={(e) => setData("lantai", e.target.value)}
                            error={errors.lantai}
                        />
                        <InputText
                            label="Tahun Bangun"
                            name="tahun_bangun"
                            value={data.tahun_bangun}
                            onChange={(e) =>
                                setData("tahun_bangun", e.target.value)
                            }
                            error={errors.tahun_bangun}
                        />
                        <SelectOption
                            title="Tipe Pembayaran"
                            value={data.tipe_pembayaran}
                            onChange={(e) =>
                                setData("tipe_pembayaran", e.target.value)
                            }
                            errors={errors.tipe_pembayaran}
                        >
                            <option value="cash">Cash</option>
                            <option value="kredit">Kredit</option>
                            <option value="keduanya">Keduanya</option>
                        </SelectOption>
                    </div>

                    <InputText
                        label="Fasilitas Tambahan"
                        name="fasilitas_tambahan"
                        value={data.fasilitas_tambahan}
                        onChange={(e) =>
                            setData("fasilitas_tambahan", e.target.value)
                        }
                        error={errors.fasilitas_tambahan}
                    />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.is_favorit}
                            onChange={(e) =>
                                setData("is_favorit", e.target.checked)
                            }
                        />
                        <label>Jadikan Favorit</label>
                    </div>

                    <InputText
                        label="Tanggal Tersedia"
                        name="tanggal_tersedia"
                        type="date"
                        value={data.tanggal_tersedia}
                        onChange={(e) =>
                            setData("tanggal_tersedia", e.target.value)
                        }
                        error={errors.tanggal_tersedia}
                    />

                    <InputText
                        label="Deskripsi"
                        name="deskripsi"
                        value={data.deskripsi}
                        onChange={(e) => setData("deskripsi", e.target.value)}
                        error={errors.deskripsi}
                    />

                    <div>
                        <label>Gambar Lain</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleGambarLainChange}
                            accept="image/*"
                            className="mt-2"
                        />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {previewGambarLain.map((preview, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-1"
                                >
                                    {preview ? (
                                        <img
                                            src={preview}
                                            className="w-32 h-24 object-cover rounded shadow"
                                        />
                                    ) : (
                                        <div className="w-32 h-24 bg-gray-200 flex items-center justify-center rounded">
                                            +
                                        </div>
                                    )}
                                    <InputText
                                        name={`nama_gambar_lain_${index}`}
                                        value={
                                            data.nama_gambar_lain[index] || ""
                                        }
                                        onChange={(e) =>
                                            handleNamaGambarChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        error={errors.nama_gambar_lain?.[index]}
                                        placeholder="Nama gambar"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {rumah.gambars && rumah.gambars.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {rumah.gambars.map((gambar, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={"/storage/" + gambar.path}
                                        alt={`Gambar Lain ${index + 1}`}
                                        className="w-32 h-24 object-cover rounded shadow"
                                    />
                                    <InputText
                                        disabled
                                        value={gambar.nama_gambar}
                                        onChange={(e) =>
                                            handleNamaGambarChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        error={errors.nama_gambar_lain?.[index]}
                                        placeholder="Nama gambar"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition"
                    >
                        {editMode ? "Update Rumah" : "Tambah Rumah"}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}
