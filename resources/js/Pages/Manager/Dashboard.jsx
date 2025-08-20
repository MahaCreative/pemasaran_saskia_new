import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    PointElement, // WAJIB untuk Line Chart
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import AuthLayout from "@/Layouts/AuthLayout";

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EventIcon from "@mui/icons-material/Event";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PaymentIcon from "@mui/icons-material/Payment";
import { Card, CardContent, Typography } from "@mui/material";
export default function ManagerDashboard({
    cards,
    chartPermintaan,
    chartStatus,
    chartPembayaranBulanan,
    chartPembayaranTahunan,
    chartBooking,
}) {
    const getColorArray = (count) => {
        const colors = [
            "#4F46E5",
            "#22C55E",
            "#F97316",
            "#E11D48",
            "#0EA5E9",
            "#A855F7",
            "#FACC15",
        ];
        return Array(count)
            .fill()
            .map((_, i) => colors[i % colors.length]);
    };

    const barOptions = {
        responsive: true,
        plugins: { legend: { position: "top" } },
    };

    const pieOptions = {
        responsive: true,
        plugins: { legend: { position: "bottom" } },
    };

    const lineOptions = {
        responsive: true,
        plugins: { legend: { position: "top" } },
        tension: 0.3, // bikin garis lebih smooth
    };

    const iconMap = {
        "Total Permintaan Pembelian": <ShoppingCartIcon fontSize="large" />,
        "Permintaan Pembelian Pending ": <EventIcon fontSize="large" />,
        "Permintaan Pembelian Disetujui ": (
            <CheckCircleIcon fontSize="large" color="success" />
        ),
        "Permintaan Pembelian Ditolak ": (
            <CancelIcon fontSize="large" color="error" />
        ),
        "Total Booking ": <EventIcon fontSize="large" />,
        "Booking Pending": <EventIcon fontSize="large" />,
        "Booking Ditolak": <CancelIcon fontSize="large" color="error" />,
        "Booking Disetujui": (
            <CheckCircleIcon fontSize="large" color="success" />
        ),
        "Booking Selesai": <DoneAllIcon fontSize="large" color="primary" />,
        "Pembayaran Diterima": <PaymentIcon fontSize="large" color="success" />,
    };

    return (
        <AuthLayout>
            <div className="p-6 space-y-8">
                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5  gap-6">
                    {cards.map((card, i) => (
                        <Card
                            key={i}
                            style={{
                                background: getColorArray(cards.length)[i],
                            }}
                            className={` p-4`}
                        >
                            <CardContent
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: "1.2rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                {iconMap[card.title] || (
                                    <ShoppingCartIcon fontSize="large" />
                                )}
                                <div>
                                    <Typography variant="h6">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="h5">
                                        {card.value}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Permintaan */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="font-semibold mb-4">Permintaan</h2>
                        <Bar
                            options={barOptions}
                            data={{
                                labels: chartPermintaan.labels,
                                datasets: [
                                    {
                                        label: "Jumlah Permintaan",
                                        data: chartPermintaan.data,
                                        backgroundColor: getColorArray(
                                            chartPermintaan.data.length
                                        ),
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {/* Status Permintaan */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="font-semibold mb-4">
                                Status Permintaan Bulan Ini
                            </h2>
                            <Pie
                                options={pieOptions}
                                data={{
                                    labels: chartStatus.labels,
                                    datasets: [
                                        {
                                            label: "Status",
                                            data: chartStatus.data,
                                            backgroundColor: getColorArray(
                                                chartStatus.data.length
                                            ),
                                        },
                                    ],
                                }}
                            />
                        </div>
                        {/* Booking Bulan Ini */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="font-semibold mb-4">
                                Booking Bulan Ini
                            </h2>
                            <Pie
                                options={pieOptions}
                                data={{
                                    labels: chartBooking.labels,
                                    datasets: [
                                        {
                                            label: "Booking",
                                            data: chartBooking.data,
                                            backgroundColor: getColorArray(
                                                chartBooking.data.length
                                            ),
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>

                    {/* Pembayaran Bulanan */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="font-semibold mb-4">
                            Pembayaran Bulanan
                        </h2>
                        <Line
                            options={lineOptions}
                            data={{
                                labels: chartPembayaranBulanan.labels,
                                datasets: [
                                    {
                                        label: "Pembayaran",
                                        data: chartPembayaranBulanan.data,
                                        borderColor: "#4F46E5",
                                        backgroundColor:
                                            "rgba(79, 70, 229, 0.3)",
                                        fill: true,
                                    },
                                ],
                            }}
                        />
                    </div>

                    {/* Pembayaran Tahunan */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="font-semibold mb-4">
                            Pembayaran Tahunan
                        </h2>
                        <Bar
                            options={barOptions}
                            data={{
                                labels: chartPembayaranTahunan.labels,
                                datasets: [
                                    {
                                        label: "Pembayaran",
                                        data: chartPembayaranTahunan.data,
                                        backgroundColor: "#22C55E",
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
