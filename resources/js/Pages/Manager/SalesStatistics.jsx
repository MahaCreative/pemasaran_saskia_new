import React from "react";

import AuthLayout from "@/Layouts/AuthLayout";

export default function SalesStatistics() {
    // Dummy data for sales statistics
    const totalSales = 120;
    const totalRevenue = 75000000000;
    const monthlySales = [
        { month: "Jan", sales: 10 },
        { month: "Feb", sales: 8 },
        { month: "Mar", sales: 12 },
        { month: "Apr", sales: 15 },
        { month: "May", sales: 9 },
        { month: "Jun", sales: 14 },
    ];

    return (
        <AuthLayout title="Statistik Penjualan - Manager">
            <div className="max-w-5xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-green-700 mb-6">
                    Statistik Penjualan Rumah
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Total Penjualan
                        </h2>
                        <p className="text-3xl font-bold text-green-600">
                            {totalSales}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Total Pendapatan
                        </h2>
                        <p className="text-3xl font-bold text-green-600">
                            Rp {totalRevenue.toLocaleString("id-ID")}
                        </p>
                    </div>
                </div>
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Penjualan Bulanan
                    </h2>
                    <ul className="space-y-2">
                        {monthlySales.map((item, index) => (
                            <li key={index} className="flex justify-between">
                                <span>{item.month}</span>
                                <span>{item.sales}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthLayout>
    );
}
