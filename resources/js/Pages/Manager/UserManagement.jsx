import Dialog from "@/Components/Dialog";
import TableLayout from "@/Components/Table/TableLayout";
import AuthLayout from "@/Layouts/AuthLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import { useState } from "react";
// State untuk modal tambah/edit marketing

export default function UserManagement({ marketing = [], pelanggan = [] }) {
    const { props } = usePage();
    const { search_marketing = "", search_pelanggan = "" } = props;

    const { data: formMarketing, setData: setFormMarketing } = useForm({
        search_marketing: search_marketing,
    });
    const { data: formPelanggan, setData: setFormPelanggan } = useForm({
        search_pelanggan: search_pelanggan,
    });

    // Statistik
    const totalMarketing = marketing.length;
    const totalPelanggan = pelanggan.length;

    // Search handler
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false); // false = tambah, true = edit
    const [selectedMarketing, setSelectedMarketing] = useState(null);
    const {
        data: formMarketingModal,
        setData: setFormMarketingModal,
        post,
        put,
        errors,
        reset,
    } = useForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    // Buka modal tambah
    const handleOpenTambah = () => {
        setEditMode(false);
        setSelectedMarketing(null);
        setFormMarketingModal({
            name: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
        });
        setOpenDialog(true);
    };
    // Buka modal edit
    const handleOpenEdit = (user) => {
        setEditMode(true);
        setSelectedMarketing(user);
        console.log(user);

        setFormMarketingModal({
            id: user.id || "",
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            avatar: user.avatar || "",
            password: "",
            password_confirmation: "",
        });
        setOpenDialog(true);
    };
    // Tutup modal
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Handler input form modal
    const handleChangeModal = (e) => {
        const { name, type, value, files } = e.target;
        setFormMarketingModal((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    // Handler submit form modal (tambah/edit marketing)
    const handleSubmitModal = (e) => {
        e.preventDefault();

        if (editMode && selectedMarketing) {
            // Edit marketing

            post(route("user.update", selectedMarketing.id), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => setOpenDialog(false),
            });
        } else {
            // Tambah marketing

            post(route("user.store"), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => setOpenDialog(false),
            });
        }
    };

    const handleSearchMarketing = (e) => {};
    const handleSearchPelanggan = (e) => {};

    return (
        <AuthLayout title="Kelola User - Manager">
            <Dialog
                open={openDialog}
                handleClose={handleCloseDialog}
                title={editMode ? "Edit Marketing" : "Tambah Marketing"}
            >
                <div className="min-w-[400px]">
                    <form
                        onSubmit={handleSubmitModal}
                        className="space-y-4 mt-2"
                    >
                        <div>
                            <label className="block mb-1">Nama</label>
                            <input
                                type="text"
                                name="name"
                                value={formMarketingModal.name}
                                onChange={handleChangeModal}
                                className={`border rounded px-3 py-2 w-full ${
                                    errors.name ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {errors.name && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formMarketingModal.email}
                                    onChange={handleChangeModal}
                                    className={`border rounded px-3 py-2 w-full ${
                                        errors.email ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1">WhatsApp</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formMarketingModal.phone}
                                    onChange={handleChangeModal}
                                    className={`border rounded px-3 py-2 w-full ${
                                        errors.phone ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.phone && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.phone}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1">Avatar</label>
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleChangeModal}
                                className={`border rounded px-3 py-2 w-full ${
                                    errors.avatar ? "border-red-500" : ""
                                }`}
                            />
                            {editMode &&
                                "Kosongkan jika tidak ingin mengubah avatar"}
                            {errors.avatar && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.avatar}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1">
                                Password{" "}
                                {editMode && (
                                    <span className="text-xs text-gray-500">
                                        (Kosongkan jika tidak diubah)
                                    </span>
                                )}
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formMarketingModal.password}
                                onChange={handleChangeModal}
                                className={`border rounded px-3 py-2 w-full ${
                                    errors.password ? "border-red-500" : ""
                                }`}
                                autoComplete="new-password"
                                {...(!editMode && {
                                    required: true,
                                })}
                            />
                            {errors.password && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={formMarketingModal.password_confirmation}
                                onChange={handleChangeModal}
                                className={`border rounded px-3 py-2 w-full ${
                                    errors.password_confirmation
                                        ? "border-red-500"
                                        : ""
                                }`}
                                autoComplete="new-password"
                                {...(!editMode && {
                                    required: true,
                                })}
                            />
                            {errors.password_confirmation && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.password_confirmation}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={handleCloseDialog}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                {editMode ? "Simpan Perubahan" : "Tambah"}
                            </button>
                        </div>
                    </form>
                </div>
            </Dialog>
            <div className="max-w-6xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-green-700 mb-6">
                    Kelola User
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                        <span className="text-4xl font-bold text-blue-700">
                            {totalMarketing}
                        </span>
                        <span className="text-lg text-gray-700 mt-2">
                            Marketing Terdaftar
                        </span>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                        <span className="text-4xl font-bold text-green-700">
                            {totalPelanggan}
                        </span>
                        <span className="text-lg text-gray-700 mt-2">
                            Pelanggan Terdaftar
                        </span>
                    </div>
                </div>

                {/* Tabel Marketing */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-blue-700">
                            Data Marketing
                        </h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <form
                            onSubmit={handleSearchMarketing}
                            className="mb-3 flex gap-2"
                        >
                            <input
                                type="text"
                                name="search_marketing"
                                value={formMarketing.search_marketing}
                                onChange={(e) =>
                                    setFormMarketing(
                                        "search_marketing",
                                        e.target.value
                                    )
                                }
                                placeholder="Cari nama marketing..."
                                className="border rounded px-3 py-2 w-full max-w-xs"
                            />
                        </form>
                        <button
                            type="button"
                            onClick={handleOpenTambah}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
                        >
                            <Add fontSize="small" /> Tambah Marketing
                        </button>
                    </div>
                    <TableLayout className="overflow-x-auto">
                        <TableLayout.Table>
                            <TableLayout.Thead className="bg-blue-700">
                                <tr>
                                    <TableLayout.Th>Avatar</TableLayout.Th>
                                    <TableLayout.Th>Nama</TableLayout.Th>
                                    <TableLayout.Th>Email</TableLayout.Th>
                                    <TableLayout.Th>No. HP</TableLayout.Th>
                                    <TableLayout.Th>
                                        Tanggal Daftar
                                    </TableLayout.Th>
                                    <TableLayout.Th>Aksi</TableLayout.Th>
                                </tr>
                            </TableLayout.Thead>
                            <tbody>
                                {marketing.length === 0 && (
                                    <tr>
                                        <TableLayout.Td
                                            colSpan={6}
                                            className="text-center py-4"
                                        >
                                            Tidak ada data marketing.
                                        </TableLayout.Td>
                                    </tr>
                                )}
                                {marketing.map((user) => (
                                    <tr key={user.id}>
                                        <TableLayout.Td className="text-center">
                                            {user.avatar ? (
                                                <img
                                                    src={`/storage/${user.avatar}`}
                                                    alt="avatar"
                                                    className="w-10 h-10 rounded-full object-cover mx-auto"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                                    -
                                                </div>
                                            )}
                                        </TableLayout.Td>
                                        <TableLayout.Td>
                                            {user.name}
                                        </TableLayout.Td>
                                        <TableLayout.Td>
                                            {user.email}
                                        </TableLayout.Td>
                                        <TableLayout.Td>
                                            {user.phone || "-"}
                                        </TableLayout.Td>
                                        <TableLayout.Td>
                                            {user.created_at
                                                ? new Date(
                                                      user.created_at
                                                  ).toLocaleDateString("id-ID")
                                                : "-"}
                                        </TableLayout.Td>
                                        <TableLayout.Td>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleOpenEdit(user)
                                                }
                                                className="text-blue-600 hover:underline mr-2"
                                            >
                                                Edit
                                            </button>
                                        </TableLayout.Td>
                                    </tr>
                                ))}
                                {/* Modal Tambah/Edit Marketing */}
                            </tbody>
                        </TableLayout.Table>
                    </TableLayout>
                </div>

                {/* Tabel Pelanggan */}
                <div>
                    <h2 className="text-xl font-bold text-green-700 mb-2">
                        Data Pelanggan
                    </h2>
                    <form
                        onSubmit={handleSearchPelanggan}
                        className="mb-3 flex gap-2"
                    >
                        <input
                            type="text"
                            name="search_pelanggan"
                            value={formPelanggan.search_pelanggan}
                            onChange={(e) =>
                                setFormPelanggan(
                                    "search_pelanggan",
                                    e.target.value
                                )
                            }
                            placeholder="Cari nama pelanggan..."
                            className="border rounded px-3 py-2 w-full max-w-xs"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Cari
                        </button>
                    </form>
                    <TableLayout className="overflow-x-auto">
                        <TableLayout.Table>
                            <TableLayout.Thead className="bg-green-700">
                                <tr>
                                    <TableLayout.Th>Avatar</TableLayout.Th>
                                    <TableLayout.Th>Nama</TableLayout.Th>
                                    <TableLayout.Th>Email</TableLayout.Th>
                                    <TableLayout.Th>No. HP</TableLayout.Th>
                                    <TableLayout.Th>
                                        Tanggal Daftar
                                    </TableLayout.Th>
                                </tr>
                            </TableLayout.Thead>
                            <tbody>
                                {pelanggan.length === 0 && (
                                    <tr>
                                        <TableLayout.Td
                                            colSpan={5}
                                            className="text-center py-4"
                                        >
                                            Tidak ada data pelanggan.
                                        </TableLayout.Td>
                                    </tr>
                                )}
                                {pelanggan.map((user) => (
                                    <tr key={user.id}>
                                        <TableLayout.Td className="text-center">
                                            {user.avatar ? (
                                                <img
                                                    src={`/storage/${user.avatar}`}
                                                    alt="avatar"
                                                    className="w-10 h-10 rounded-full object-cover mx-auto"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                                    -
                                                </div>
                                            )}
                                        </TableLayout.Td>
                                        <TableLayout.Td>
                                            {user.name}
                                        </TableLayout.Td>
                                        <TableLayout.Td>
                                            {user.email}
                                        </TableLayout.Td>
                                        <TableLayout.Td>
                                            {user.phone || "-"}
                                        </TableLayout.Td>
                                        <TableLayout.Td>
                                            {user.created_at
                                                ? new Date(
                                                      user.created_at
                                                  ).toLocaleDateString("id-ID")
                                                : "-"}
                                        </TableLayout.Td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableLayout.Table>
                    </TableLayout>
                </div>
            </div>
        </AuthLayout>
    );
}
