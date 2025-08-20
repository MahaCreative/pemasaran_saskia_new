import GuestLayout from "@/Layouts/GuestLayout";
import React, { useState } from "react";

export default function Galeri({ galeri }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % galeri.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? galeri.length - 1 : prev - 1));
    };

    return (
        <GuestLayout>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                        Galeri Rumah
                    </h2>

                    {galeri && galeri.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {galeri.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                                    onClick={() => openModal(index)}
                                >
                                    <img
                                        src={"/storage/" + item.path}
                                        alt={item.nama_gambar}
                                        className="w-full h-52 object-cover"
                                    />
                                    <div className="p-4 space-y-1">
                                        <div className="text-lg font-semibold text-gray-700 capitalize">
                                            {item.rumah?.nama_rumah ||
                                                "Tipe Tidak Diketahui"}
                                        </div>
                                        <div className="text-gray-500 text-sm capitalize">
                                            {item.nama_gambar}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 text-lg">
                            Belum ada gambar rumah yang tersedia.
                        </div>
                    )}
                </div>

                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white p-4 rounded-lg max-w-4xl w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
                            >
                                ❌
                            </button>
                            <img
                                src={"/storage/" + galeri[currentIndex].path}
                                alt={galeri[currentIndex].nama_gambar}
                                className="w-full max-h-[70vh] object-contain"
                            />
                            <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
                                <button
                                    onClick={prevImage}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    ⬅ Prev
                                </button>
                                <span>{galeri[currentIndex].nama_gambar}</span>
                                <button
                                    onClick={nextImage}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Next ➡
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
