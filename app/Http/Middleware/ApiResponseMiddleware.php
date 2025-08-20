<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only process API responses
        if ($request->expectsJson() || $request->is('api/*')) {
            $this->formatApiResponse($response);
        }

        return $response;
    }

    /**
     * Format API response consistently
     */
    private function formatApiResponse(Response $response): void
    {
        $content = $response->getContent();
        $data = json_decode($content, true);

        if (json_last_error() === JSON_ERROR_NONE) {
            // Already JSON response
            $formatted = [
                'success' => $response->isSuccessful(),
                'status' => $response->getStatusCode(),
                'data' => $data,
                'message' => $this->getStatusMessage($response->getStatusCode()),
                'timestamp' => now()->toISOString(),
            ];

            $response->setContent(json_encode($formatted));
        }
    }

    /**
     * Get status message based on status code
     */
    private function getStatusMessage(int $statusCode): string
    {
        return match (true) {
            $statusCode >= 500 => 'Server error occurred',
            $statusCode >= 400 => 'Client error occurred',
            $statusCode >= 300 => 'Redirect occurred',
            $statusCode >= 200 => 'Request successful',
            default => 'Unknown status',
        };
    }
}
