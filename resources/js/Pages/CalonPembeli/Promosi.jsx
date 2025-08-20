import GuestLayout from "@/Layouts/GuestLayout";
import moment from "moment";
import React from "react";

export default function Promosi({ promosi }) {
    return (
        <GuestLayout>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center">
                        Promo Rumah Terbaru
                    </h2>

                    {promosi && promosi.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {promosi.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-green-100 overflow-hidden"
                                >
                                    {item.gambar && (
                                        <img
                                            src={"/storage/" + item.gambar}
                                            alt={item.judul}
                                            className="w-full h-40 object-cover"
                                        />
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                                            {item.judul}
                                        </h3>
                                        <p
                                            className="text-gray-600 mb-3 text-sm leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: item.deskripsi,
                                            }}
                                        />

                                        <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                                            Periode:{" "}
                                            {moment(item.periode_mulai).format(
                                                "D-M-Y"
                                            )}{" "}
                                            -{" "}
                                            {moment(
                                                item.periode_selesai
                                            ).format("D-M-Y")}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 text-sm mt-10">
                            Belum ada promosi aktif saat ini.
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
