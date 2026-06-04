'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    router.push(`/find-a-doctor?${params.toString()}`);
    onClose();
  };
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[999] flex justify-center p-4 pointer-events-none items-start" style={{ paddingTop: '84px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto relative w-full max-w-[1150px] overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
              {/* FindDoctorWidget UI inside Modal */}
              <div style={{
                background: '#fff',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-7)',
                boxShadow: 'var(--shadow-4)',
                position: 'relative',
              }}>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-[1002]"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}
                >
                  <X size={24} strokeWidth={2.5} />
                </button>

                {/* Search form */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-3)', alignItems: 'end' }} className="find-doctor-form">
                  <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Search Doctors, Specialities or Hospitals
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for doctors, treatments and specialities, conditions or procedures"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        autoFocus
                        style={{ width: '100%', padding: '16px 16px 16px 44px', border: '1px solid var(--border-light)', borderRadius: '9999px', background: 'var(--bg-card)', fontSize: '15px', fontFamily: 'var(--font-stack)', outline: 'none', transition: 'border 0.15s' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--nh-blue)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                      />
                    </div>
                  </div>

                  {/* Search button */}
                  <motion.button
                    whileHover={{ backgroundColor: 'var(--nh-blue-dark)', scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSearch}
                    style={{ background: 'var(--nh-blue)', color: '#fff', border: 'none', borderRadius: '9999px', padding: '16px 32px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-stack)', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', boxShadow: 'var(--shadow-2)' }}
                  >
                    <Search size={18} />
                    Search
                  </motion.button>
                </div>

                {/* Quick links */}
                <div style={{ marginTop: 'var(--space-5)', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Popular:</span>
                  {['Cardiologist', 'Orthopaedic Surgeon', 'Neurologist', 'Oncologist'].map(tag => (
                    <button key={tag} onClick={() => { setSearchQuery(tag); handleSearch(); }}
                      style={{ background: 'var(--nh-blue-5)', color: 'var(--nh-blue)', border: '1px solid var(--nh-blue-20)', borderRadius: 999, padding: '6px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-stack)' }}>
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Alphabet Search */}
                <div style={{
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  background: '#fff',
                  padding: '24px',
                  margin: 'var(--space-6) 0 0 0',
                  width: '100%'
                }}>
                  <h3 style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    You can also find treatments & procedures by first letter
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(letter => (
                      <a
                        key={letter}
                        href={`/search?letter=${letter.toLowerCase()}`}
                        onClick={onClose}
                        style={{
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          border: '1px solid var(--border-light)',
                          color: 'var(--text-primary)',
                          background: '#fff',
                          transition: 'all 0.15s ease',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--nh-blue)';
                          e.currentTarget.style.color = 'var(--nh-blue)';
                          e.currentTarget.style.background = 'var(--nh-blue-5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-light)';
                          e.currentTarget.style.color = 'var(--text-primary)';
                          e.currentTarget.style.background = '#fff';
                        }}
                      >
                        {letter}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <style jsx global>{`
            @media (max-width: 768px) {
              .find-doctor-form {
                grid-template-columns: 1fr !important;
              }
              .find-doctor-form > button {
                width: 100%;
                justify-content: center;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
