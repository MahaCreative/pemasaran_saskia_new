import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

export default function ProfileKantor({ profile }) {
    return (
        <GuestLayout judul={"Profile Kantor"}>
            <div className="min-h-screen bg-green-50 flex items-center justify-center py-10 px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
                    {profile ? (
                        <>
                            {/* Header dengan gambar kantor & logo */}
                            <div className="relative">
                                {profile.foto_kantor && (
                                    <img
                                        src={profile.foto_kantor}
                                        alt="Foto Kantor"
                                        className="w-full h-64 object-cover"
                                    />
                                )}
                                {profile.logo && (
                                    <img
                                        src={profile.logo}
                                        alt="Logo"
                                        className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-4 border-white shadow-lg bg-white object-cover"
                                    />
                                )}
                            </div>

                            {/* Body Konten */}
                            <div className="p-6 md:p-8">
                                <h2 className="text-3xl font-bold text-green-700 mb-4">
                                    {profile.nama_kantor}
                                </h2>

                                {/* Pemilik */}
                                <div className="flex items-center gap-4 mb-6">
                                    {profile.foto_pemilik && (
                                        <img
                                            src={profile.foto_pemilik}
                                            alt="Foto Pemilik"
                                            className="w-16 h-16 rounded-full object-cover shadow-md"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold text-gray-700">
                                            Pemilik
                                        </p>
                                        <p className="text-gray-600">
                                            {profile.nama_pemilik}
                                        </p>
                                    </div>
                                </div>

                                {/* Informasi */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                                    <div>
                                        <p className="font-semibold">Alamat</p>
                                        <p className="text-gray-600">
                                            {profile.alamat}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Telepon</p>
                                        <p className="text-gray-600">
                                            {profile.telepon}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <p className="text-gray-600">
                                            {profile.email}
                                        </p>
                                    </div>
                                    {profile.website && (
                                        <div>
                                            <p className="font-semibold">
                                                Website
                                            </p>
                                            <a
                                                href={profile.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:underline"
                                            >
                                                {profile.website}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Deskripsi */}
                                {profile.deskripsi && (
                                    <div className="mt-6">
                                        <p className="font-semibold text-gray-700 mb-2">
                                            Deskripsi
                                        </p>
                                        <p
                                            className="text-gray-600 leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: profile.deskripsi,
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Peta Lokasi */}
                                {profile.lat && profile.long && (
                                    <div className="mt-6">
                                        <p className="font-semibold text-gray-700 mb-2">
                                            Lokasi
                                        </p>
                                        <iframe
                                            src={`https://www.google.com/maps?q=${profile.lat},${profile.long}&hl=es;z=14&output=embed`}
                                            width="100%"
                                            height="250"
                                            className="rounded-lg border"
                                            loading="lazy"
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="p-10 text-center text-gray-500">
                            Data kantor belum tersedia.
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
