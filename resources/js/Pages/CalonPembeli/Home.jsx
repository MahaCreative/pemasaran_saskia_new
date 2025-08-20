import GuestLayout from "@/Layouts/GuestLayout";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import CurrencyInput from "react-currency-input-field";
import { debounce } from "@mui/material";

export default function Home(props) {
    const { tipe, rumah } = props;

    const [params, setParams] = useState({ tipe: "" });
    const [stats, setStats] = useState({
        totalDevelopment: 0,
        developed: 0,
        clusters: 0,
        families: 0,
    });
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    const finalStats = {
        totalDevelopment: 2500,
        developed: 1500,
        clusters: 1,
        families: 253,
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setVisible(true);
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    useEffect(() => {
        if (visible) {
            let interval = setInterval(() => {
                setStats({
                    totalDevelopment: Math.floor(Math.random() * 3000),
                    developed: Math.floor(Math.random() * 2000),
                    clusters: Math.floor(Math.random() * 10),
                    families: Math.floor(Math.random() * 500),
                });
            }, 200);

            setTimeout(() => {
                clearInterval(interval);
                setStats(finalStats);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [visible]);

    const rumahFiltered =
        params.tipe === ""
            ? rumah
            : rumah.filter((item) => item.tipe_id === params.tipe);

    return (
        <div>
            {/* Hero */}
            <div className="bg-secondary py-28 px-4 md:px-8 lg:px-24">
                <div className="flex flex-col-reverse md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/2">
                        <div
                            ref={sectionRef}
                            className="grid grid-cols-2 gap-6 text-white"
                        >
                            {[
                                {
                                    label: "Total Pengembangan",
                                    value: stats.totalDevelopment,
                                    unit: "ha",
                                },
                                {
                                    label: "Telah Dikembangkan",
                                    value: stats.developed,
                                    unit: "ha",
                                },
                                {
                                    label: "Cluster",
                                    value: stats.clusters,
                                    unit: "",
                                },
                                {
                                    label: "Kepala Keluarga",
                                    value: stats.families,
                                    unit: "kk",
                                },
                            ].map((item, i) => (
                                <div key={i}>
                                    <p className="font-extrabold text-green-400 text-5xl">
                                        {item.value}{" "}
                                        <sup className="text-white font-light text-lg">
                                            {item.unit}
                                        </sup>
                                    </p>
                                    <p className="text-white font-light tracking-tight">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                            Temukan{" "}
                            <span className="text-green-500">Rumah Impian</span>{" "}
                            untuk keluarga Anda
                        </h1>
                        <p className="text-white font-light tracking-tight">
                            Rumah bukan sekadar tempat tinggal, tetapi tempat di
                            mana kebahagiaan dan kenyamanan keluarga bermula.
                        </p>
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="flex flex-col md:flex-row py-16 px-4 md:px-8 lg:px-24 items-center gap-10">
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">
                        Tentang Kami
                    </h2>
                    <p className="text-secondary font-light mb-4 tracking-tight">
                        BTN Maccinna House hadir sebagai platform inovatif untuk
                        membantu Anda menemukan hunian impian yang nyaman dan
                        modern.
                    </p>
                    <p className="text-secondary font-light tracking-tight">
                        Kami menawarkan gaya hidup melalui rumah berkualitas
                        dengan desain elegan, lingkungan asri, dan fasilitas
                        terbaik.
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <img
                        src="/storage/Image/about.jpg"
                        alt="Tentang Kami"
                        className="w-full rounded-xl shadow-md object-cover"
                    />
                </div>
            </div>

            {/* Rumah List */}
            <div className="py-16 px-4 md:px-8 lg:px-24">
                <h2 className="text-center text-3xl md:text-5xl font-bold text-secondary mb-10">
                    Temukan{" "}
                    <span className="text-green-500">Rumah Impian Anda</span>
                </h2>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <button
                        onClick={() => setParams({ ...params, tipe: "" })}
                        className={`px-5 py-2 rounded-full text-sm md:text-base transition-all ${
                            params.tipe === ""
                                ? "bg-green-500 text-white shadow-md scale-105"
                                : "bg-gray-100 text-secondary hover:bg-green-100"
                        }`}
                    >
                        Semua Tipe
                    </button>
                    {tipe.map((item) => (
                        <button
                            key={item.id}
                            onClick={() =>
                                setParams({ ...params, tipe: item.id })
                            }
                            className={`px-5 py-2 rounded-full text-sm md:text-base transition-all ${
                                params.tipe === item.id
                                    ? "bg-green-500 text-white shadow-md scale-105"
                                    : "bg-gray-100 text-secondary hover:bg-green-100"
                            }`}
                        >
                            Tipe {item.nama_tipe}
                        </button>
                    ))}
                </div>

                {/* Rumah Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rumahFiltered.map((item) => (
                        <Link
                            key={item.id}
                            href={route("rumah.detail", item.id)}
                            className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-transform transform hover:scale-105"
                        >
                            <img
                                src={"/storage/" + item.gambar}
                                alt={item.nama_rumah}
                                className="w-full h-[200px] object-cover"
                            />
                            <div className="p-4">
                                <h3 className="capitalize text-lg font-bold text-gray-800 mb-2">
                                    {item.nama_rumah}
                                </h3>
                                <p className="text-green-600 font-semibold text-lg mb-2">
                                    <CurrencyInput
                                        disabled
                                        prefix="Rp. "
                                        value={item.harga}
                                        className="p-0 bg-inherit outline-none border-none text-green-600 font-bold text-lg"
                                    />
                                </p>
                                {item.deskripsi && (
                                    <p className="text-gray-600 text-sm line-clamp-4">
                                        {item.deskripsi}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => <GuestLayout children={page} judul={"Home"} />;
