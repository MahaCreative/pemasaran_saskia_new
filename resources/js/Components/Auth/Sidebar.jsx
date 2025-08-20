import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    Info,
    Apartment,
    Image,
    LocalOffer,
    Person,
    Assessment,
    People,
    ExitToApp,
    Money,
    BookOnline,
    Drafts,
    CardTravel,
    PaymentOutlined,
    LockClock,
    RequestPage,
    LocationCity,
    Report,
} from "@mui/icons-material";

export default function Sidebar({ open, setOpen }) {
    const { auth } = usePage().props;
    return (
        <>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed top-0 left-0 w-full h-full bg-black/30 z-[77]"
                ></div>
            )}
            <div
                className={`fixed top-0 left-0 h-full bg-white z-[88] w-64 transform transition-transform duration-300 ease-in-out ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold text-blue-900">
                        Macinna House
                    </h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href={route("profile.edit")}
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                            >
                                <Person className="w-5 h-5 mr-2" />
                                My Profile
                            </Link>
                        </li>
                        {/* Manager Routes */}
                        {auth.user.role === "manager" && (
                            <>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <Assessment className="w-5 h-5 mr-2" />
                                        Manager Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "manager.kantor-profile.index"
                                        )}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <LocationCity className="w-5 h-5 mr-2" />
                                        Profile Kantor
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("user.index")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <People className="w-5 h-5 mr-2" />
                                        User Management
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "marketing.pembayaran-cicilan.index"
                                        )}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <PaymentOutlined className="w-5 h-5 mr-2" />
                                        Pembayaran Cicilan
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("manager.laporan.rumah")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <Report className="w-5 h-5 mr-2" />
                                        Laporan Rumah
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "manager.laporan.permintaan-pembelian"
                                        )}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <Report className="w-5 h-5 mr-2" />
                                        Laporan Permintaan Pembelian
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "manager.laporan.booking-kunjungan"
                                        )}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <Report className="w-5 h-5 mr-2" />
                                        Laporan Booking Kunjungan
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "manager.laporan.pembayaran-cicilan"
                                        )}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <Report className="w-5 h-5 mr-2" />
                                        Laporan Pembayaran
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Marketing Routes */}
                        {auth.user.role === "marketing" && (
                            <>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <Assessment className="w-5 h-5 mr-2" />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("marketing.rumah.index")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <Apartment className="w-5 h-5 mr-2" />
                                        Rumah Management
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "marketing.permintaan_pembelian.index"
                                        )}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <RequestPage className="w-5 h-5 mr-2" />
                                        Permintaan Pembelian
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("marketing.booking.index")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <LockClock className="w-5 h-5 mr-2" />
                                        Permintaan Booking
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "marketing.pembayaran-cicilan.index"
                                        )}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <PaymentOutlined className="w-5 h-5 mr-2" />
                                        Pembayaran Cicilan
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={route("marketing.promosi.index")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <LocalOffer className="w-5 h-5 mr-2" />
                                        Promosi
                                    </Link>
                                </li>
                            </>
                        )}
                        {/* Calon Pelanggan Routes */}
                        {auth.user.role === "pelanggan" && (
                            <>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <Assessment className="w-5 h-5 mr-2" />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("pemesanan.index")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <CardTravel className="w-5 h-5 mr-2" />
                                        History Pengajuan Pembelian
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("booking.index")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <BookOnline className="w-5 h-5 mr-2" />
                                        History Booking Kunjungan
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link
                                        href={route("riwayat-pembayaran.index")}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                                    >
                                        <Money className="w-5 h-5 mr-2" />
                                        Riwayat Pembayaran
                                    </Link>
                                </li> */}
                            </>
                        )}
                        <li>
                            <Link
                                href={route("logout")}
                                method="post"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100"
                            >
                                <ExitToApp className="w-5 h-5 mr-2" />
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
