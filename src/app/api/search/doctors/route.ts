// ============================================================
// BFF Route: GET /api/search/doctors
// Proxies to Spring Boot Search API → OpenSearch
// Never exposes OpenSearch or Spring Boot directly to browser
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { NHAPIError } from '@/lib/types';

const SPRING_API_URL = process.env.SPRING_API_URL;
const SPRING_API_KEY = process.env.SPRING_API_KEY;

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  // ── Rate limit check (basic — use Upstash Redis in prod) ─
  // TODO: Replace with proper rate limiter
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

  // ── Build Spring Boot request ─────────────────────────────
  if (!SPRING_API_URL) {
    // Return mock data when Spring Boot is not configured
    return NextResponse.json(getMockDoctors(searchParams), {
      headers: { 'X-Data-Source': 'mock' },
    });
  }

  try {
    const upstreamUrl = new URL(`${SPRING_API_URL}/api/search/doctors`);

    // Forward all valid params
    const allowedParams = ['q', 'city', 'speciality', 'hospital', 'language', 'gender', 'availableToday', 'acceptsOnline', 'page', 'pageSize'];
    allowedParams.forEach(p => {
      const v = searchParams.get(p);
      if (v) upstreamUrl.searchParams.set(p, v);
    });

    const upstream = await fetch(upstreamUrl.toString(), {
      headers: {
        'X-Api-Key': SPRING_API_KEY!,
        'X-Client': 'nh-website-bff',
        'X-Forwarded-For': ip,
      },
      next: { revalidate: 30 },
    });

    if (!upstream.ok) {
      const err = await upstream.json().catch(() => ({}));
      return NextResponse.json({ error: err?.message ?? 'Search failed' }, { status: upstream.status });
    }

    const data = await upstream.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'X-Data-Source': 'opensearch',
      },
    });
  } catch (err) {
    console.error('[BFF] /api/search/doctors error:', err);
    // Graceful fallback to mock data
    return NextResponse.json(getMockDoctors(searchParams), {
      headers: { 'X-Data-Source': 'mock-fallback' },
    });
  }
}

// ── Mock fallback (used when Spring Boot is not running) ──
function getMockDoctors(params: URLSearchParams) {
  const { doctors } = require('@/lib/data');
  const q = params.get('q')?.toLowerCase() ?? '';
  const city = params.get('city')?.toLowerCase() ?? '';
  const speciality = params.get('speciality')?.toLowerCase() ?? '';

  const filtered = doctors.filter((d: any) => {
    const nameMatch = !q || d.name.toLowerCase().includes(q) || d.speciality.toLowerCase().includes(q);
    const cityMatch = !city || d.hospital.toLowerCase().includes(city);
    const specMatch = !speciality || d.speciality.toLowerCase().includes(speciality);
    return nameMatch && cityMatch && specMatch;
  });

  return {
    results: filtered.map((d: any) => ({
      doctorId: String(d.id),
      name: d.name,
      slug: d.slug,
      designation: d.designation,
      speciality: d.speciality,
      hospital: d.hospital,
      city: d.hospital.split(',')[1]?.trim() ?? 'India',
      experience: d.experience,
      rating: d.rating,
      reviewCount: d.reviews,
      availableToday: d.available,
      acceptsOnline: false,
      languages: d.languages ?? ['English'],
      score: 1.0,
    })),
    total: filtered.length,
    page: 1,
    pageSize: 12,
    took: 0,
    query: q,
  };
}
