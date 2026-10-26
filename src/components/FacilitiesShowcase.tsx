import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Building2, X, Maximize2 } from 'lucide-react';
import { FacilityItem } from '../data/facilitiesData.ts';

interface FacilitiesShowcaseProps {
  facilities: FacilityItem[];
}

export const FacilitiesShowcase: React.FC<FacilitiesShowcaseProps> = ({
  facilities,
}) => {
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Position & Physics state for continuous right-to-left infinite motion
  const offsetRef = useRef<number>(0);
  const baseSpeed = -1.25; // Continuous right-to-left speed (~75px/sec)
  const velocityRef = useRef<number>(baseSpeed);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Tripled list for seamless wrap-around without cutoffs
  const repeatedFacilities = [...facilities, ...facilities, ...facilities];

  const animate = useCallback(() => {
    if (!trackRef.current) return;

    const singleSetWidth = trackRef.current.scrollWidth / 3;

    if (!isDraggingRef.current) {
      if (isHoveredRef.current) {
        // Paused on hover
        velocityRef.current = 0;
      } else {
        // Decay back to smooth base right-to-left glide
        velocityRef.current += (baseSpeed - velocityRef.current) * 0.05;
        offsetRef.current += velocityRef.current;
      }

      // Infinite seamless loop wrap-around
      if (singleSetWidth > 0) {
        if (offsetRef.current <= -singleSetWidth) {
          offsetRef.current += singleSetWidth;
        } else if (offsetRef.current > 0) {
          offsetRef.current -= singleSetWidth;
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

  // Touch & Pointer Down
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

  // Touch & Pointer Move (Finger Drag gestures)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;

    const currentX = e.clientX;
    const deltaX = currentX - lastXRef.current;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);

    offsetRef.current += deltaX;
    dragDistanceRef.current += Math.abs(deltaX);

    // Instant flick velocity
    velocityRef.current = (deltaX / dt) * 16.6;

    lastXRef.current = currentX;
    lastTimeRef.current = now;

    const singleSetWidth = trackRef.current.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (offsetRef.current <= -singleSetWidth) offsetRef.current += singleSetWidth;
      else if (offsetRef.current > 0) offsetRef.current -= singleSetWidth;
    }

    trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  };

  // Touch & Pointer Up (Flick inertia release)
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (trackRef.current && trackRef.current.hasPointerCapture(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }

    // Clamp flick velocity
    velocityRef.current = Math.max(-16, Math.min(16, velocityRef.current));
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    if (trackRef.current && trackRef.current.hasPointerCapture(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section id="facilities" className="relative py-20 overflow-hidden text-center">
      {/* Header: High-Contrast Floating Typography, Center-Aligned */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col items-center justify-center text-center gap-3">
        <div className="inline-flex items-center justify-center gap-2 text-xs font-montserrat tracking-[0.28em] text-[#E11D48] font-medium uppercase mb-1 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 shadow-md text-center text-halo">
          <Building2 className="w-3.5 h-3.5" />
          <span>World-Class Amenities</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-medium text-white tracking-tight luxury-text-shadow text-center">
          11 Signature Facilities
        </h2>
      </div>

      {/* Infinite Right-to-Left Continuous Slider with Touch / Finger Gestures (Strictly NO buttons) */}
      <div
        ref={containerRef}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        className="w-full cursor-grab active:cursor-grabbing select-none relative overflow-visible touch-pan-y marquee-mask"
      >
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className="flex gap-6 will-change-transform py-4 px-4 gpu-layer"
          style={{ width: 'max-content' }}
        >
          {repeatedFacilities.map((facility, index) => (
            <div
              key={`${facility.id}-${index}`}
              onClick={(e) => {
                // Ignore click if user was performing a drag/swipe gesture (> 8px)
                if (dragDistanceRef.current > 8) {
                  e.preventDefault();
                  return;
                }
                setLightboxImage({ url: facility.photoUrl, title: facility.name });
              }}
              className="group relative w-[300px] sm:w-[360px] h-72 sm:h-80 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/15 hover:border-white/35 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:-translate-y-2 hover:scale-[1.01] cursor-pointer bg-black/40 gpu-layer"
            >
              <img
                src={facility.photoUrl}
                alt={facility.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                loading="lazy"
              />
              {/* Bottom gradient so text directly on the picture is 100% visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 pointer-events-none" />

              {/* Facility Number Badge */}
              <div className="absolute top-3.5 left-3.5 text-[11px] font-montserrat font-medium tracking-wider px-2.5 py-0.5 rounded-full bg-black/75 text-slate-200 border border-white/20 pointer-events-none">
                #{String((index % 11) + 1).padStart(2, '0')}
              </div>

              {/* Facility Name & Tagline Written Directly on the Picture */}
              <div className="absolute inset-x-0 bottom-0 p-5 pt-12 flex flex-col items-center justify-end text-center pointer-events-none">
                <span className="text-[10px] sm:text-[11px] font-montserrat text-[#E11D48] font-semibold tracking-[0.24em] uppercase mb-1 drop-shadow-md">
                  {facility.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-cormorant font-medium text-white group-hover:text-[#FCD34D] transition-colors luxury-text-shadow tracking-tight leading-tight text-center">
                  {facility.name}
                </h3>
              </div>

              {/* Subtle Hover Lens Icon */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-[#E11D48] text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-black/92 backdrop-blur-lg"
            aria-hidden="true"
          />
          <div className="relative max-w-5xl w-full max-h-[90vh] z-10 flex flex-col items-center">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 sm:right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-[#E11D48] text-white flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="rounded-xl overflow-hidden shadow-2xl max-h-[85vh]">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
            <p className="text-sm font-serif text-white font-semibold mt-3 text-center">
              {lightboxImage.title} · RK FITNESS
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
