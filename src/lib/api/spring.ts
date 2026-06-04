// ============================================================
// NARAYANA HEALTH — Spring Boot Transaction API Client
// Used ONLY server-side (Next.js API routes / Server Components)
// Browser never calls Spring Boot directly — goes through BFF
// ============================================================

import {
  DoctorAvailability,
  TimeSlot,
  AppointmentPayload,
  AppointmentConfirmation,
  LeadPayload,
  LeadConfirmation,
  NHAPIError,
} from '@/lib/types';

const SPRING_API_URL = process.env.SPRING_API_URL!;
const SPRING_API_KEY = process.env.SPRING_API_KEY!;

// ── Base Fetcher ──────────────────────────────────────────

interface SpringRequestOptions {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: Record<string, string | number | boolean>;
  bearerToken?: string; // patient JWT if acting on behalf of patient
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

async function springRequest<T>(options: SpringRequestOptions): Promise<T> {
  const {
    path,
    method = 'GET',
    body,
    params = {},
    bearerToken,
    cache = 'no-store',
    next,
  } = options;

  if (!SPRING_API_URL) {
    throw new NHAPIError('SPRING_NOT_CONFIGURED', 503, 'Spring Boot API is not configured');
  }

  const url = new URL(`${SPRING_API_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Api-Key': SPRING_API_KEY,
    'X-Client': 'nh-website-bff',
    'X-Request-Id': crypto.randomUUID(),
  };

  if (bearerToken) {
    headers['Authorization'] = `Bearer ${bearerToken}`;
  }

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache,
    next,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new NHAPIError(
      errBody?.code ?? 'SPRING_ERROR',
      res.status,
      errBody?.message ?? `Spring API error: ${res.status} ${res.statusText}`,
      errBody?.details
    );
  }

  // 204 No Content
  if (res.status === 204) return {} as T;
  return res.json();
}

// ── Doctor Availability ───────────────────────────────────

/**
 * Get a doctor's operational profile: fee, next slot, online/in-person
 * Called when rendering the doctor profile page to merge with Strapi bio
 */
export async function getDoctorAvailability(doctorId: string): Promise<DoctorAvailability | null> {
  try {
    return await springRequest<DoctorAvailability>({
      path: `/api/doctors/${doctorId}/availability`,
      next: { revalidate: 60, tags: [`doctor-availability-${doctorId}`] },
    });
  } catch (err) {
    console.error(`[Spring] getDoctorAvailability(${doctorId}) failed:`, err);
    return null;
  }
}

/**
 * Fetch available time slots for a doctor on a given date
 * Always no-store — real-time data
 */
export async function getDoctorSlots(
  doctorId: string,
  locationId: string,
  date: string,
  type?: 'in-person' | 'online'
): Promise<TimeSlot[]> {
  try {
    const params: Record<string, string> = { date, locationId };
    if (type) params.type = type;

    return await springRequest<TimeSlot[]>({
      path: `/api/doctors/${doctorId}/slots`,
      params,
      cache: 'no-store',
    });
  } catch (err) {
    console.error(`[Spring] getDoctorSlots failed:`, err);
    return [];
  }
}

// ── Appointments ──────────────────────────────────────────

/**
 * Book an appointment — triggers Athma slot locking + CRM lead + Kafka event
 */
export async function createAppointment(
  payload: AppointmentPayload,
  patientToken?: string
): Promise<AppointmentConfirmation> {
  return springRequest<AppointmentConfirmation>({
    path: '/api/appointments',
    method: 'POST',
    body: payload,
    bearerToken: patientToken,
  });
}

/**
 * Retrieve an existing appointment (for confirmation page)
 */
export async function getAppointment(
  appointmentId: string,
  patientToken: string
): Promise<AppointmentConfirmation | null> {
  try {
    return await springRequest<AppointmentConfirmation>({
      path: `/api/appointments/${appointmentId}`,
      bearerToken: patientToken,
      cache: 'no-store',
    });
  } catch (err) {
    console.error(`[Spring] getAppointment(${appointmentId}) failed:`, err);
    return null;
  }
}

// ── Leads / Enquiries ─────────────────────────────────────

/**
 * Create a lead — used for international patient enquiries, callback requests
 * Flows: Spring Boot → CRM → Kafka(lead.created)
 */
export async function createLead(payload: LeadPayload): Promise<LeadConfirmation> {
  return springRequest<LeadConfirmation>({
    path: '/api/leads',
    method: 'POST',
    body: payload,
  });
}

// ── Payments ──────────────────────────────────────────────

export interface PaymentInitiateResponse {
  paymentUrl: string;
  orderId: string;
  amount: number;
  currency: string;
  expiresAt: string;
}

/**
 * Initiate payment for a confirmed appointment
 * Returns a redirect URL to the payment gateway
 */
export async function initiatePayment(
  appointmentId: string,
  patientToken: string
): Promise<PaymentInitiateResponse> {
  return springRequest<PaymentInitiateResponse>({
    path: `/api/payments/initiate`,
    method: 'POST',
    body: { appointmentId },
    bearerToken: patientToken,
  });
}

// ── Patient Auth ──────────────────────────────────────────

export interface PatientProfile {
  patientId: string;
  name: string;
  phone: string;
  email?: string;
  dob?: string;
  uhid?: string; // NH Universal Health ID
}

export interface OTPResponse {
  sessionToken: string;
  expiresIn: number;
}

export async function requestOTP(phone: string): Promise<OTPResponse> {
  return springRequest<OTPResponse>({
    path: '/api/auth/otp/request',
    method: 'POST',
    body: { phone },
  });
}

export async function verifyOTP(
  phone: string,
  otp: string,
  sessionToken: string
): Promise<{ accessToken: string; patient: PatientProfile }> {
  return springRequest<{ accessToken: string; patient: PatientProfile }>({
    path: '/api/auth/otp/verify',
    method: 'POST',
    body: { phone, otp, sessionToken },
  });
}

export async function getPatientProfile(patientToken: string): Promise<PatientProfile | null> {
  try {
    return await springRequest<PatientProfile>({
      path: '/api/patients/me',
      bearerToken: patientToken,
      cache: 'no-store',
    });
  } catch {
    return null;
  }
}

// ── Health Check ──────────────────────────────────────────

export async function springHealthCheck(): Promise<boolean> {
  try {
    await springRequest({ path: '/actuator/health', next: { revalidate: 30 } });
    return true;
  } catch {
    return false;
  }
}
