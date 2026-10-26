import React from 'react';
import { ArrowRight, Instagram } from 'lucide-react';
import { scrollToTarget } from '../utils/smoothScroll.ts';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onExploreFacilities?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onExploreFacilities,
}) => {
  const scrollToFacilities = () => {
    if (onExploreFacilities) {
      onExploreFacilities();
    } else {
      scrollToTarget('#facilities', -50);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden select-none px-3 sm:px-6 md:px-8 py-3 sm:py-6">
      {/* Architectural Inset Framing Border with Red Corner Squares (Matching Reference Inspiration) */}
      <div className="absolute inset-3 sm:inset-5 md:inset-7 border border-[#E11D48]/40 pointer-events-none z-20">
        {/* Accent Red Corner Squares */}
        <div className="absolute -top-1 -left-1 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#E11D48]" />
        <div className="absolute -top-1 -right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#E11D48]" />
        <div className="absolute -bottom-1 -left-1 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#E11D48]" />
        <div className="absolute -bottom-1 -right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#E11D48]" />
      </div>

      {/* Top Header Bar Inside Frame: Brand Name on Left, Instagram & Book Pills on Right */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between pt-3 sm:pt-4 px-2 sm:px-4 z-30">
        {/* Brand Name: Elegant uppercase serif lettering with generous letter spacing */}
        <a
          href="#"
          className="font-cormorant text-base sm:text-lg md:text-xl font-normal tracking-[0.32em] uppercase text-white hover:text-[#E11D48] transition-colors leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]"
        >
          RK FITNESS
        </a>

        {/* Top Actions: Instagram & Book Pills */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.instagram.com/rkfitness2304?vrfl=ZzE0cmx5eXNkZTB0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full border border-pink-500/40 bg-pink-950/20 hover:bg-pink-900/35 font-montserrat text-[11px] sm:text-xs font-medium tracking-wider text-pink-200 backdrop-blur-md transition-all shadow-sm hover:scale-105 active:scale-95"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>Instagram</span>
          </a>
          <button
            onClick={onOpenConsultation}
            className="px-4 sm:px-5 py-1.5 rounded-full border border-white/25 hover:border-[#E11D48] bg-black/40 hover:bg-[#E11D48] font-montserrat text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-white backdrop-blur-md transition-all shadow-md active:scale-95"
          >
            Book
          </button>
        </div>
      </div>

      {/* Main Hero Body: Centrally Aligned Luxury Editorial Typography matching Fashion Hub Reference */}
      <div className="w-full max-w-2xl mx-auto px-4 text-center z-20 flex flex-col items-center justify-center my-auto py-8 sm:py-12">
        {/* Establishment Date & Location: Small, uppercase, widely letter-spaced sans-serif text in a single horizontal line */}
        <div className="font-montserrat text-[10px] sm:text-[11px] md:text-xs font-normal tracking-[0.28em] sm:tracking-[0.34em] text-slate-200/90 uppercase mb-5 sm:mb-7 flex items-center justify-center gap-2.5 sm:gap-3.5 whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
          <span>EST. 2018</span>
          <span className="w-1.5 h-1.5 bg-[#E11D48] inline-block shrink-0" aria-hidden="true" />
          <span>JAKARIYAPUR, PATNA, BIHAR</span>
        </div>

        {/* Main Heading & Subtitle Pair */}
        <div className="mb-5 sm:mb-7 text-center">
          {/* Main Heading: Large, refined, high-contrast editorial serif typography */}
          <h1 className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-medium tracking-[-0.01em] text-white leading-[1.02] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
            RK Fitness
          </h1>

          {/* Subtitle: Elegant italic serif typography, lighter in weight and visually sophisticated */}
          <p className="font-cormorant italic text-3xl sm:text-5xl md:text-6xl font-normal text-slate-100 tracking-wide mt-1.5 sm:mt-2.5 leading-tight drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)]">
            Strength Studio
          </p>
        </div>

        {/* Service Highlights: Clean uppercase sans-serif text with generous letter spacing, centered and neatly spaced */}
        <div className="font-montserrat text-[10px] sm:text-xs md:text-[13px] font-normal tracking-[0.24em] sm:tracking-[0.28em] text-slate-200 uppercase mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto flex items-center justify-center flex-wrap gap-x-2.5 sm:gap-x-3.5 gap-y-1.5 text-center drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
          <span>POWER &amp; DISCIPLINE</span>
          <span className="text-slate-400 font-light" aria-hidden="true">—</span>
          <span>ELITE TRANSFORMATION</span>
          <span className="w-1.5 h-1.5 bg-[#E11D48] inline-block shrink-0" aria-hidden="true" />
          <span>STRENGTH CONDITIONING</span>
        </div>

        {/* Description: Refined, readable typography with a balanced line height and elegant presentation */}
        <p className="font-cormorant sm:font-sans italic font-normal text-sm sm:text-base md:text-lg text-slate-200/95 leading-[1.75] tracking-normal max-w-lg mx-auto mb-9 sm:mb-11 text-center px-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          “Begin your transformation journey with us in Patna’s premier luxury fitness and strength environment.”
        </p>

        {/* Action Buttons: Clean, uppercase sans-serif text with letter spacing and existing rounded button design */}
        <div className="flex flex-col items-center gap-3.5 w-full max-w-sm sm:max-w-md">
          {/* Primary Solid Crimson Button */}
          <button
            onClick={onOpenConsultation}
            className="w-full py-3.5 sm:py-4 px-8 bg-[#E11D48] hover:bg-[#BE123C] text-white font-montserrat font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-xs sm:text-sm rounded-full shadow-2xl transition-all transform hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            <span>CONSULT A SPECIALIST</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

          {/* Secondary Dark Frosted Outline Button */}
          <button
            onClick={scrollToFacilities}
            className="w-full py-3.5 sm:py-4 px-8 bg-[#0b121e]/85 hover:bg-[#121c2c] text-white font-montserrat font-semibold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-xs sm:text-sm rounded-full border border-white/20 hover:border-white/40 backdrop-blur-md transition-all transform hover:scale-[1.01] active:scale-98 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            <span>EXPLORE SERVICES</span>
          </button>
        </div>
      </div>

      {/* Frame Bottom Balance Spacer */}
      <div className="h-4 sm:h-6 pointer-events-none" />
    </section>
  );
};
