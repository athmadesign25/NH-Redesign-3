// ============================================================
// NARAYANA HEALTH — Shared TypeScript Interfaces
// Single source of truth for all domain entities
// Used across Strapi client, Spring client, search, and UI
// ============================================================

// ── Primitives ───────────────────────────────────────────

export interface SEOMeta {
  metaTitle: string;
  metaDescription: string;
  canonicalURL?: string;
  keywords?: string;
  metaImage?: StrapiMedia;
  structuredData?: Record<string, unknown>;
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface StrapiListMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiListMeta;
}

export interface StrapiItem<T> {
  id: number;
  attributes: T & { createdAt: string; updatedAt: string; publishedAt?: string };
}

// ── Doctor ────────────────────────────────────────────────

export interface DoctorBio {
  name: string;
  slug: string;
  bio: string;
  shortBio: string;
  designation: string;
  photo: StrapiMedia;
  qualifications: string[];
  languages: string[];
  speciality: StrapiItem<{ name: string; slug: string }>;
  hospital: StrapiItem<{ name: string; slug: string; city: string }>;
  experience: string;
  awards?: string[];
  publications?: number;
  seo: SEOMeta;
}

/** Comes from Spring Boot — live operational data */
export interface DoctorAvailability {
  doctorId: string;
  locationId: string;
  consultationFee: number;
  onlineConsultationFee?: number;
  nextAvailableDate: string; // ISO date
  isAvailableToday: boolean;
  acceptsOnline: boolean;
  acceptsInPerson: boolean;
  waitTimeMinutes?: number;
}

export interface TimeSlot {
  slotId: string;
  startTime: string; // ISO datetime
  endTime: string;
  available: boolean;
  type: 'in-person' | 'online';
}

export interface Doctor extends DoctorBio, Partial<DoctorAvailability> {
  // Merged view for doctor profile pages
}

// ── Hospital ──────────────────────────────────────────────

export interface Hospital {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  country: string;
  beds: number;
  description: string;
  shortDescription: string;
  accreditations: string[];
  specialities: Array<{ name: string; slug: string }>;
  phone: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  photos: StrapiMedia[];
  established: number;
  seo: SEOMeta;
}

// ── Speciality ────────────────────────────────────────────

export interface Speciality {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  shortDescription: string;
  conditions: string[];
  procedures: string[];
  seo: SEOMeta;
}

// ── Treatment / Procedure ─────────────────────────────────

export interface Treatment {
  name: string;
  slug: string;
  overview: string;
  costRangeMin?: number;
  costRangeMax?: number;
  duration?: string;
  hospitalStay?: string;
  recoveryTime?: string;
  speciality: { name: string; slug: string };
  seo: SEOMeta;
}

// ── Article / Blog ────────────────────────────────────────

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  snippet: string;
  body: string; // rich text / markdown
  readTime: string;
  publishedAt: string;
  author?: {
    name: string;
    designation?: string;
    photo?: StrapiMedia;
  };
  coverImage?: StrapiMedia;
  tags?: string[];
  seo: SEOMeta;
}

// ── Health Packages ───────────────────────────────────────

export interface HealthPackage {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  testsCount: number;
  includes: string[];
  popular: boolean;
  gender?: 'all' | 'male' | 'female';
  ageGroup?: string;
  preparationInstructions?: string;
}

// ── Homepage ──────────────────────────────────────────────

export interface TrustStat {
  value: string;
  label: string;
  icon?: string;
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  trustStats: TrustStat[];
  featuredSpecialities: Array<{ name: string; slug: string; icon: string }>;
  seo: SEOMeta;
}

export interface GlobalConfig {
  siteName: string;
  tagline: string;
  supportPhone: string;
  emergencyPhone: string;
  internationalPhone: string;
  email: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
}

// ── Appointment ───────────────────────────────────────────

export interface AppointmentPayload {
  doctorId: string;
  locationId: string;
  slotId: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  patientDob?: string;
  isNewPatient: boolean;
  symptoms?: string;
  type: 'in-person' | 'online';
}

export interface AppointmentConfirmation {
  appointmentId: string;
  confirmationCode: string;
  doctorName: string;
  hospitalName: string;
  appointmentDateTime: string;
  consultationFee: number;
  paymentStatus: 'pending' | 'paid' | 'waived';
  paymentUrl?: string;
}

// ── Lead / Enquiry ────────────────────────────────────────

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  country: string;
  treatment?: string;
  message?: string;
  source: 'international' | 'homepage' | 'speciality' | 'doctor';
}

export interface LeadConfirmation {
  leadId: string;
  estimatedResponseHours: number;
}

// ── Search ────────────────────────────────────────────────

export interface SearchFilters {
  city?: string;
  speciality?: string;
  hospital?: string;
  language?: string;
  gender?: 'male' | 'female';
  availableToday?: boolean;
  acceptsOnline?: boolean;
  page?: number;
  pageSize?: number;
}

export interface DoctorSearchResult {
  doctorId: string;
  name: string;
  slug: string;
  designation: string;
  speciality: string;
  hospital: string;
  city: string;
  experience: string;
  rating: number;
  reviewCount: number;
  photoUrl?: string;
  availableToday: boolean;
  acceptsOnline: boolean;
  consultationFee?: number;
  languages: string[];
  score?: number; // relevance score from OpenSearch
}

export interface HospitalSearchResult {
  hospitalId: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  beds: number;
  accreditations: string[];
  topSpecialities: string[];
  score?: number;
}

export interface SearchResponse<T> {
  results: T[];
  total: number;
  page: number;
  pageSize: number;
  took: number; // ms
  query: string;
}

// ── AI ────────────────────────────────────────────────────

export interface SymptomGuidanceResponse {
  recommendedSpecialities: Array<{
    name: string;
    slug: string;
    confidence: number;
    reasoning: string;
  }>;
  urgencyLevel: 'emergency' | 'urgent' | 'routine' | 'preventive';
  urgencyMessage: string;
  suggestedDoctors?: DoctorSearchResult[];
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Array<{ title: string; url: string; snippet: string }>;
}

export interface AIStreamChunk {
  delta: string;
  done: boolean;
  citations?: AIMessage['citations'];
}

// ── API Errors ────────────────────────────────────────────

export interface APIError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

export class NHAPIError extends Error {
  constructor(
    public readonly code: string,
    public readonly statusCode: number,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'NHAPIError';
  }
}
