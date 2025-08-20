import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { formatRupiah } from '@/Hooks/FormatRupiah';
import { FaHome, FaCalendarAlt, FaMoneyBill, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function PelangganDashboard({ auth, stats, rumah, permintaan_terbaru, booking_terbaru, pembayaran_terbaru }) {
    const [quickStats, setQuickStats] = useState(stats);

    useEffect(() => {
        // Fetch quick stats
        fetch('/pelanggan/quick-stats')
            .then(res => res.json())
            .then(data => setQuickStats(data))
            .catch(err => console.error(err));
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'disetujui': return 'text-green-600 bg-green-100';
            case 'ditolak': return 'text-red-600 bg-red-100';
