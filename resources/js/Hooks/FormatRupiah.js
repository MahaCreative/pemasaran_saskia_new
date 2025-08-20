export function formatRupiah(angka, prefix = "Rp ") {
    // Cek jika angka negatif
    const isNegative = angka < 0;

    // Ambil nilai absolut dari angka
    let numberString = Math.abs(angka)
            .toString()
            .replace(/[^,\d]/g, ""),
        split = numberString.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;

    // Jika angka negatif, tambahkan tanda minus
    if (isNegative) {
        return "-" + prefix + rupiah;
    }

    return prefix + rupiah;
}
