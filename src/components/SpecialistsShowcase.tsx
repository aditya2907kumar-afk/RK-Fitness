import React from 'react';
import { Phone, MessageSquare, Instagram } from 'lucide-react';
import { generateCoachPortraitArt } from '../data/coachVisual.ts';

interface SpecialistsShowcaseProps {
  coachPhoto?: string;
  onOpenConsultation?: () => void;
}

export const PERMANENT_COACH_PHOTO = '/uploads/C2C56DFA-CDFD-4964-9A3C-66269D9E1FC1_1793002793641.png';

export const SpecialistsShowcase: React.FC<SpecialistsShowcaseProps> = ({
  coachPhoto,
}) => {
  const currentPhoto = (coachPhoto && coachPhoto.trim() !== '') ? coachPhoto : PERMANENT_COACH_PHOTO;

  return (
    <section id="specialist" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl mx-auto text-center">
        {/* Dedicated Coach Box: Perfectly framed with optimal horizontal space */}
        <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black/60 backdrop-blur-xl px-3 sm:px-8 lg:px-12 py-7 sm:py-10 text-center flex flex-col items-center justify-between gpu-layer butter-scale hover:border-white/35">
          
          {/* Coach Photo: Framed directly inside the Coach Box */}
          <div className="relative mb-3 group inline-block">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl ring-4 ring-[#E11D48]/30 relative mx-auto bg-black/70">
              <img
                src={currentPhoto}
                alt="Coach Kushal Sharma"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
          </div>

          {/* 1) Coach Name */}
          <div className="text-center">
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-cormorant font-medium text-white tracking-tight luxury-text-shadow text-center">
              Kushal Sharma
            </h3>
          </div>

          {/* 2) Years of experience: 6 years & 3) Clients trained: 200+ */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-14 my-6 sm:my-8 text-center font-montserrat">
            <div className="text-center">
              <span className="block text-xs sm:text-sm uppercase tracking-[0.22em] text-slate-300 font-medium">
                Years of Experience
              </span>
              <span className="block text-2xl sm:text-4xl font-cormorant font-semibold text-white tracking-wide mt-1">
                6 Years
              </span>
            </div>

            <div className="hidden sm:block w-px h-12 bg-white/20" />

            <div className="text-center">
              <span className="block text-xs sm:text-sm uppercase tracking-[0.22em] text-slate-300 font-medium">
                Clients Trained
              </span>
              <span className="block text-2xl sm:text-4xl font-cormorant font-semibold text-white tracking-wide mt-1">
                200+
              </span>
            </div>
          </div>

          {/* Bottom Row: Three separate neat, clean ovals in strictly one line without collision */}
          <div className="w-full pt-5 sm:pt-7 border-t border-white/15 flex flex-row items-center justify-between font-montserrat select-none">
            
            {/* Bottom Left: Instagram Oval (Pushed to far left) */}
            <a
              href="https://www.instagram.com/kus291027?mdxt=bGwzOHhoYm9oYmx5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 hover:border-pink-500/60 text-pink-200 hover:text-white text-[10px] min-[360px]:text-[11px] sm:text-xs font-medium tracking-wide transition-all whitespace-nowrap shadow-sm hover:scale-105 active:scale-95 shrink-0"
              aria-label="Kushal Sharma Instagram"
            >
              <Instagram className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4 text-pink-400 shrink-0" />
              <span className="hidden sm:inline">@kus291027</span>
              <span className="hidden min-[360px]:inline sm:hidden">Instagram</span>
              <span className="min-[360px]:hidden">Insta</span>
            </a>

            {/* Bottom Centre: Call Oval (Generous clearance on both sides) */}
            <a
              href="tel:06261815647"
              className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50 text-white text-[10px] min-[360px]:text-[11px] sm:text-xs font-semibold tracking-tight sm:tracking-wider transition-all whitespace-nowrap shadow-sm hover:scale-105 active:scale-95 shrink-0 mx-1"
              aria-label="Call Coach Kushal Sharma"
            >
              <Phone className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 sm:w-3.5 sm:h-3.5 text-[#E11D48] shrink-0" />
              <span className="font-mono">06261-815647</span>
            </a>

            {/* Bottom Right: WhatsApp Oval (Pushed to far right) */}
            <a
              href="https://wa.me/916261815647"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/35 hover:border-[#25D366]/60 text-emerald-300 hover:text-white text-[10px] min-[360px]:text-[11px] sm:text-xs font-medium tracking-wide transition-all whitespace-nowrap shadow-sm hover:scale-105 active:scale-95 shrink-0"
              aria-label="WhatsApp Coach Kushal Sharma"
            >
              <MessageSquare className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4 text-[#25D366] shrink-0" />
              <span className="hidden min-[360px]:inline">WhatsApp</span>
              <span className="min-[360px]:hidden">WA</span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};
