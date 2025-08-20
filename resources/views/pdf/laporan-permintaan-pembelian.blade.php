<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan Permintaan Pembelian</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h2>Laporan Permintaan Pembelian</h2>
        <p>Periode: {{ now()->format('d/m/Y H:i') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Pelanggan</th>
                <th>Rumah</th>
                <th>Total Harga</th>
                <th>Status</th>
                <th>Tanggal Pengajuan</th>
                <th>Petugas</th>
            </tr>
        </thead>
        <tbody>
            @foreach($permintaans as $index => $permintaan)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $permintaan->user->name ?? '-' }}</td>
                <td>{{ $permintaan->rumah->nama_rumah ?? '-' }}</td>
                <td>Rp {{ number_format($permintaan->total_harga, 0, ',', '.') }}</td>
                <td>{{ ucfirst($permintaan->status) }}</td>
                <td>{{ $permintaan->created_at->format('d/m/Y') }}</td>
                <td>{{ $permintaan->petugas->name ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>