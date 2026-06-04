// ============================================================
// NARAYANA HEALTH — AI Gateway Client
// Calls /api/ai/* on Next.js BFF → Spring Boot → LLM Gateway
// Server-side: used in API route handlers
// Client-side: SSE streaming for chat responses
// ============================================================

import { SymptomGuidanceResponse, AIMessage, AIStreamChunk, NHAPIError } from '@/lib/types';

// ── Server-Side AI Calls (via Spring Boot) ────────────────

const SPRING_API_URL = process.env.SPRING_API_URL!;
const SPRING_API_KEY = process.env.SPRING_API_KEY!;
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY!;
const GOOGLE_AI_MODEL = process.env.GOOGLE_AI_MODEL ?? 'gemini-2.0-flash';
const GOOGLE_EMBEDDING_MODEL = process.env.GOOGLE_EMBEDDING_MODEL ?? 'text-embedding-004';

// ── Symptom Guidance (Server-Side) ───────────────────────

/**
 * Maps symptoms to recommended specialities + urgency level
 * Uses Gemini + RAG over speciality/doctor index in OpenSearch
 */
export async function getSymptomGuidance(symptoms: string): Promise<SymptomGuidanceResponse> {
  const res = await fetch(`${SPRING_API_URL}/api/ai/symptoms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': SPRING_API_KEY,
    },
    body: JSON.stringify({ symptoms }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new NHAPIError('AI_SYMPTOM_ERROR', res.status, body?.message ?? 'AI symptom guidance failed');
  }

  return res.json();
}

/**
 * Direct Gemini call for symptom guidance (when Spring Boot is unavailable)
 * Fallback used in development if Spring Boot is not running
 */
export async function getSymptomGuidanceDirect(symptoms: string): Promise<SymptomGuidanceResponse> {
  if (!GOOGLE_AI_API_KEY) throw new NHAPIError('AI_NOT_CONFIGURED', 503, 'AI is not configured');

  const prompt = `
You are a medical triage assistant for Narayana Health, one of India's largest hospital networks.
A patient has described their symptoms: "${symptoms}"

Respond ONLY with valid JSON matching this TypeScript interface:
{
  recommendedSpecialities: Array<{ name: string; slug: string; confidence: number; reasoning: string }>;
  urgencyLevel: "emergency" | "urgent" | "routine" | "preventive";
  urgencyMessage: string;
}

Rules:
- urgencyLevel "emergency": chest pain, stroke signs, severe breathing difficulty, unconsciousness
- urgencyLevel "urgent": high fever, severe pain, sudden vision loss, confusion
- urgencyLevel "routine": chronic conditions, scheduled follow-ups
- confidence is 0.0 to 1.0
- slugs use kebab-case matching NH speciality slugs (cardiology, oncology, neurology, orthopaedics, etc.)
- Keep urgencyMessage concise, warm, and actionable

Respond ONLY with the JSON object, no markdown, no explanation.
  `.trim();

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_AI_MODEL}:generateContent?key=${GOOGLE_AI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
      }),
    }
  );

  if (!res.ok) throw new NHAPIError('GEMINI_ERROR', res.status, 'Gemini API call failed');

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new NHAPIError('GEMINI_EMPTY', 500, 'Gemini returned empty response');

  return JSON.parse(text) as SymptomGuidanceResponse;
}

// ── Embedding (for RAG) ───────────────────────────────────

export async function embedText(text: string): Promise<number[]> {
  if (!GOOGLE_AI_API_KEY) return [];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_EMBEDDING_MODEL}:embedContent?key=${GOOGLE_AI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: `models/${GOOGLE_EMBEDDING_MODEL}`, content: { parts: [{ text }] } }),
    }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.embedding?.values ?? [];
}

// ── FAQ Answer ────────────────────────────────────────────

export async function answerFAQ(
  question: string,
  context: string
): Promise<string> {
  if (!GOOGLE_AI_API_KEY) return 'AI assistant is currently unavailable. Please call 1800 309 0309.';

  const prompt = `
You are the AI assistant for Narayana Health. Answer the patient's question concisely and helpfully.
Use only the provided context. If the answer is not in the context, say "I recommend speaking to our team at 1800 309 0309."

Context:
${context}

Patient question: ${question}

Answer (2–4 sentences, friendly tone):
  `.trim();

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_AI_MODEL}:generateContent?key=${GOOGLE_AI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 300 },
      }),
    }
  );

  if (!res.ok) return 'I was unable to process your question. Please call 1800 309 0309.';
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Please contact our team at 1800 309 0309.';
}

// ── Client-side: SSE Streaming Chat ──────────────────────

/**
 * Stream AI chat responses from /api/ai/chat (BFF → Spring Boot → Gemini)
 * Uses Server-Sent Events for real-time token streaming
 */
export async function* streamAIChat(
  messages: AIMessage[],
  signal?: AbortSignal
): AsyncGenerator<AIStreamChunk> {
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!res.ok) {
    yield { delta: 'I encountered an error. Please try again or call 1800 309 0309.', done: true };
    return;
  }

  const reader = res.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') { yield { delta: '', done: true }; return; }
        try {
          const chunk = JSON.parse(raw) as AIStreamChunk;
          yield chunk;
        } catch { /* skip malformed */ }
      }
    }
  }
}

// ── Content Summarisation ─────────────────────────────────

export async function summariseContent(content: string, maxWords = 80): Promise<string> {
  if (!GOOGLE_AI_API_KEY || content.length < 200) return content.substring(0, 300);

  const prompt = `Summarise the following medical content in ${maxWords} words or fewer. Plain text, no markdown:\n\n${content.substring(0, 3000)}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GOOGLE_AI_MODEL}:generateContent?key=${GOOGLE_AI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 150 },
      }),
    }
  );

  if (!res.ok) return content.substring(0, 300);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? content.substring(0, 300);
}
