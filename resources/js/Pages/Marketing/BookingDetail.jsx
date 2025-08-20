import React from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function BookingDetail({ auth, booking }) {
    const { data, setData, post, processing, errors } = useForm({
        status: booking.status,
        catatan: booking.catatan || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("marketing.booking.update", booking.id));
    };

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
        disetujui: "bg-green-100 text-green-800 border-green-300",
        ditolak: "bg-red-100 text-red-800 border-red-300",
        selesai: "bg-blue-100 text-blue-800 border-blue-300",
    };

    const getStatusText = (status) =>
        ({
            pending: "Pending",
            disetujui: "Disetujui",
            ditolak: "Ditolak",
            selesai: "Selesai",
        }[status] || status);

    return (
        <AuthLayout title="Detail Booking Kunjungan">
            <div className="px-4 md:px-8  py-8  mx-auto space-y-8">
                <div className="flex flex-col md:flex-row gap-3 items-start justify-between">
                    {/* Header */}
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold">
                                Detail Booking Kunjungan
                            </h1>
                            <span
                                className={`px-4 py-1 rounded-full text-sm font-medium border ${
                                    statusColors[booking.status]
                                }`}
                            >
                                {getStatusText(booking.status)}
                            </span>
                        </div>

                        {/* Informasi Pelanggan & Rumah */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow p-6 space-y-3">
                                <h2 className="text-lg font-semibold border-b pb-2">
                                    Informasi Pelanggan
                                </h2>
                                <p>
                                    <span className="font-medium">Nama:</span>{" "}
                                    {booking.user.name}
                                </p>
                                <p>
                                    <span className="font-medium">Email:</span>{" "}
                                    {booking.user.email}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl shadow p-6 space-y-3">
                                <h2 className="text-lg font-semibold border-b pb-2">
                                    Informasi Rumah
                                </h2>
                                <p>
                                    <span className="font-medium">
                                        Nama Rumah:
                                    </span>{" "}
                                    {booking.rumah.nama_rumah}
                                </p>
                            </div>
                        </div>

                        {/* Jadwal */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="text-lg font-semibold border-b pb-2 mb-3">
                                Jadwal Kunjungan
                            </h2>
                            <p className="text-gray-700">
                                {new Date(
                                    booking.jadwal_kunjungan
                                ).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                            <p className="text-gray-500">
                                {new Date(
                                    booking.jadwal_kunjungan
                                ).toLocaleTimeString("id-ID", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Form Update Status */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl shadow p-6 space-y-5 w-full"
                    >
                        <h2 className="text-lg font-semibold border-b pb-2">
                            Update Status Booking
                        </h2>

                        <div>
                            <label
                                htmlFor="status"
                                className="block font-medium mb-2"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 p-2"
                            >
                                <option value="pending">Pending</option>
                                <option value="disetujui">Disetujui</option>
                                <option value="ditolak">Ditolak</option>
                                <option value="selesai">Selesai</option>
                            </select>
                            {errors.status && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="catatan"
                                className="block font-medium mb-2"
                            >
                                Catatan
                            </label>
                            <textarea
                                id="catatan"
                                value={data.catatan}
                                onChange={(e) =>
                                    setData("catatan", e.target.value)
                                }
                                rows={4}
                                className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 p-2"
                            />
                            {errors.catatan && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.catatan}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-lg shadow"
                            >
                                Update Status
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}
