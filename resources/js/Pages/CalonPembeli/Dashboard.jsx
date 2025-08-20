import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function CalonPembeliDashboard({
    auth,
    rumahList,
    promosiList,
}) {
    return (
        <AuthLayout title="Dashboard Calon Pelanggan" auth={auth}>
            <div className="px-4 md:px-8 lg:px-16 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Selamat Datang Kembali!
                        </h3>
                        <p className="text-gray-600">
                            Halo {auth.user.name}, selamat datang di dashboard
                            Anda.
                        </p>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Cara Membeli Rumah
                    </h2>
                    <ol className="list-decimal list-inside text-gray-600 space-y-2">
                        <li>Telusuri rumah yang tersedia di katalog</li>
                        <li>
                            Ajukan permintaan pembelian untuk rumah pilihan Anda
                        </li>
                        <li>Tunggu persetujuan dari tim marketing</li>
                        <li>Lakukan pembayaran sesuai rencana cicilan</li>
                        <li>Terima kunci rumah setelah pelunasan</li>
                    </ol>
                </div>
            </div>
        </AuthLayout>
    );
}
