<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        // Jika pengguna belum login
        if (!$user) {
            return redirect()->route('login');
        }

        // Jika role pengguna ada dalam daftar yang diizinkan
        if (in_array($user->role, $roles)) {
            return $next($request);
        }

        // Redirect berdasarkan role yang tidak sesuai
        return match ($user->role) {
            'manager' => redirect()->route('dashboard'),
            'marketing' => redirect()->route('dashboard'),
            'pelanggan' => redirect()->route('home'),
            default => redirect()->route('login'),
        };
    }
}
