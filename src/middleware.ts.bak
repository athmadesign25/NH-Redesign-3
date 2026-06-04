// ============================================================
// NARAYANA HEALTH — Next.js Edge Middleware
// Runs at the edge before every request
// Responsibilities:
//  1. Rate limiting on /api/* routes
//  2. Strip internal headers from responses
//  3. Inject CORS headers for /api/*
//  4. Block direct OpenSearch/Spring Boot access attempts
//  5. Geo-routing: international users → /international-patients CTA
//  6. Security headers on all responses
// ============================================================

import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|images/).*)',
  ],
};

// ── In-memory rate limiter (use Upstash Redis in prod) ────
const rateMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return true; // allowed
  }

  if (entry.count >= limit) return false; // blocked

  entry.count++;
  return true;
}

// Cleanup old entries periodically (edge-safe)
function cleanupRateMap() {
  const now = Date.now();
  for (const [key, val] of rateMap.entries()) {
    if (now > val.resetAt) rateMap.delete(key);
  }
}

// ── Security Headers ──────────────────────────────────────

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};

// ── Middleware Handler ────────────────────────────────────

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  // ── 1. Block direct access to internal service ports ──
  // Belt-and-suspenders: hostname-level block on service names
  const host = req.headers.get('host') ?? '';
  if (host.includes('opensearch') || host.includes('kafka') || host.includes('redis')) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // ── 2. Rate limiting on /api/* ──────────────────────────
  if (pathname.startsWith('/api/')) {
    cleanupRateMap();

    // AI routes: stricter (20 req/min per IP)
    if (pathname.startsWith('/api/ai/')) {
      if (!rateLimit(`ai:${ip}`, 20, 60_000)) {
        return NextResponse.json(
          { error: 'Too many requests. Please wait a moment.' },
          { status: 429, headers: { 'Retry-After': '60' } }
        );
      }
    }

    // Appointment/lead routes: 30 req/min
    if (pathname.startsWith('/api/appointments') || pathname.startsWith('/api/leads')) {
      if (!rateLimit(`txn:${ip}`, 30, 60_000)) {
        return NextResponse.json(
          { error: 'Too many requests. Please wait a moment.' },
          { status: 429, headers: { 'Retry-After': '60' } }
        );
      }
    }

    // Search routes: 60 req/min
    if (pathname.startsWith('/api/search/')) {
      if (!rateLimit(`search:${ip}`, 60, 60_000)) {
        return NextResponse.json(
          { error: 'Too many requests. Please wait a moment.' },
          { status: 429, headers: { 'Retry-After': '60' } }
        );
      }
    }
  }

  // ── 3. CORS headers for /api/* ──────────────────────────
  const res = NextResponse.next();

  if (pathname.startsWith('/api/')) {
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.narayanahealth.org',
      'http://localhost:3000',
      'http://localhost:3001',
    ];

    const origin = req.headers.get('origin');
    if (origin && allowedOrigins.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-nh-client');
    res.headers.set('Vary', 'Origin');
  }

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: res.headers });
  }

  // ── 4. Security headers on all routes ──────────────────
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v));

  // ── 5. Geo-routing: international visitors ─────────────
  // Vercel sets this header automatically
  const country = req.headers.get('x-vercel-ip-country');
  const isInternational = country && !['IN', ''].includes(country);

  // Add a header for the page to read (don't redirect — let the page adapt)
  if (isInternational) {
    res.headers.set('x-visitor-country', country ?? '');
    res.headers.set('x-visitor-international', 'true');
  }

  // ── 6. Remove internal headers from outbound responses ──
  res.headers.delete('x-powered-by');
  res.headers.delete('server');

  return res;
}
