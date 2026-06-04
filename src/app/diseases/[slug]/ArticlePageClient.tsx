'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { fadeInUp, viewportOnce } from '@/lib/motion';
import { Calendar, Clock, ChevronRight, Share2, Bookmark, ThumbsUp, AlertCircle } from 'lucide-react';

const articleContent = {
  overview: 'This condition affects millions of Indians every year. Understanding the causes, symptoms and available treatments can significantly improve outcomes. At Narayana Health, our specialists are among the most experienced in the country, having treated thousands of patients with excellent results.',
  causes: [
    'Genetic factors and family history',
    'Lifestyle factors including diet, exercise and stress',
    'Environmental exposures and risk factors',
    'Other underlying medical conditions',
    'Age-related changes in the body',
  ],
  symptoms: [
    'Early warning signs may be subtle or absent',
    'Progressive symptoms that worsen over time',
    'Acute episodes requiring immediate medical attention',
    'Secondary complications in advanced cases',
    'Variability in presentation between individuals',
  ],
  diagnosis: 'Our multidisciplinary team uses the latest diagnostic technologies including advanced imaging, laboratory investigations, and functional assessments to arrive at an accurate diagnosis. We believe in evidence-based medicine and use established diagnostic criteria.',
  treatment: 'Treatment at Narayana Health is highly personalised. Our specialists develop comprehensive care plans that may include medication, minimally invasive procedures, surgery, rehabilitation and lifestyle modification — tailored specifically to each patient\'s needs and circumstances.',
  faq: [
    { q: 'How do I book an appointment with a specialist?', a: 'You can book online through our website, call 1800 309 0309 (toll-free), or visit any Narayana Health facility.' },
    { q: 'Is treatment covered by insurance?', a: 'We accept all major health insurance policies. Our insurance desk will help verify your coverage and process claims.' },
    { q: 'Can I get a second opinion?', a: 'Absolutely. We encourage patients to seek second opinions and our specialists are happy to review reports from other hospitals.' },
    { q: 'What is the typical treatment duration?', a: 'Treatment duration varies depending on the condition and individual factors. Your specialist will provide a detailed timeline during consultation.' },
  ],
};

interface Article {
  id: number; title: string; category: string; snippet: string;
  date: string; readTime: string; slug: string; image: string;
}

export default function ArticlePageClient({ article }: { article: Article }) {
  return (
    <>
      {/* ── Hero ── */}
      <div style={{ background: 'var(--nh-blue-5)', borderBottom: '1px solid var(--border-light)', padding: 'var(--space-6) 0' }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 'var(--space-4)', fontSize: '13px' }}>
            {[{ label: 'Home', href: '/' }, { label: 'Health Library', href: '/diseases' }, { label: article.category, href: `/diseases?category=${article.category}` }, { label: article.title.substring(0, 40) + '...', href: '#' }].map((crumb, i, arr) => (
              <React.Fragment key={i}>
                {i < arr.length - 1
                  ? <Link href={crumb.href} style={{ color: 'var(--nh-blue)', fontSize: '12px' }}>{crumb.label}</Link>
                  : <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{crumb.label}</span>
                }
                {i < arr.length - 1 && <ChevronRight size={12} style={{ color: 'var(--text-muted)' }} />}
              </React.Fragment>
            ))}
          </nav>

          <Badge variant="category">{article.category}</Badge>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 700, color: 'var(--nh-blue)', lineHeight: 1.25, margin: 'var(--space-4) 0 var(--space-4)', maxWidth: 760 }}
          >
            {article.title}
          </motion.h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--nh-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>👨‍⚕️</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Dr. Reviewed by NH Editorial</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Medical Advisory Team</div>
              </div>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '13px', color: 'var(--text-muted)' }}>
              <Clock size={13} /> {article.readTime} read
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Updated: {new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ padding: 'var(--space-7) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--space-8)', alignItems: 'start' }}>

            {/* Article body */}
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-6)', borderLeft: '4px solid var(--nh-blue)', paddingLeft: 'var(--space-5)', fontStyle: 'italic' }}>
                {article.snippet}
              </p>

              {/* Overview */}
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--nh-blue)', marginBottom: 'var(--space-4)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--border-light)' }}>Overview</h2>
              <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>{articleContent.overview}</p>

              {/* INLINE CTA */}
              <div style={{ background: 'linear-gradient(135deg, var(--nh-blue) 0%, var(--nh-blue-dark) 100%)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: 6 }}>Need to speak to a {article.category} specialist?</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Book an appointment with our expert doctors today.</p>
                </div>
                <Button variant="white" size="md" href="/find-a-doctor" icon={<Calendar size={15} />} iconPosition="left">Book Appointment</Button>
              </div>

              {/* Causes */}
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--nh-blue)', marginBottom: 'var(--space-4)' }}>Common Causes</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 'var(--space-6)' }}>
                {articleContent.causes.map((cause, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--nh-blue)', marginTop: 8, flexShrink: 0 }} />
                    {cause}
                  </li>
                ))}
              </ul>

              {/* Symptoms */}
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--nh-blue)', marginBottom: 'var(--space-4)' }}>Signs & Symptoms</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 'var(--space-6)' }}>
                {articleContent.symptoms.map((s, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--nh-red)', marginTop: 8, flexShrink: 0 }} />
                    {s}
                  </li>
                ))}
              </ul>

              {/* Diagnosis & Treatment */}
              {['Diagnosis', 'Treatment at Narayana Health'].map((heading, i) => (
                <div key={heading}>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--nh-blue)', marginBottom: 'var(--space-4)' }}>{heading}</h2>
                  <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                    {i === 0 ? articleContent.diagnosis : articleContent.treatment}
                  </p>
                </div>
              ))}

              {/* FAQ */}
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--nh-blue)', marginBottom: 'var(--space-5)' }}>Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                {articleContent.faq.map((faq, i) => (
                  <div key={i} style={{ background: 'var(--nh-blue-5)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', borderLeft: '4px solid var(--nh-blue)' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Q: {faq.q}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>A: {faq.a}</p>
                  </div>
                ))}
              </div>

              {/* Social share */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-5) 0', borderTop: '1px solid var(--border-light)', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Was this helpful?</span>
                <Button variant="ghost" size="sm" icon={<ThumbsUp size={14} />} iconPosition="left">Yes, helpful</Button>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Share:</span>
                  {[
                    { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                    { label: 'Twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                    { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
                  ].map(({ label, path }) => (
                    <a key={label} href="#" aria-label={`Share on ${label}`} style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d={path}/></svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{ background: '#FFF8E1', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', border: '1px solid #FFE082', display: 'flex', gap: 10, marginTop: 'var(--space-5)' }}>
                <AlertCircle size={16} style={{ color: '#F57C00', flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: '12px', color: '#795548', lineHeight: 1.6 }}>
                  <strong>Medical Disclaimer:</strong> This article is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.
                </p>
              </div>
            </motion.article>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: 90, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {/* Book CTA */}
              <div style={{ background: 'var(--nh-blue)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', color: '#fff' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: 8 }}>Consult a {article.category} Doctor</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
                  Get expert advice from our specialist doctors.
                </p>
                <Button variant="white" size="md" href="/find-a-doctor" fullWidth icon={<Calendar size={14} />} iconPosition="left">Book Now</Button>
              </div>

              {/* Emergency info */}
              <div style={{ background: '#FFF5F5', border: '1px solid #FFCDD2', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--nh-red)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Emergency?</p>
                <a href="tel:18003090309" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--nh-red)', fontWeight: 700, fontSize: '16px' }}>
                  📞 1800 309 0309
                </a>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 4 }}>24×7 Emergency Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
