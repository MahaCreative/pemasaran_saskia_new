<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan Pembayaran Cicilan</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }

        .company-name {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .report-title {
            font-size: 16px;
            margin-bottom: 5px;
        }

        .date-range {
            font-size: 12px;
            color: #666;
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
            font-weight: bold;
        }

        .total-row {
            background-color: #e8f4f8;
            font-weight: bold;
        }

        .footer {
            margin-top: 30px;
            text-align: right;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="header">
        <div class="company-name">PT. Pemasaran Rumah Saskia</div>
        <div class="report-title">Laporan Pembayaran Cicilan</div>
        <div class="date-range">
            @if(request('tanggal_mulai') && request('tanggal_selesai'))
            Periode: {{ \Carbon\Carbon::parse(request('tanggal_mulai'))->format('d/m/Y') }} - {{ \Carbon\Carbon::parse(request('tanggal_selesai'))->format('d/m/Y') }}
            @else
            Semua Periode
            @endif
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Nama Pelanggan</th>
                <th>Rumah</th>
                <th>Metode Pembayaran</th>
                <th>Nominal</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @php $total = 0; @endphp
            @foreach($pembayarans as $index => $pembayaran)
            @php $total += $pembayaran->nominal; @endphp
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ \Carbon\Carbon::parse($pembayaran->tanggal_pembayaran)->format('d/m/Y') }}</td>
                <td>{{ $pembayaran->permintaanPembelian->user->name ?? '-' }}</td>
                <td>{{ $pembayaran->permintaanPembelian->rumah->nama ?? '-' }}</td>
                <td>{{ ucfirst($pembayaran->metode_pembayaran) }}</td>
                <td>Rp {{ number_format($pembayaran->nominal, 0, ',', '.') }}</td>
                <td>{{ ucfirst($pembayaran->status) }}</td>
            </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="5"><strong>Total</strong></td>
                <td><strong>Rp {{ number_format($total, 0, ',', '.') }}</strong></td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>Dicetak pada: {{ now()->format('d/m/Y H:i') }}</p>
    </div>
</body>

</html>