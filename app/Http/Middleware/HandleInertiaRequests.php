<?php

namespace App\Http\Middleware;

use App\Models\KantorProfile;
use App\Models\Rumah;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $rumah = Rumah::latest()->get()->pluck('gambar');
        // dd($rumah);
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'profile_perumahan' => KantorProfile::first(),
            ],
            'slider' => $rumah,
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
