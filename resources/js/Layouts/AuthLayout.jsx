import Sidebar from "@/Components/Auth/Sidebar";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    MessageOutlined,
    MessageRounded,
    Notifications,
    Widgets,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export default function AuthLayout({ children, title, prevRoute, ...props }) {
    const { auth, profile_perumahan } = usePage().props;
    const [openSidebar, setOpenSidebar] = useState(false);
    const { notif_permohonan } = usePage().props;
    const { notif_berkas } = usePage().props;
    const { notif_booking } = usePage().props;
    const badgeRef = useRef();
    const messageRef = useRef();
    const accountRef = useRef();
    const [badgeOpen, setBadgeOpen] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    useEffect(() => {
        const letHandler = (event) => {
            if (badgeRef.current && !badgeRef.current.contains(event.target)) {
                setBadgeOpen(false);
            }
            if (
                messageRef.current &&
                !messageRef.current.contains(event.target)
            ) {
                setMessageOpen(false);
            }
            if (
                accountRef.current &&
                !accountRef.current.contains(event.target)
            ) {
                setAccountOpen(false);
            }
        };
        document.addEventListener("mousedown", letHandler);
        return () => {
            document.removeEventListener("mousedown", letHandler);
        };
    });

    return (
        <div className="relative">
            {/* navbar */}
            <Head title={title} />
            <div className="flex justify-between items-center bg-primary">
                <div className="flex gap-x-4 items-center px-3 py-2 w-full">
                    <button
                        onClick={() => setOpenSidebar(true)}
                        className="text-white hover:text-slate-400 useTransition text-xl leading-4"
                    >
                        <Widgets color="inherit" fontSize="inherit" />
                    </button>
                    <p className="font-inter text-white font-bold leading-4">
                        {profile_perumahan?.nama_kantor}
                    </p>
                </div>
                <div className="mr-8 relative flex items-center">
                    <div
                        onClick={() => setAccountOpen(true)}
                        className="flex items-center text-sm tracking-tighter w-40 hover:bg-blue-900 hover:text-white useTransition hover:cursor-pointer gap-2 py-3 px-4 text-white font-semibold"
                    >
                        <img
                            src={`/storage/${auth.user.avatar}`}
                            alt=""
                            className="w-8 rounded-full h-8 object-cover object-center"
                        />
                        <p>
                            {auth.user
                                ? auth.user.nama_lengkap
                                : "tidak ada login"}
                        </p>
                    </div>
                    {/* account Menu */}
                    <div
                        ref={accountRef}
                        className={`${
                            accountOpen ? "h-[84px] px-4 py-3" : "h-0"
                        } overflow-hidden useTransition absolute top-16 left-0     bg-white shadow shadow-gray-500 z-[55] rounded-md`}
                    >
                        <Link
                            // href={route("auth.profile-saya")}
                            className="flex gap-3 items-center hover:cursor-pointer hover:bg-blue-900 hover:text-white useTransition px-4 rounded-md border-b border-blue-900"
                        >
                            <div className="h-4 w-4 rounded-full bg-blue-900"></div>
                            <p className="text-xs tracking-tighter leading-4 py-2 ">
                                Setting Profile
                            </p>
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            className="flex gap-3 items-center hover:cursor-pointer hover:bg-blue-900 hover:text-white useTransition px-4 rounded-md border-b border-blue-900"
                        >
                            <div className="h-4 w-4 rounded-full bg-red-500"></div>
                            <p className="text-xs tracking-tighter leading-4  py-2 ">
                                Logout
                            </p>
                        </Link>
                    </div>
                    {auth.user && auth.user.role == "marketing" && (
                        <>
                            <Badge
                                onClick={() => setBadgeOpen(true)}
                                className="hover:bg-blue-900 text-white useTransition hover:cursor-pointer py-3 px-4 rounded-md"
                            >
                                <Notifications />
                            </Badge>
                            {/* Notif */}
                            <div
                                ref={badgeRef}
                                className={`${
                                    badgeOpen ? "h-[165px] px-4 py-3" : "h-0"
                                } overflow-hidden useTransition absolute top-16 right-0     bg-white shadow shadow-gray-500 z-[55] rounded-md`}
                            >
                                {notif_permohonan >= 1 && (
                                    <Link
                                        href={route("auth.permohonan-kredit")}
                                        className="flex gap-3 items-center hover:cursor-pointer hover:bg-blue-900 hover:text-white useTransition px-4 rounded-md border-b border-blue-900"
                                    >
                                        <div className="h-4 w-6 rounded-full bg-red-500"></div>
                                        <p className="text-xs tracking-tighter leading-4  py-2 ">
                                            Terdapat {notif_permohonan}{" "}
                                            Permintaan Kredit Menunggu
                                            dikonfirmasi
                                        </p>
                                    </Link>
                                )}
                                {notif_berkas >= 1 && (
                                    <Link
                                        href={route("auth.booking-kunjungan")}
                                        className="flex gap-3 items-center hover:cursor-pointer hover:bg-blue-900 hover:text-white useTransition px-4 rounded-md border-b border-blue-900"
                                    >
                                        <div className="h-4 w-6 rounded-full bg-red-500"></div>
                                        <p className="text-xs tracking-tighter leading-4 py-2 ">
                                            Terdapat {notif_berkas} Berkas
                                            Permohonan Kredit Menunggu
                                            dikonfirmasi
                                        </p>
                                    </Link>
                                )}
                                {notif_booking >= 1 && (
                                    <>
                                        <Link
                                            href={route(
                                                "auth.booking-kunjungan"
                                            )}
                                            className="flex gap-3 items-center hover:cursor-pointer hover:bg-blue-900 hover:text-white useTransition px-4 rounded-md border-b border-blue-900"
                                        >
                                            <div className="h-4 w-6 rounded-full bg-red-500"></div>
                                            <p className="text-xs tracking-tighter leading-4 py-2 ">
                                                Terdapat {notif_booking}{" "}
                                                Permintaan Booking Kunjungan
                                                Menunggu dikonfirmasi
                                            </p>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
                {/* profile */}
                <div></div>
            </div>
            {/* sidebar */}
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="py-5">
                <div className="flex gap-3 items-center px-4 md:px-8 lg:px-16">
                    <Link
                        href={route("dashboard")}
                        className="text-lg text-blue-900"
                    >
                        Dashboard
                    </Link>
                    <p>/</p>
                    {prevRoute && (
                        <>
                            {prevRoute}
                            <p>/</p>
                        </>
                    )}
                    <Link
                        href=""
                        className="text-blue-600  text-lg cursor-default"
                    >
                        {title}
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
