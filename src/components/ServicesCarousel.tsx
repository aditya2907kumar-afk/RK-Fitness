import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../data/servicesData.ts';

interface ServicesCarouselProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  isLocked: boolean;
  onTriggerServiceUpload?: (serviceKey: string) => void;
}

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({
  services,
  onSelectService,
  isLocked,
  onTriggerServiceUpload,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Position and Physics state
  const offsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(-1.3); // Base right-to-left speed ~78px/sec at 60fps
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);

  const [hasScrolledManually, setHasScrolledManually] = useState(false);

  // Triple duplicated list for seamless wrap-around without glitches
  const repeatedServices = [...services, ...services, ...services];

  const animate = useCallback(() => {
    if (!trackRef.current) return;

    const trackWidth = trackRef.current.scrollWidth / 3;

    if (!isDraggingRef.current) {
      if (isHoveredRef.current) {
        // Paused on hover
        velocityRef.current = 0;
      } else {
        // Smoothly decay back to standard base speed (-1.3px per frame)
        const targetBaseSpeed = -1.3;
        velocityRef.current += (targetBaseSpeed - velocityRef.current) * 0.05;
        offsetRef.current += velocityRef.current;
      }

      // Wrap around modulo logic
      if (trackWidth > 0) {
        if (offsetRef.current <= -trackWidth) {
          offsetRef.current += trackWidth;
        } else if (offsetRef.current > 0) {
          offsetRef.current -= trackWidth;
        }
      }

      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }

    animFrameIdRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animFrameIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [animate]);

  // Pointer Down (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    dragDistanceRef.current = 0;
    velocityRef.current = 0;

    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId);
    }
  };

  // Pointer Move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;

    const currentX = e.clientX;
    const deltaX = currentX - lastXRef.current;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);

    offsetRef.current += deltaX;
    dragDistanceRef.current += Math.abs(deltaX);

    // Track instant velocity for flick
    velocityRef.current = (deltaX / dt) * 16.6;

    lastXRef.current = currentX;
    lastTimeRef.current = now;

    const trackWidth = trackRef.current.scrollWidth / 3;
    if (trackWidth > 0) {
      if (offsetRef.current <= -trackWidth) offsetRef.current += trackWidth;
      else if (offsetRef.current > 0) offsetRef.current -= trackWidth;
    }

    trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  };

  // Pointer Up
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setHasScrolledManually(true);

    if (trackRef.current && trackRef.current.hasPointerCapture(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }

    // Clamp flick velocity to comfortable range
    velocityRef.current = Math.max(-15, Math.min(15, velocityRef.current));
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    if (trackRef.current && trackRef.current.hasPointerCapture(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }
  };

  // Manual nudge buttons
  const nudge = (direction: 'left' | 'right') => {
    velocityRef.current = direction === 'left' ? -8 : 8;
  };

  return (
    <section id="services" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.25em] text-[#E11D48] font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mastery &amp; Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight luxury-text-shadow">
            15 Signature Strength Disciplines
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Every protocol is customized for progressive tension, structural longevity, and peak output.
            Click any card to inspect training blueprints and reserve your slot.
          </p>
        </div>

        {/* Desktop Carousel Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => nudge('right')}
            className="w-11 h-11 rounded-xl bg-black/60 border border-white/20 hover:border-[#E11D48] text-white flex items-center justify-center transition-all hover:bg-black active:scale-95"
            aria-label="Previous services"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => nudge('left')}
            className="w-11 h-11 rounded-xl bg-black/60 border border-white/20 hover:border-[#E11D48] text-white flex items-center justify-center transition-all hover:bg-black active:scale-95"
            aria-label="Next services"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Touch & Mouse Drag Track Container */}
      <div
        ref={containerRef}
        className="w-full cursor-grab active:cursor-grabbing select-none relative overflow-visible"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className="flex gap-6 will-change-transform py-4 px-4 touch-pan-y"
          style={{ width: 'max-content' }}
        >
          {repeatedServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              onClick={(e) => {
                // Ignore click if it was a significant drag gesture (> 8px)
                if (dragDistanceRef.current > 8) {
                  e.preventDefault();
                  return;
                }
                onSelectService(service);
              }}
              className="group relative w-[310px] sm:w-[350px] shrink-0 rounded-2xl bg-black/55 border border-white/20 hover:border-[#E11D48] transition-all duration-300 shadow-2xl overflow-hidden flex flex-col transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(225,29,72,0.22)] cursor-pointer backdrop-blur-xl"
            >
              {/* Photo Area (Zero badges or timings overlaid on the photo) */}
              <div className="relative w-full h-56 overflow-hidden bg-[#091726]">
                <img
                  src={service.defaultPhoto}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Optional Unlocked Studio Edit Trigger */}
                {!isLocked && onTriggerServiceUpload && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTriggerServiceUpload(service.key);
                    }}
                    className="absolute top-3 right-3 z-20 px-2.5 py-1 text-[11px] font-semibold bg-[#E11D48]/90 text-white rounded-md shadow-lg hover:bg-[#E11D48] transition-colors"
                  >
                    Change Photo
                  </button>
                )}
              </div>

              {/* Card Body & Details */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-black/40 to-black/70">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-[#E11D48] font-cinzel uppercase mb-1">
                    {service.subtitle}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-white transition-colors leading-snug line-clamp-2 luxury-text-shadow">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                    Click to view program
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#E11D48] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Helper cue */}
      <div className="text-center mt-4">
        <p className="text-xs text-slate-400">
          Hover to pause · Drag to slide manually · 15 specialized training disciplines
        </p>
      </div>
    </section>
  );
};
