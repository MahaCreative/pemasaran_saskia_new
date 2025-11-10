<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Tawaran Posisi Senior High Programmer - Ifative</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f5f6fa;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .email-wrapper {
            width: 100%;
            background-color: #f5f6fa;
            padding: 40px 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .email-header {
            background-color: #ff7b00;
            padding: 20px;
            text-align: center;
        }

        .email-header img {
            width: 140px;
        }

        .email-body {
            padding: 30px 40px;
        }

        .email-body h1 {
            font-size: 20px;
            color: #222;
        }

        .email-body p {
            font-size: 15px;
            line-height: 1.7;
            margin: 12px 0;
        }

        .offer-box {
            background-color: #fff7f0;
            border-left: 4px solid #ff7b00;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 6px;
        }

        .offer-box strong {
            color: #ff7b00;
        }

        .cta-buttons {
            margin-top: 25px;
            text-align: center;
        }

        .cta-buttons a {
            text-decoration: none;
            display: inline-block;
            margin: 5px;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-accept {
            background-color: #ff7b00;
            color: #fff;
        }

        .btn-accept:hover {
            background-color: #e96c00;
        }

        .btn-decline {
            border: 2px solid #ff7b00;
            color: #ff7b00;
            background-color: #fff;
        }

        .btn-decline:hover {
            background-color: #ff7b00;
            color: #fff;
        }

        .email-footer {
            background-color: #222;
            color: #ccc;
            text-align: center;
            font-size: 13px;
            padding: 20px;
        }

        .email-footer a {
            color: #ff7b00;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="email-header">
                <img src="{{ asset('images/ifative_logo.png') }}" alt="Ifative Logo">
            </div>

            <div class="email-body">
                <h1>Halo, {{ $details['name'] }} 👋</h1>

                <p>Kami dari <strong>{{ $details['company'] }}</strong> sangat terkesan dengan performa luar biasa Anda dalam kejuaraan robotik tingkat nasional. Berdasarkan pencapaian tersebut, kami dengan bangga menawarkan posisi sebagai:</p>

                <div class="offer-box">
                    <strong>Senior High Programmer</strong><br>
                    Gaji yang ditawarkan: <strong>{{ $details['salary'] }} / bulan</strong>
                </div>

                <p>Kami yakin kemampuan Anda akan menjadi aset berharga bagi tim kami di <strong>{{ $details['company'] }}</strong>.</p>

                <p>Alamat kantor kami:<br>
                    {{ $details['address'] }}<br>
                    📞 {{ $details['phone'] }} | ✉️ {{ $details['email'] }}
                </p>

                <div class="cta-buttons">
                    <a href="#" class="btn-accept">Terima Tawaran</a>
                    <a href="#" class="btn-decline">Tolak Tawaran</a>
                </div>

                <p>Terima kasih atas waktu dan dedikasi Anda.<br>
                    Salam hangat,<br>
                    <strong>Tim {{ $details['company'] }}</strong>
                </p>
            </div>

            <div class="email-footer">
                &copy; {{ date('Y') }} {{ $details['company'] }}. Semua hak cipta dilindungi.<br>
                <a href="https://ifative.com">ifative.com</a>
            </div>
        </div>
    </div>
</body>

</html>