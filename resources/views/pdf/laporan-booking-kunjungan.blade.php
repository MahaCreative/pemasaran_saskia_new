<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan Booking Kunjungan</title>
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
        <h2>Laporan Booking Kunjungan</h2>
        <p>Periode: {{ now()->format('d/m/Y H:i') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Pelanggan</th>
                <th>Rumah</th>
                <th>Jadwal Kunjungan</th>
                <th>Status</th>
                <th>Petugas</th>
            </tr>
        </thead>
        <tbody>
            @foreach($bookings as $index => $booking)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $booking->user->name ?? '-' }}</td>
                <td>{{ $booking->rumah->nama_rumah ?? '-' }}</td>
                <td>{{ $booking->jadwal_kunjungan->format('d/m/Y H:i') }}</td>
                <td>{{ ucfirst($booking->status) }}</td>
                <td>{{ $booking->petugas->name ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>