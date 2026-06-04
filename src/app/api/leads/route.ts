// ============================================================
// BFF Route: POST /api/leads
// Proxies to Spring Boot Lead Service → CRM
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/api/spring';
import { LeadPayload } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json();

    // Validation
    if (!body.name || !body.email || !body.phone || !body.country) {
      return NextResponse.json(
        { error: 'Name, email, phone, and country are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 });
    }

    // If Spring Boot not configured, log and return mock success
    if (!process.env.SPRING_API_URL) {
      console.log('[BFF] Lead captured (mock):', { name: body.name, country: body.country });
      return NextResponse.json(
        { leadId: `MOCK-${Date.now()}`, estimatedResponseHours: 4 },
        { status: 201 }
      );
    }

    const confirmation = await createLead(body);
    return NextResponse.json(confirmation, { status: 201 });
  } catch (err: any) {
    console.error('[BFF] POST /api/leads error:', err);
    return NextResponse.json(
      { error: 'Unable to submit enquiry. Please call +91 98457 27272.' },
      { status: 500 }
    );
  }
}
