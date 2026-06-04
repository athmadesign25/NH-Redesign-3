// ============================================================
// BFF Route: POST /api/ai/symptoms
// GET  /api/ai/symptoms  — not allowed
// Sends symptoms to Gemini (via Spring Boot or direct fallback)
// Returns speciality recommendations + urgency level
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { getSymptomGuidance, getSymptomGuidanceDirect } from '@/lib/api/ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { symptoms } = body;

    if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length < 5) {
      return NextResponse.json({ error: 'Please describe your symptoms in more detail.' }, { status: 400 });
    }

    if (symptoms.length > 2000) {
      return NextResponse.json({ error: 'Symptom description is too long. Please keep it under 2000 characters.' }, { status: 400 });
    }

    // Try Spring Boot first, fall back to direct Gemini
    let guidance;
    try {
      guidance = await getSymptomGuidance(symptoms);
    } catch {
      console.warn('[AI] Spring Boot unavailable, falling back to direct Gemini');
      guidance = await getSymptomGuidanceDirect(symptoms);
    }

    return NextResponse.json(guidance, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err: any) {
    console.error('[BFF] POST /api/ai/symptoms error:', err);
    return NextResponse.json(
      {
        recommendedSpecialities: [],
        urgencyLevel: 'routine',
        urgencyMessage: 'We were unable to process your request. Please call 1800 309 0309 for guidance.',
      },
      { status: 200 } // Return 200 with empty guidance rather than 500
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
