// ============================================================
// NARAYANA HEALTH — Search API Client
// Calls /api/search/* on the Next.js BFF, which proxies
// to Spring Boot Search Service → OpenSearch
// This file is used CLIENT-SIDE (from React hooks)
// Server-side components call spring.ts directly
// ============================================================

import {
  SearchFilters,
  DoctorSearchResult,
  HospitalSearchResult,
  Article,
  SearchResponse,
  Speciality,
  NHAPIError,
} from '@/lib/types';

// ── Base BFF Fetcher (client-side) ───────────────────────

async function searchFetch<T>(path: string, params: Record<string, string | number | boolean | undefined> = {}): Promise<T> {
  const url = new URL(path, window.location.origin);

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString(), {
    headers: { 'x-nh-client': 'website' },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new NHAPIError(body?.code ?? 'SEARCH_ERROR', res.status, body?.message ?? 'Search failed');
  }

  return res.json();
}

// ── Doctor Search ─────────────────────────────────────────

/**
 * Search doctors — calls /api/search/doctors (BFF → Spring Boot → OpenSearch)
 * Supports hybrid keyword + semantic search
 */
export async function searchDoctors(
  query: string,
  filters: SearchFilters = {}
): Promise<SearchResponse<DoctorSearchResult>> {
  return searchFetch<SearchResponse<DoctorSearchResult>>('/api/search/doctors', {
    q: query,
    city: filters.city,
    speciality: filters.speciality,
    hospital: filters.hospital,
    language: filters.language,
    gender: filters.gender,
    availableToday: filters.availableToday,
    acceptsOnline: filters.acceptsOnline,
    page: filters.page ?? 1,
    pageSize: filters.pageSize ?? 12,
  });
}

// ── Hospital Search ───────────────────────────────────────

export async function searchHospitals(
  query: string,
  city?: string,
  page = 1
): Promise<SearchResponse<HospitalSearchResult>> {
  return searchFetch<SearchResponse<HospitalSearchResult>>('/api/search/hospitals', {
    q: query,
    city,
    page,
    pageSize: 12,
  });
}

// ── Speciality Search ─────────────────────────────────────

export async function searchSpecialities(query: string): Promise<Speciality[]> {
  const res = await searchFetch<SearchResponse<Speciality>>('/api/search/specialities', { q: query });
  return res.results;
}

// ── Article / Health Library Search ──────────────────────

export async function searchArticles(
  query: string,
  category?: string,
  page = 1
): Promise<SearchResponse<Article>> {
  return searchFetch<SearchResponse<Article>>('/api/search/articles', {
    q: query,
    category,
    page,
    pageSize: 10,
  });
}

// ── Semantic / Natural Language Search ───────────────────

export interface SemanticSearchResult {
  type: 'doctor' | 'hospital' | 'speciality' | 'article' | 'treatment';
  title: string;
  description: string;
  url: string;
  score: number;
}

/**
 * Cross-entity semantic search — "best cardiologist in Bangalore"
 * Uses OpenSearch kNN + BM25 hybrid
 */
export async function semanticSearch(query: string): Promise<SemanticSearchResult[]> {
  const res = await searchFetch<SearchResponse<SemanticSearchResult>>('/api/search/semantic', {
    q: query,
    pageSize: 8,
  });
  return res.results;
}

// ── Autocomplete / Suggestions ────────────────────────────

export interface SearchSuggestion {
  text: string;
  type: 'doctor' | 'speciality' | 'hospital' | 'condition';
  slug?: string;
}

export async function getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
  if (query.length < 2) return [];
  try {
    return searchFetch<SearchSuggestion[]>('/api/search/suggest', { q: query });
  } catch {
    return [];
  }
}
