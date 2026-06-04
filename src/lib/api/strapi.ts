// ============================================================
// NARAYANA HEALTH — Strapi CMS Client
// Typed, error-normalised client for all CMS content calls
// Used ONLY server-side (Next.js API routes + Server Components)
// ============================================================

import {
  StrapiItem,
  StrapiResponse,
  DoctorBio,
  Hospital,
  Speciality,
  Treatment,
  Article,
  HealthPackage,
  HomepageContent,
  GlobalConfig,
  NHAPIError,
} from '@/lib/types';

const STRAPI_URL = process.env.STRAPI_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  console.warn('[Strapi] STRAPI_URL or STRAPI_API_TOKEN not set — using mock data fallback');
}

// ── Base Fetcher ──────────────────────────────────────────

interface FetchOptions {
  path: string;
  params?: Record<string, string | number | boolean | string[]>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

async function strapiGet<T>(options: FetchOptions): Promise<T> {
  const { path, params = {}, cache = 'force-cache', next } = options;

  if (!STRAPI_URL || !STRAPI_TOKEN) {
    throw new NHAPIError('STRAPI_NOT_CONFIGURED', 503, 'Strapi is not configured');
  }

  const url = new URL(`${STRAPI_URL}/api/${path}`);

  // Deep-populate all relations by default
  url.searchParams.set('populate', 'deep');

  Object.entries(params).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach(v => url.searchParams.append(key, v));
    } else {
      url.searchParams.set(key, String(val));
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    cache,
    next,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new NHAPIError(
      body?.error?.name ?? 'STRAPI_ERROR',
      res.status,
      body?.error?.message ?? `Strapi request failed: ${res.status}`,
      body?.error?.details
    );
  }

  return res.json();
}

// ── Image URL Helper ──────────────────────────────────────

export function strapiImageUrl(relativePath: string, format?: 'thumbnail' | 'small' | 'medium' | 'large'): string {
  if (!relativePath) return '/images/placeholder.jpg';
  if (relativePath.startsWith('http')) return relativePath;
  return `${STRAPI_URL}${relativePath}`;
}

// ── Homepage ──────────────────────────────────────────────

export async function getHomepageContent(): Promise<HomepageContent | null> {
  try {
    const res = await strapiGet<{ data: { attributes: HomepageContent } }>({
      path: 'homepage',
      next: { revalidate: 300, tags: ['homepage'] },
    });
    return res.data?.attributes ?? null;
  } catch (err) {
    console.error('[Strapi] getHomepageContent failed:', err);
    return null;
  }
}

export async function getGlobalConfig(): Promise<GlobalConfig | null> {
  try {
    const res = await strapiGet<{ data: { attributes: GlobalConfig } }>({
      path: 'global',
      next: { revalidate: 3600, tags: ['global'] },
    });
    return res.data?.attributes ?? null;
  } catch (err) {
    console.error('[Strapi] getGlobalConfig failed:', err);
    return null;
  }
}

// ── Doctors ───────────────────────────────────────────────

export async function getDoctorBySlug(slug: string): Promise<DoctorBio | null> {
  try {
    const res = await strapiGet<StrapiResponse<StrapiItem<DoctorBio>[]>>({
      path: 'doctors',
      params: { 'filters[slug][$eq]': slug, 'pagination[pageSize]': 1 },
      next: { revalidate: 600, tags: [`doctor-${slug}`] },
    });
    return res.data?.[0]?.attributes ?? null;
  } catch (err) {
    console.error(`[Strapi] getDoctorBySlug(${slug}) failed:`, err);
    return null;
  }
}

export async function getDoctorSlugs(): Promise<string[]> {
  try {
    const res = await strapiGet<StrapiResponse<StrapiItem<{ slug: string }>[]>>({
      path: 'doctors',
      params: { 'fields[0]': 'slug', 'pagination[pageSize]': 100 },
      next: { revalidate: 3600, tags: ['doctors'] },
    });
    return res.data?.map(d => d.attributes.slug) ?? [];
  } catch (err) {
    console.error('[Strapi] getDoctorSlugs failed:', err);
    return [];
  }
}

// ── Hospitals ─────────────────────────────────────────────

export async function getHospitals(params?: { city?: string; pageSize?: number; page?: number }): Promise<{ items: Hospital[]; total: number }> {
  try {
    const queryParams: Record<string, string | number> = {
      'pagination[pageSize]': params?.pageSize ?? 24,
      'pagination[page]': params?.page ?? 1,
    };
    if (params?.city) queryParams['filters[city][$eq]'] = params.city;

    const res = await strapiGet<StrapiResponse<StrapiItem<Hospital>[]>>({
      path: 'hospitals',
      params: queryParams,
      next: { revalidate: 1800, tags: ['hospitals'] },
    });

    return {
      items: res.data?.map(h => ({ ...h.attributes, id: String(h.id) })) ?? [],
      total: res.meta?.pagination?.total ?? 0,
    };
  } catch (err) {
    console.error('[Strapi] getHospitals failed:', err);
    return { items: [], total: 0 };
  }
}

export async function getHospitalBySlug(slug: string): Promise<Hospital | null> {
  try {
    const res = await strapiGet<StrapiResponse<StrapiItem<Hospital>[]>>({
      path: 'hospitals',
      params: { 'filters[slug][$eq]': slug },
      next: { revalidate: 600, tags: [`hospital-${slug}`] },
    });
    return res.data?.[0]?.attributes ?? null;
  } catch (err) {
    console.error(`[Strapi] getHospitalBySlug(${slug}) failed:`, err);
    return null;
  }
}

// ── Specialities ──────────────────────────────────────────

export async function getSpecialities(): Promise<Speciality[]> {
  try {
    const res = await strapiGet<StrapiResponse<StrapiItem<Speciality>[]>>({
      path: 'specialities',
      params: { 'pagination[pageSize]': 50, 'sort[0]': 'name:asc' },
      next: { revalidate: 3600, tags: ['specialities'] },
    });
    return res.data?.map(s => ({ ...s.attributes, id: String(s.id) })) ?? [];
  } catch (err) {
    console.error('[Strapi] getSpecialities failed:', err);
    return [];
  }
}

export async function getSpecialityBySlug(slug: string): Promise<Speciality | null> {
  try {
    const res = await strapiGet<StrapiResponse<StrapiItem<Speciality>[]>>({
      path: 'specialities',
      params: { 'filters[slug][$eq]': slug },
      next: { revalidate: 600, tags: [`speciality-${slug}`] },
    });
    return res.data?.[0]?.attributes ?? null;
  } catch (err) {
    console.error(`[Strapi] getSpecialityBySlug(${slug}) failed:`, err);
    return null;
  }
}

// ── Treatments ────────────────────────────────────────────

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  try {
    const res = await strapiGet<StrapiResponse<StrapiItem<Treatment>[]>>({
      path: 'treatments',
      params: { 'filters[slug][$eq]': slug },
      next: { revalidate: 600, tags: [`treatment-${slug}`] },
    });
    return res.data?.[0]?.attributes ?? null;
  } catch (err) {
    console.error(`[Strapi] getTreatmentBySlug(${slug}) failed:`, err);
    return null;
  }
}

// ── Articles ──────────────────────────────────────────────

export async function getArticles(params?: {
  category?: string;
  pageSize?: number;
  page?: number;
  sort?: 'newest' | 'popular';
}): Promise<{ items: Article[]; total: number }> {
  try {
    const queryParams: Record<string, string | number> = {
      'pagination[pageSize]': params?.pageSize ?? 12,
      'pagination[page]': params?.page ?? 1,
      'sort[0]': params?.sort === 'popular' ? 'views:desc' : 'publishedAt:desc',
    };
    if (params?.category) queryParams['filters[category][$eq]'] = params.category;

    const res = await strapiGet<StrapiResponse<StrapiItem<Article>[]>>({
      path: 'articles',
      params: queryParams,
      next: { revalidate: 300, tags: ['articles'] },
    });

    return {
      items: res.data?.map(a => ({ ...a.attributes, id: a.id })) ?? [],
      total: res.meta?.pagination?.total ?? 0,
    };
  } catch (err) {
    console.error('[Strapi] getArticles failed:', err);
    return { items: [], total: 0 };
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await strapiGet<StrapiResponse<StrapiItem<Article>[]>>({
      path: 'articles',
      params: { 'filters[slug][$eq]': slug },
      next: { revalidate: 300, tags: [`article-${slug}`] },
    });
    return res.data?.[0]?.attributes ?? null;
  } catch (err) {
    console.error(`[Strapi] getArticleBySlug(${slug}) failed:`, err);
    return null;
  }
}

// ── Health Packages ───────────────────────────────────────

export async function getHealthPackages(): Promise<HealthPackage[]> {
  try {
    const res = await strapiGet<StrapiResponse<StrapiItem<HealthPackage>[]>>({
      path: 'health-packages',
      params: { 'sort[0]': 'popular:desc', 'pagination[pageSize]': 20 },
      next: { revalidate: 3600, tags: ['health-packages'] },
    });
    return res.data?.map(p => ({ ...p.attributes, id: p.id })) ?? [];
  } catch (err) {
    console.error('[Strapi] getHealthPackages failed:', err);
    return [];
  }
}

// ── ISR Revalidation (called by Strapi webhook) ───────────

export async function revalidateStrapiContent(tag: string): Promise<void> {
  // Called from /api/strapi/webhook route handler
  // Uses Next.js revalidateTag() — import in the route handler
  console.log(`[Strapi] Revalidating tag: ${tag}`);
}
