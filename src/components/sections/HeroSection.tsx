'use client';
// ============================================================
// NARAYANA HEALTH — Premium Canvas Image-Scrub Hero
// Based on 80-frame JPG sequence from /public/hero image sequence/
// Uses GSAP ScrollTrigger to scrub frames smoothly on scroll
// Combined with responsive text overlays and premium UI design
// ============================================================

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { trustStats } from '@/lib/data';

// ── Animated Metric Component ────────────────────────────────
function AnimatedMetric({ value, active }: { value: string; active: boolean }) {
  const [currentVal, setCurrentVal] = useState(0);
  const animatedRef = useRef(false);

  // Parse numeric part and suffix
  const numericStr = value.replace(/[^0-9.]/g, '');
  const suffixPart = value.replace(/[0-9.]/g, '');
  const targetVal = parseFloat(numericStr);
  const isFloat = value.includes('.');

  useEffect(() => {
    if (active) {
      if (!animatedRef.current) {
        animatedRef.current = true;
        const obj = { val: 0 };
        // Smooth count-up with GSAP
        import('gsap').then(({ default: gsap }) => {
          gsap.to(obj, {
            val: targetVal,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              setCurrentVal(obj.val);
            }
          });
        });
      }
    } else {
      // Reset when scrolling back up so it rolls again when scrolling down!
      animatedRef.current = false;
      setCurrentVal(0);
    }
  }, [active, targetVal]);

  const displayNum = isFloat 
    ? currentVal.toFixed(1) 
    : Math.round(currentVal).toString();

  const letterSuffix = suffixPart.replace(/[^a-zA-Z]/g, '');
  const plusSuffix = suffixPart.includes('+') ? '+' : '';

  return (
    <span className="inline-flex items-baseline font-black font-sans leading-none tracking-tight text-[#034EA2]">
      <span>{displayNum}</span>
      {letterSuffix && <span>{letterSuffix}</span>}
      {plusSuffix && <span className="text-[#ED1C24]">{plusSuffix}</span>}
    </span>
  );
}

// ── Types ────────────────────────────────────────────────────
interface TextPhase {
  startFrame: number;
  endFrame:   number;
  badge:       string;
  heading:     string;
  subheading:  string;
  cta?:        { label: string; href: string };
}

const TEXT_PHASES: TextPhase[] = [
  {
    startFrame: 0,
    endFrame:   55,
    badge:       '01 // CLINICAL EXCELLENCE',
    heading:     'Expert Care,\nRight in Front\nof You.',
    subheading:  "India's most trusted specialists at 24+ hospitals — seamless consultation, compassionate care.",
    cta:         { label: 'Book Appointment', href: '/find-a-doctor' },
  },
];

export default function CanvasScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePhase, setActivePhase] = useState<TextPhase | null>(TEXT_PHASES[0]);
  const [phaseOpacity, setPhaseOpacity] = useState(1);
  const [scrollPct, setScrollPct] = useState(0);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  const [currentFrameFloat, setCurrentFrameFloat] = useState(0);

  // Calculate white screen transition progress - Removed white fade per user request
  const whiteProgress = 0;

  // Configuration Constants
  const frameCount = 80;
  
  // Helper to map index to exact JPG paths inside public folder
  const currentFrame = (index: number) => 
    `/hero image sequence/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Set internal canvas resolution to standard 16:9 1080p
    canvas.width = 1920;
    canvas.height = 1080;
    
    // Enable 100% maximum high-fidelity rendering quality
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    const images: HTMLImageElement[] = [];
    const airframes = { frame: 0 };
    let loadedCount = 0;

    // 1. Preload all images to prevent flickering on scroll
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
        
        if (loadedCount === frameCount) {
          setIsLoaded(true);
          initScrollAnimation();
        }
      };
      img.onerror = () => {
        // Fallback for missing frames so progress bar still finishes
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setIsLoaded(true);
          initScrollAnimation();
        }
      };
      images.push(img);
    }

    // 2. Render function using CSS object-cover for performance
    const render = () => {
      const img = images[airframes.frame];
      if (!img) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // 3. Setup GSAP ScrollTrigger once loading completes
    const initScrollAnimation = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Draw first frame initially
      render();

      gsap.to(airframes, {
        frame: frameCount - 1,
        snap: 'frame', // Snaps to integer frame values smoothly
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2}`, // Finishes scrub before the parallax slide-up begins
          scrub: 0.6,
          onUpdate: () => {
            render();
            setCurrentFrameFloat(airframes.frame);
            const currentIdx = Math.round(airframes.frame);
            setCurrentFrameIdx(currentIdx);

            // Update active text phase based on current frame
            const nextPhase = TEXT_PHASES.find(p => currentIdx >= p.startFrame && currentIdx <= p.endFrame) ?? null;
            
            setActivePhase(prev => {
              if (prev?.badge !== nextPhase?.badge) {
                setPhaseOpacity(0);
                setTimeout(() => {
                  setPhaseOpacity(1);
                }, 150);
              }
              return nextPhase;
            });
          }
        }
      });

      // Slide up metrics section starting at the 70th frame (index 69)
      gsap.fromTo(metricsRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `top+=${window.innerHeight * 2 * (69 / 79)} top`,
            end: () => `top+=${window.innerHeight * 2} top`,
            scrub: 0.6,
          }
        }
      );
    };

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(st => st.kill());
      });
    };
  }, []);

  // Track scroll progress for the top progress line and fade indicators
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const gone  = -rect.top;
      setScrollPct(Math.max(0, Math.min(1, gone / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative transition-colors duration-700 w-full h-[400vh]" 
      style={{ 
        backgroundColor: 'white'
      }}
    >
      
      {/* ══ PRELOADER SCREEN ═══════════════════════════════ */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050d18] text-white">
          <div className="mb-8 flex flex-col items-center gap-1">
            <div className="text-white font-black tracking-tighter" style={{ fontSize: 28 }}>
              <span className="text-[#034EA2]">N</span>
              <span className="text-[#ED1C24]">H</span>
            </div>
            <div className="text-white/30 font-light text-[10px] tracking-[0.3em] uppercase">
              Narayana Health
            </div>
          </div>
          
          <p className="tracking-widest text-[10px] uppercase mb-4 text-white/50">Optimizing Cinematic Assets</p>
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#034EA2] to-[#1a8f8e] transition-all duration-150" 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <span className="text-xs font-mono mt-2 text-[#1a8f8e]">{loadingProgress}%</span>
        </div>
      )}

      {/* ══ STICKY CONTAINER FOR VIEWPORT SCALING ══════════ */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Solid white background that fades in behind the canvas */}
        <div 
          className="absolute inset-0 bg-white pointer-events-none"
          style={{ 
            opacity: whiteProgress,
            zIndex: 0,
          }}
        />

        {/* The 16:9 Responsive Canvas with CSS aspect ratio lock */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover max-h-screen transition-all duration-300"
          style={{
            opacity: 1.0 - (whiteProgress * 0.85),
            mixBlendMode: currentFrameIdx >= 65 ? 'multiply' : 'normal',
            zIndex: 1,
          }}
        />

        {/* ── GRADIENT OVERLAYS ───────────────────────────── */}
        <div
          className="absolute inset-y-0 left-0 w-3/5 pointer-events-none z-10"
          style={{
            opacity: currentFrameIdx >= 55 
              ? Math.max(0, 1 - (currentFrameIdx - 55) / 5) 
              : 1,
            background: 'linear-gradient(to right, rgba(3,13,30,0.85) 0%, rgba(5,18,42,0.5) 45%, transparent 100%)',
            transition: 'opacity 0.15s ease-out',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
          style={{
            opacity: currentFrameIdx >= 55 
              ? Math.max(0, 1 - (currentFrameIdx - 55) / 5) 
              : 1,
            background: 'linear-gradient(to top, rgba(3,13,30,0.9) 0%, transparent 100%)',
            transition: 'opacity 0.15s ease-out',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{
            opacity: 1 - whiteProgress,
            background: 'linear-gradient(to bottom, rgba(3,13,30,0.4) 0%, transparent 100%)',
            transition: 'opacity 0.2s ease',
          }}
        />

        {/* ── SCROLL PROGRESS LINE ────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-30 bg-white/5 pointer-events-none">
          <div
            className="h-full"
            style={{
              width: `${scrollPct * 100}%`,
              background: 'linear-gradient(90deg, #034EA2, #1a8f8e, #034EA2)',
            }}
          />
        </div>

        {/* ══ TEXT OVERLAY ════════════════════════════════ */}
        <div
          className="absolute z-20 flex flex-col"
          style={{
            left:      'clamp(28px, 6vw, 80px)',
            top:       '50%',
            transform: 'translateY(-52%)',
            maxWidth:  'clamp(280px, 38vw, 540px)',
            transition: 'opacity 0.35s ease',
            opacity: activePhase ? phaseOpacity * (1 - whiteProgress) : 0,
            pointerEvents: currentFrameIdx >= 60 ? 'none' : 'auto',
          }}
        >
          {activePhase && (
            <>
              {/* Heading */}
              <h1
                className="font-black text-white leading-none mb-6"
                style={{
                  fontSize:    'clamp(32px, 4.8vw, 68px)',
                  lineHeight:  1.15,
                  whiteSpace:  'pre-line',
                  textShadow:  '0 2px 24px rgba(0,0,0,0.5)',
                  letterSpacing: '-0.02em',
                }}
              >
                {activePhase.heading.split('\n').map((line, li) => (
                  <span key={li} className="block">
                    {li === 1 ? (
                      <span style={{ color: '#006DE5' }}>
                        {line}
                      </span>
                    ) : line}
                  </span>
                ))}
              </h1>

              {/* Sub-copy */}
              <p
                className="text-white/60 leading-relaxed"
                style={{
                  fontSize:  'clamp(13px, 1.4vw, 17px)',
                  maxWidth:  420,
                  textShadow:'0 1px 12px rgba(0,0,0,0.6)',
                  marginBottom: 'clamp(28px, 4.5vh, 48px)',
                }}
              >
                {activePhase.subheading}
              </p>

              {/* CTA */}
              {activePhase.cta && (
                <div 
                  className="flex flex-wrap gap-3"
                  style={{
                    marginBottom: 'clamp(32px, 5.5vh, 64px)',
                  }}
                >
                  <Link
                    href={activePhase.cta.href}
                    className="inline-flex items-center gap-2.5 font-semibold rounded-full transition-all duration-200"
                    style={{
                      padding:    'clamp(10px, 1.2vh, 14px) clamp(20px, 2vw, 28px)',
                      fontSize:   'clamp(12px, 1.2vw, 14px)',
                      background: 'linear-gradient(135deg, #ED1C24 0%, #c61219 100%)',
                      color:      '#fff',
                      boxShadow:  '0 4px 22px rgba(237,28,36,0.4)',
                    }}
                    onMouseOver={e => {
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 30px rgba(237,28,36,0.6)';
                      (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={e => {
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 22px rgba(237,28,36,0.4)';
                      (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                    </svg>
                    {activePhase.cta.label}
                  </Link>

                  <Link
                    href="/hospitals"
                    className="inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-200"
                    style={{
                      padding:       'clamp(10px, 1.2vh, 14px) clamp(18px, 1.8vw, 24px)',
                      fontSize:      'clamp(12px, 1.2vw, 14px)',
                      background:    'rgba(255,255,255,0.07)',
                      border:        '1px solid rgba(255,255,255,0.18)',
                      color:         'rgba(255,255,255,0.85)',
                      backdropFilter:'blur(12px)',
                    }}
                    onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.14)'; }}
                    onMouseOut={e =>  { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)'; }}
                  >
                    <MapPin size={15} strokeWidth={2.2} />
                    Find a Hospital
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* ══ DOTS INDICATOR (right side) ═══════════════════ */}
        <div
          className="absolute z-20 flex flex-col gap-3 items-center"
          style={{ 
            right: 'clamp(18px, 3vw, 36px)', 
            top: '50%', 
            transform: 'translateY(-50%)',
            opacity: 1 - whiteProgress,
            transition: 'opacity 0.3s ease',
            pointerEvents: currentFrameIdx >= 60 ? 'none' : 'auto',
          }}
        >
          {TEXT_PHASES.map((phase, i) => {
            const isActive = activePhase?.badge === phase.badge;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:      isActive ? 8  : 4,
                    height:     isActive ? 8  : 4,
                    background: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
                    boxShadow:  isActive ? '0 0 8px rgba(255,255,255,0.5)' : 'none',
                  }}
                />
                {i < TEXT_PHASES.length - 1 && (
                  <div
                    className="w-px rounded-full"
                    style={{ height: 24, background: 'rgba(255,255,255,0.1)' }}
                  />
                )}
              </div>
            );
          })}
        </div>



        {/* ══ SCROLL DOWN HINT ══════════════════════════════ */}
        <div
          className="absolute z-20 flex flex-col items-center gap-1.5"
          style={{
            bottom:    'clamp(48px, 8vh, 72px)',
            left:      '50%',
            transform: 'translateX(-50%)',
            opacity:   Math.max(0, 1 - scrollPct * 8) * (1 - whiteProgress),
            transition:'opacity 0.3s',
            pointerEvents: currentFrameIdx >= 60 ? 'none' : 'auto',
          }}
        >
          <span
            className="font-medium text-white/30 text-[9px] tracking-[0.2em] uppercase"
          >
            Scroll to Explore
          </span>
          <div
            className="flex flex-col items-center gap-0.5"
            style={{ animation: 'scroll-bounce 1.8s ease-in-out infinite' }}
          >
            <div className="w-px h-4 bg-white/20 rounded-full" />
            <div className="w-1 h-1 rounded-full bg-white/30" />
          </div>
        </div>

      </div>

      {/* ══ NEW SECTION: TRUSTED BY MILLIONS ══════════════ */}
      <div
        id="metrics-section"
        ref={metricsRef}
        className="absolute bottom-0 left-0 w-full z-20 flex flex-col items-center justify-start pt-0"
        style={{
          boxShadow: 'none',
        }}
      >
        {/* Clouds top overlay serving as a separate transparent transition section */}
        <img 
          src="/Clouds overlay.png" 
          alt="Clouds Transition Overlay" 
          className="w-full h-[120px] md:h-[180px] -mt-24 md:-mt-36 pointer-events-none select-none z-10 flex-shrink-0 object-cover object-bottom bg-transparent"
        />

        {/* Solid white metrics section */}
        <div className="w-full bg-white py-28 md:py-40 min-h-[50vh] px-6 flex flex-col items-center justify-start">
          <div className="w-full max-w-6xl mx-auto text-center relative z-20">
            {/* Title Section */}
            <div className="mb-[40px]">
              <h2
                className="text-center font-sans"
                style={{
                  fontSize: '42px',
                  fontWeight: 700,
                  color: '#1A1A2E',
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                Trusted by Millions Across India
              </h2>
              <p
                className="text-center mx-auto font-sans"
                style={{
                  fontSize: '16px',
                  color: '#444455',
                  lineHeight: 1.5,
                  maxWidth: 560,
                  margin: '0 auto 24px',
                }}
              >
                Narayana Health delivers world-class care at scale — without compromising affordability or compassion.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 relative w-full max-w-7xl mx-auto px-6 md:px-10">
              {trustStats.map((stat, i) => (
                <div 
                  key={stat.label}
                  className={`text-center px-6 py-6 pt-3 md:py-4 md:pt-3 transition-all duration-500 ${
                    i === 0 ? 'border-r border-b border-gray-100 md:border-b-0 md:border-r md:border-gray-200' :
                    i === 1 ? 'border-b border-gray-100 md:border-b-0 md:border-r md:border-gray-200' :
                    i === 2 ? 'border-r border-gray-100 md:border-b-0 md:border-r md:border-gray-200' :
                    'md:border-none'
                  }`}
                >
                  <div 
                    className="font-black leading-none font-sans mb-3"
                    style={{
                      fontSize: 'clamp(38px, 5.2vw, 72px)',
                    }}
                  >
                    <AnimatedMetric value={stat.value} active={scrollPct >= 0.9} />
                  </div>
                  <div 
                  className="font-semibold tracking-[0.15em] font-sans"
                    style={{
                      fontSize: 'clamp(11px, 1.1vw, 13px)',
                      color: '#444455', // Slate gray
                      opacity: 0.85,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.3); }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
      `}</style>

    </div>
  );
}
