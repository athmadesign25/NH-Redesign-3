// ============================================================
// BFF Route: POST /api/ai/chat
// Streaming SSE chat responses via Gemini
// Spring Boot wrapper if available, direct Gemini as fallback
// ============================================================

import { NextRequest } from 'next/server';
import { AIMessage } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SPRING_API_URL = process.env.SPRING_API_URL;
const SPRING_API_KEY = process.env.SPRING_API_KEY;
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
const GOOGLE_AI_MODEL = process.env.GOOGLE_AI_MODEL ?? 'gemini-2.0-flash';

const SYSTEM_PROMPT = `You are the AI health assistant for Narayana Health, one of India's leading hospital networks with 24+ hospitals and 5,000+ doctors.

Your role:
- Help patients understand their symptoms and recommend the right speciality
- Answer questions about Narayana Health hospitals, doctors, and services
- Guide patients to book appointments
- Provide health education based on evidence-based medicine

Rules:
- NEVER diagnose a medical condition — say "based on your symptoms, I recommend consulting a [speciality] specialist"
- Always recommend calling 1800 309 0309 for urgent or emergency concerns
- Be warm, empathetic and clear — patients may be anxious
- Keep responses concise (2-4 sentences unless detail is specifically needed)
- If asked about costs, say "costs vary by procedure and doctor — our team at 1800 309 0309 can give you an exact estimate"
- For emergencies: "Please call 112 or go to your nearest emergency room immediately. Our 24×7 emergency line is 1800 309 0309."`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: AIMessage[] = body.messages ?? [];

    if (!messages.length) {
      return new Response('{"error":"No messages provided"}', { status: 400 });
    }

    // Try Spring Boot streaming first
    if (SPRING_API_URL && SPRING_API_KEY) {
      try {
        const upstream = await fetch(`${SPRING_API_URL}/api/ai/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': SPRING_API_KEY,
            'Accept': 'text/event-stream',
          },
          body: JSON.stringify({ messages }),
        });

        if (upstream.ok && upstream.body) {
          return new Response(upstream.body, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'X-Data-Source': 'spring-boot',
            },
          });
        }
      } catch {
        console.warn('[AI Chat] Spring Boot unavailable, falling back to direct Gemini');
      }
    }

    // Fallback: Direct Gemini streaming
    if (!GOOGLE_AI_API_KEY) {
      const fallback = 'data: {"delta":"I\'m currently unavailable. Please call 1800 309 0309.","done":true}\n\ndata: [DONE]\n\n';
      return new Response(fallback, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
      });
    }

    // Build Gemini conversation
    const geminiMessages = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_AI_MODEL}:streamGenerateContent?key=${GOOGLE_AI_API_KEY}&alt=sse`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!geminiRes.ok || !geminiRes.body) {
      const errMsg = 'data: {"delta":"I\'m having trouble connecting right now. Please call 1800 309 0309.","done":true}\n\ndata: [DONE]\n\n';
      return new Response(errMsg, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
      });
    }

    // Transform Gemini SSE → our SSE format
    const stream = new ReadableStream({
      async start(controller) {
        const reader = geminiRes.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const raw = line.slice(6).trim();
                if (raw === '[DONE]') continue;
                try {
                  const parsed = JSON.parse(raw);
                  const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (text) {
                    const chunk = JSON.stringify({ delta: text, done: false });
                    controller.enqueue(new TextEncoder().encode(`data: ${chunk}\n\n`));
                  }
                } catch { /* skip */ }
              }
            }
          }
        } finally {
          controller.enqueue(new TextEncoder().encode('data: {"delta":"","done":true}\n\ndata: [DONE]\n\n'));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Data-Source': 'gemini-direct',
      },
    });
  } catch (err) {
    console.error('[BFF] POST /api/ai/chat error:', err);
    const errMsg = 'data: {"delta":"Sorry, something went wrong. Please call 1800 309 0309.","done":true}\n\ndata: [DONE]\n\n';
    return new Response(errMsg, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
    });
  }
}
