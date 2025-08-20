<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class TrackUserActivityMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Track user activity
        if ($user = $request->user()) {
            // Update last activity
            $user->update(['last_activity' => now()]);

            // Track page visits
            $this->trackPageVisit($request, $user);

            // Track user sessions
            $this->trackUserSession($request, $user);
        }

        return $response;
    }

    /**
     * Track page visits
     */
    private function trackPageVisit(Request $request, $user): void
    {
        $page = $request->path();
        $ip = $request->ip();

        // Store in cache for performance (expires in 1 hour)
        $key = "user_visits_{$user->id}_{$page}";
        $visits = Cache::get($key, []);

        $visits[] = [
            'timestamp' => now(),
            'ip' => $ip,
            'user_agent' => $request->userAgent(),
        ];

        // Keep only last 100 visits
        $visits = array_slice($visits, -100);
        Cache::put($key, $visits, 3600);

        // Log to database for analytics
        if (config('app.env') === 'production') {
            DB::table('user_activity_logs')->insert([
                'user_id' => $user->id,
                'action' => 'page_visit',
                'details' => json_encode([
                    'page' => $page,
                    'method' => $request->method(),
                    'ip' => $ip,
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Track user sessions
     */
    private function trackUserSession(Request $request, $user): void
    {
        $sessionKey = "user_session_{$user->id}";
        $sessionData = Cache::get($sessionKey, [
            'login_time' => now(),
            'last_activity' => now(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'page_views' => 0,
        ]);

        $sessionData['last_activity'] = now();
        $sessionData['page_views']++;

        Cache::put($sessionKey, $sessionData, 3600);
    }
}
