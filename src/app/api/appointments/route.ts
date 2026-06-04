// ============================================================
// BFF Route: POST /api/appointments
// Proxies to Spring Boot Appointment Service → Athma
// Requires patient auth token in Authorization header
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAppointment } from '@/lib/api/spring';
import { AppointmentPayload } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Extract patient JWT from cookie or Authorization header
    const patientToken =
      req.cookies.get('nh_patient_token')?.value ??
      req.headers.get('Authorization')?.replace('Bearer ', '');

    const body: AppointmentPayload = await req.json();

    // Basic validation
    if (!body.doctorId || !body.slotId || !body.patientName || !body.patientPhone) {
      return NextResponse.json(
        { error: 'Missing required fields: doctorId, slotId, patientName, patientPhone' },
        { status: 400 }
      );
    }

    // Phone validation (Indian format)
    if (!/^[6-9]\d{9}$/.test(body.patientPhone.replace(/\D/g, ''))) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 422 });
    }

    const confirmation = await createAppointment(body, patientToken);

    return NextResponse.json(confirmation, { status: 201 });
  } catch (err: any) {
    console.error('[BFF] POST /api/appointments error:', err);

    if (err?.statusCode === 409) {
      return NextResponse.json({ error: 'Slot already booked. Please select another time.' }, { status: 409 });
    }
    if (err?.statusCode === 422) {
      return NextResponse.json({ error: err.message }, { status: 422 });
    }

    return NextResponse.json({ error: 'Unable to book appointment. Please try again or call 1800 309 0309.' }, { status: 500 });
  }
}
