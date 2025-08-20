<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan Rumah</title>
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
        <h2>Laporan Data Rumah</h2>
        <p>Periode: {{ now()->format('d/m/Y H:i') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Rumah</th>
                <th>Tipe</th>
                <th>Alamat</th>
                <th>Harga</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($rumahs as $index => $rumah)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $rumah->nama_rumah }}</td>
                <td>{{ $rumah->tipe->nama_tipe ?? '-' }}</td>
                <td>{{ $rumah->alamat ?? '-' }}</td>
                <td>Rp {{ number_format($rumah->harga, 0, ',', '.') }}</td>
                <td>{{ ucfirst($rumah->status) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>