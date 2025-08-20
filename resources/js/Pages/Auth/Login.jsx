import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Hooks/ResponseAlert";

export default function Login() {
    const { showResponse } = ResponseAlert();
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onSuccess: () => {
                showResponse("success", "Login Berhasil", "Login berhasil");
            },
            onError: () => {
                showResponse(
                    "error",
                    "Login Gagal",
                    "Periksa kembali isian anda"
                );
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-500">
            <Head title="Login" />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center mb-2">
                        <svg
                            className="h-12 w-12 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-green-700">
                        Masuk ke Akun Anda
                    </h2>
                    <p className="text-sm text-gray-500">
                        Macinna House Property Management System
                    </p>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full px-3 py-2 border rounded"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError
                            message={errors.email}
                            className="mt-2 text-red-600 text-sm"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full px-3 py-2 border rounded"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2 text-red-600 text-sm"
                        />
                    </div>
                    <PrimaryButton
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
                        disabled={processing}
                    >
                        Masuk
                    </PrimaryButton>
                </form>
                <div className="flex justify-between mt-4 text-sm">
                    <Link
                        href={route("forgot-password")}
                        className="text-green-700 hover:underline"
                    >
                        Lupa Password?
                    </Link>
                    <Link
                        href={route("register")}
                        className="text-green-700 hover:underline"
                    >
                        Belum punya akun? Daftar
                    </Link>
                </div>
            </div>
        </div>
    );
}
