<?php

namespace App\Notifications;

use App\Models\PembayaranCicilan;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PembayaranCicilanNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $pembayaranCicilan;

    /**
     * Create a new notification instance.
     */
    public function __construct(PembayaranCicilan $pembayaranCicilan)
    {
        $this->pembayaranCicilan = $pembayaranCicilan;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Pembayaran Cicilan Baru')
            ->line('Pembayaran cicilan baru telah dibuat untuk permintaan pembelian Anda.')
            ->line('Jumlah Pembayaran: Rp ' . number_format($this->pembayaranCicilan->jumlah_pembayaran, 0, ',', '.'))
            ->line('Tanggal Pembayaran: ' . $this->pembayaranCicilan->tanggal_pembayaran->format('d/m/Y'))
            ->line('Metode Pembayaran: ' . $this->pembayaranCicilan->metode_pembayaran)
            ->action('Lihat Detail', route('permintaan.show', $this->pembayaranCicilan->permintaan_pembelian_id))
            ->line('Terima kasih telah menggunakan layanan kami!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'pembayaran_cicilan_id' => $this->pembayaranCicilan->id,
            'permintaan_pembelian_id' => $this->pembayaranCicilan->permintaan_pembelian_id,
            'jumlah_pembayaran' => $this->pembayaranCicilan->jumlah_pembayaran,
            'tanggal_pembayaran' => $this->pembayaranCicilan->tanggal_pembayaran,
            'metode_pembayaran' => $this->pembayaranCicilan->metode_pembayaran,
            'marketing_name' => $this->pembayaranCicilan->user->name,
        ];
    }
}
