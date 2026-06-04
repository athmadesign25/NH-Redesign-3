'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { healthArticles } from '@/lib/data';
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/motion';
import { Clock, ChevronRight, BookOpen } from 'lucide-react';

const articleColors = ['#E6EDF8', '#E8F5E9', '#FFF3E0', '#F3E5F5'];

function ArticleCard({ article, index }: { article: typeof healthArticles[0]; index: number }) {
  return (
    <motion.div variants={fadeInUp}>
      <Link href={`/diseases/${article.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <motion.div
          whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(3,78,162,0.12)' }}
          style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.2s',
          }}
        >
          {/* Image area */}
          <div style={{ height: 200, background: articleColors[index % 4], position: 'relative', overflow: 'hidden' }}>
            {article.image ? (
              <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '64px', opacity: 0.25 }}>
                  {['❤️', '🧬', '🦴', '💊'][index % 4]}
                </div>
              </div>
            )}
            <motion.div
              whileHover={{ opacity: 0.1 }}
              initial={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: '#000', transition: 'opacity 0.3s' }}
            />
            <div style={{ position: 'absolute', bottom: 'var(--space-3)', left: 'var(--space-4)' }}>
              <Badge variant="category">{article.category}</Badge>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: 'var(--space-5)', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, color: 'var(--text-muted)', fontSize: '12px' }}>
              <Clock size={12} />
              {article.readTime} read
              <span style={{ margin: '0 4px', opacity: 0.4 }}>·</span>
              {new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 10, flex: 1 }}>
              {article.title}
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
              {article.snippet.substring(0, 100)}...
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--nh-blue)', fontWeight: 600, fontSize: '13px' }}>
              Read More <ChevronRight size={13} />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function HealthLibrary() {
  return (
    <section className="section-white section-pad" aria-label="Health library">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-7)' }}
        >
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--nh-blue)', background: 'var(--nh-blue-10)', padding: '4px 14px', borderRadius: 999, marginBottom: 14 }}>
            Health Library
          </span>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: 12 }}>
            Know More, Live Better
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
            Expert-reviewed articles on diseases, symptoms, treatments and healthy living. Written by Narayana Health doctors.
          </p>
        </motion.div>

        {/* 4-col grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-5)' }}
        >
          {healthArticles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}
        >
          <Button variant="ghost" size="md" href="/diseases" icon={<BookOpen size={16} />} iconPosition="left">
            Browse Health Library
          </Button>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          [aria-label="Health library"] .container > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          [aria-label="Health library"] .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
