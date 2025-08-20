<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class MaintenanceModeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if maintenance mode is enabled
        if ($this->isMaintenanceModeEnabled()) {
            // Allow admin users to bypass maintenance mode
            if ($request->user() && $request->user()->role === 'admin') {
                return $next($request);
            }

            // Allow specific IPs to bypass maintenance mode
            $allowedIps = config('maintenance.allowed_ips', []);
            if (in_array($request->ip(), $allowedIps)) {
                return $next($request);
            }

            // Return maintenance response
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'message' => 'Sistem sedang dalam mode pemeliharaan',
                    'retry_after' => 60
                ], 503);
            }

            return response()->view('maintenance', [], 503);
        }

        return $next($request);
    }

    /**
     * Check if maintenance mode is enabled
     */
    private function isMaintenanceModeEnabled(): bool
    {
        return Cache::get('maintenance_mode', false);
    }
}
