'use client';
// ============================================================
// NARAYANA HEALTH — AI Health Assistant Widget
// Floating chat button → expandable panel
// Symptom guidance + streaming Gemini chat via BFF
// ============================================================

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { AIMessage, SymptomGuidanceResponse } from '@/lib/types';

// ── Types ─────────────────────────────────────────────────

type Mode = 'idle' | 'symptom' | 'chat';

// ── Inline SVG Icon helper ────────────────────────────────

function Icon({ d, size = 18, ...rest }: { d: string; size?: number; [k: string]: any }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  bot: 'M12 8V4H8m4 4H8m4 0h4m-4 0v4m0-4a4 4 0 0 1 4 4m-8 0a4 4 0 0 1 4-4M8 12a4 4 0 0 0 4 4m0 0a4 4 0 0 0 4-4m-8 4v4h4m-4-4h4m4-4v4h-4',
  close: 'M18 6 6 18M6 6l12 12',
  send: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z',
  sparkle: 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z',
  chevron: 'M9 18l6-6-6-6',
  heart: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
};

// ── Urgency style mapping ─────────────────────────────────

const urgencyConfig = {
  emergency: { label: '🚨 Emergency', color: '#D32F2F', bg: '#FFEBEE' },
  urgent: { label: '⚠️ Urgent', color: '#E65100', bg: '#FFF3E0' },
  routine: { label: '✅ Routine', color: '#1B5E20', bg: '#E8F5E9' },
  preventive: { label: '💙 Preventive', color: '#0D47A1', bg: '#E3F2FD' },
};

// ── Suggested prompts ─────────────────────────────────────

const SUGGESTED_PROMPTS = [
  'I have chest pain and breathlessness',
  'My child has high fever for 3 days',
  'I need a second opinion on cancer diagnosis',
  'Find me a knee replacement specialist in Bangalore',
];

// ── Component ─────────────────────────────────────────────

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('idle');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [symptomResult, setSymptomResult] = useState<SymptomGuidanceResponse | null>(null);
  const [streamingText, setStreamingText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // Focus input when panel opens
  useEffect(() => {
    if (open && mode !== 'idle') {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, mode]);

  const handleSymptomSubmit = useCallback(async (symptoms: string) => {
    if (!symptoms.trim() || loading) return;
    setLoading(true);
    setSymptomResult(null);

    try {
      const res = await fetch('/api/ai/symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });
      const data: SymptomGuidanceResponse = await res.json();
      setSymptomResult(data);
    } catch {
      setSymptomResult({
        recommendedSpecialities: [],
        urgencyLevel: 'routine',
        urgencyMessage: 'Please call 1800 309 0309 for guidance.',
      });
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const handleChatSend = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setInput('');

    const userMsg: AIMessage = { role: 'user', content: text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setStreamingText('');

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
        signal: abortRef.current.signal,
      });

      if (!res.body) throw new Error('No stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const raw = line.slice(6).trim();
            if (raw === '[DONE]') break;
            try {
              const chunk = JSON.parse(raw);
              full += chunk.delta;
              setStreamingText(full);
            } catch { /* skip */ }
          }
        }
      }

      const assistantMsg: AIMessage = {
        role: 'assistant',
        content: full || 'Please call 1800 309 0309 for assistance.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setStreamingText('');
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I had trouble connecting. Please call **1800 309 0309** for immediate assistance.',
          timestamp: new Date().toISOString(),
        }]);
      }
      setStreamingText('');
    } finally {
      setLoading(false);
    }
  }, [loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (mode === 'chat') handleChatSend(input);
      else if (mode === 'symptom') { handleSymptomSubmit(input); setInput(''); }
    }
  };

  const reset = () => {
    setMode('idle');
    setMessages([]);
    setInput('');
    setSymptomResult(null);
    setStreamingText('');
    abortRef.current?.abort();
  };

  const urgency = symptomResult ? urgencyConfig[symptomResult.urgencyLevel] : null;

  return (
    <>
      {/* ── Floating Button ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Health Assistant"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #034EA2 0%, #0262CC 100%)',
          color: '#fff', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(3,78,162,0.4)',
        }}
        whileHover={{ scale: 1.1, boxShadow: '0 8px 32px rgba(3,78,162,0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Icon d={ICONS.close} size={22} />
              </motion.span>
            : <motion.span key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Icon d={ICONS.sparkle} size={22} />
              </motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            style={{
              position: 'fixed', bottom: 96, right: 24, zIndex: 999,
              width: 380, maxHeight: 580, borderRadius: 20,
              background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              border: '1px solid rgba(3,78,162,0.12)',
            }}
          >
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #034EA2 0%, #0262CC 100%)', padding: '16px 20px', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon d={ICONS.sparkle} size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>NH Health Assistant</div>
                  <div style={{ fontSize: 11, opacity: 0.75, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
                    Powered by Gemini AI
                  </div>
                </div>
                {mode !== 'idle' && (
                  <button onClick={reset} title="Start over"
                    style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 8, padding: '4px 8px', fontSize: 11, cursor: 'pointer' }}>
                    New chat
                  </button>
                )}
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: mode === 'idle' ? 0 : '12px 16px' }}>

              {/* ── IDLE: Mode selector ── */}
              {mode === 'idle' && (
                <div style={{ padding: '20px 16px' }}>
                  <p style={{ fontSize: 13, color: '#546E7A', marginBottom: 16, lineHeight: 1.6 }}>
                    Hi! I'm your Narayana Health AI assistant. How can I help you today?
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { icon: ICONS.sparkle, label: 'Describe your symptoms', desc: 'Get speciality & urgency guidance', mode: 'symptom' as Mode, color: '#034EA2' },
                      { icon: ICONS.bot, label: 'Ask me anything', desc: 'Chat about NH services, doctors, & more', mode: 'chat' as Mode, color: '#6A1B9A' },
                    ].map(opt => (
                      <button key={opt.mode} onClick={() => setMode(opt.mode)}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', border: '1.5px solid #E0E7F0', borderRadius: 12, background: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                        onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = opt.color; (e.currentTarget as HTMLButtonElement).style.background = '#F5F8FF'; }}
                        onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E0E7F0'; (e.currentTarget as HTMLButtonElement).style.background = '#fff'; }}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: opt.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon d={opt.icon} size={17} style={{ color: opt.color }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, color: '#1A2332', marginBottom: 2 }}>{opt.label}</div>
                          <div style={{ fontSize: 12, color: '#78909C' }}>{opt.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Emergency CTA */}
                  <a href="tel:18003090309"
                    style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, padding: '10px 14px', background: '#FFEBEE', borderRadius: 10, border: '1px solid #FFCDD2', textDecoration: 'none' }}>
                    <Icon d={ICONS.phone} size={15} style={{ color: '#D32F2F' }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#D32F2F' }}>Emergency?</div>
                      <div style={{ fontSize: 11, color: '#C62828' }}>1800 309 0309 — Available 24×7</div>
                    </div>
                  </a>
                </div>
              )}

              {/* ── SYMPTOM mode ── */}
              {mode === 'symptom' && !symptomResult && (
                <div>
                  <p style={{ fontSize: 13, color: '#546E7A', marginBottom: 12, lineHeight: 1.6 }}>
                    Describe your symptoms and I'll help identify which specialist you should see.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {SUGGESTED_PROMPTS.map(p => (
                      <button key={p} onClick={() => { setInput(p); handleSymptomSubmit(p); }}
                        style={{ fontSize: 11, padding: '5px 10px', borderRadius: 999, border: '1px solid #C5D9F0', background: '#F0F7FF', color: '#034EA2', cursor: 'pointer' }}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SYMPTOM result ── */}
              {mode === 'symptom' && symptomResult && (
                <div>
                  {/* Urgency badge */}
                  <div style={{ background: urgency?.bg, border: `1px solid ${urgency?.color}30`, borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: urgency?.color, marginBottom: 4 }}>{urgency?.label}</div>
                    <p style={{ fontSize: 12, color: '#37474F', lineHeight: 1.6, margin: 0 }}>{symptomResult.urgencyMessage}</p>
                  </div>

                  {/* Specialities */}
                  {symptomResult.recommendedSpecialities.length > 0 && (
                    <>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#455A64', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Recommended Specialities</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                        {symptomResult.recommendedSpecialities.slice(0, 3).map(s => (
                          <Link key={s.slug} href={`/specialities/${s.slug}`}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid #C5D9F0', borderRadius: 10, textDecoration: 'none', background: '#F5F8FF' }}>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 13, color: '#034EA2' }}>{s.name}</div>
                              <div style={{ fontSize: 11, color: '#78909C', marginTop: 2 }}>{s.reasoning}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 11, fontWeight: 700, color: '#1B5E20', background: '#E8F5E9', padding: '2px 8px', borderRadius: 999 }}>
                                {Math.round(s.confidence * 100)}%
                              </span>
                              <Icon d={ICONS.chevron} size={13} style={{ color: '#90A4AE' }} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href="/find-a-doctor"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', background: '#034EA2', color: '#fff', borderRadius: 10, fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                      <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" size={14} /> Book Now
                    </Link>
                    <button onClick={() => { setSymptomResult(null); setInput(''); }}
                      style={{ padding: '10px 14px', border: '1.5px solid #C5D9F0', borderRadius: 10, background: '#fff', color: '#034EA2', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* ── CHAT mode: messages ── */}
              {mode === 'chat' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {messages.length === 0 && (
                    <p style={{ fontSize: 13, color: '#78909C', textAlign: 'center', marginTop: 8 }}>
                      Ask me about doctors, hospitals, specialities, or any health question.
                    </p>
                  )}
                  {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '82%', padding: '10px 13px', borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        background: msg.role === 'user' ? '#034EA2' : '#F5F7FA',
                        color: msg.role === 'user' ? '#fff' : '#1A2332',
                        fontSize: 13, lineHeight: 1.6,
                      }}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {streamingText && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <div style={{ maxWidth: '82%', padding: '10px 13px', borderRadius: '14px 14px 14px 4px', background: '#F5F7FA', fontSize: 13, lineHeight: 1.6, color: '#1A2332' }}>
                        {streamingText}
                        <span style={{ display: 'inline-block', width: 6, height: 14, background: '#034EA2', marginLeft: 2, borderRadius: 2, animation: 'blink 0.8s step-end infinite' }} />
                      </div>
                    </div>
                  )}
                  {loading && !streamingText && (
                    <div style={{ display: 'flex', gap: 5, padding: '12px 14px' }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#90A4AE', animation: `bounce 0.8s ${i * 0.15}s infinite` }} />
                      ))}
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            {/* Input */}
            {mode !== 'idle' && (
              <div style={{ padding: '10px 12px', borderTop: '1px solid #F0F4F8', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={mode === 'symptom' ? 'Describe your symptoms...' : 'Ask me anything...'}
                  rows={1}
                  disabled={loading}
                  style={{
                    flex: 1, padding: '10px 12px', border: '1.5px solid #E0E7F0', borderRadius: 12,
                    fontSize: 13, fontFamily: 'var(--font-stack)', outline: 'none', resize: 'none',
                    background: '#F5F8FF', color: '#1A2332',
                    maxHeight: 100, overflowY: 'auto',
                  }}
                />
                <button
                  onClick={() => mode === 'chat' ? handleChatSend(input) : (handleSymptomSubmit(input), setInput(''))}
                  disabled={loading || !input.trim()}
                  style={{
                    width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: loading || !input.trim() ? '#E0E7F0' : '#034EA2',
                    color: loading || !input.trim() ? '#90A4AE' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all 0.15s',
                  }}
                >
                  <Icon d={ICONS.send} size={16} />
                </button>
              </div>
            )}

            {/* Disclaimer */}
            <div style={{ padding: '6px 16px 10px', borderTop: '1px solid #F0F4F8' }}>
              <p style={{ fontSize: 10, color: '#B0BEC5', textAlign: 'center', lineHeight: 1.5 }}>
                AI guidance is not a substitute for professional medical advice. For emergencies call 112.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes blink { 50% { opacity: 0 } }
        @keyframes bounce { 0%,80%,100% { transform: translateY(0) } 40% { transform: translateY(-6px) } }
      `}</style>
    </>
  );
}
