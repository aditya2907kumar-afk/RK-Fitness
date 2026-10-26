import React from 'react';
import { Clock, ShieldCheck, ExternalLink, Phone, MessageSquare, Instagram, UserCheck } from 'lucide-react';
import { GYM_CONTACTS } from '../data/gymContacts.ts';

export const LocationAndFooter: React.FC = () => {
  const googleMapsUrl = 'https://maps.app.goo.gl/u7o2ZSnuhNkFEM1C9?g_st=ic';

  return (
    <footer id="location" className="relative pt-20 pb-12 overflow-hidden border-t border-white/10 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* 1. Timings Row with Red Clock Icon */}
        <div className="flex flex-col items-center justify-center gap-1.5 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-montserrat font-semibold tracking-[0.24em] uppercase text-white text-halo">
            <Clock className="w-4 h-4 text-[#E11D48] shrink-0" />
            <span>MONDAY – SUNDAY</span>
            <span className="w-1.5 h-1.5 bg-[#E11D48] inline-block" />
            <span>5:30 AM – 10:00 PM</span>
          </div>
          <p className="text-[11px] sm:text-xs font-montserrat font-medium tracking-[0.18em] uppercase text-slate-300 text-halo">
            (OPEN ALL 7 DAYS FOR WALK-INS &amp; CONSULTATIONS)
          </p>
        </div>

        {/* 2. Full Facility Address (Multi-Line, Elegant Centered Typography, No Boxes) */}
        <div className="max-w-xl mx-auto text-center mb-6 px-2">
          <p className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-relaxed text-halo">
            Bajrangi Chowk, Near R J Super Market
            <br />
            or Sri Sai Medical Hall,
            <br />
            Jakariyapur, Pahari, Patna,
            <br />
            Bihar 800030
          </p>
        </div>

        {/* 3. Facility Highlights with Red Shield Icon */}
        <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs md:text-sm font-montserrat font-medium tracking-[0.2em] uppercase text-slate-200 text-halo mb-8 text-center flex-wrap px-2">
          <ShieldCheck className="w-4 h-4 text-[#E11D48] shrink-0" />
          <span>Full Air-Conditioned Training Floors</span>
          <span className="w-1.5 h-1.5 bg-[#E11D48] inline-block" />
          <span>Dedicated Changing Rooms</span>
        </div>

        {/* 4. Prominent Red Pill CTA: OPEN IN GOOGLE MAPS */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto mb-10 font-montserrat">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-8 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-bold tracking-[0.18em] uppercase flex items-center justify-center gap-2.5 shadow-2xl transition-all transform hover:scale-[1.01] active:scale-98 text-halo"
          >
            <span>OPEN IN GOOGLE MAPS</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 5. Google Maps Embed Card (Matching Screenshot Frame) */}
        <div className="relative w-full max-w-2xl mx-auto h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 mb-12">
          {/* Top-Left 'Open in Maps' Pill Button overlay matching reference */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3.5 left-3.5 z-20 px-3.5 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-900 font-montserrat font-semibold text-xs shadow-md border border-slate-200 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-[#1a73e8] font-bold">Open in Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#1a73e8]" />
          </a>

          {/* Interactive Google Maps Iframe */}
          <iframe
            title="RK FITNESS Location Google Maps"
            src="https://maps.google.com/maps?q=Bajrangi+Chowk,+near+R+J+Super+Market,+Jakariyapur,+Pahari,+Patna,+Bihar+800030&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 filter contrast-[1.02]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Direct Contact Links: Gym Owner and Gym Manager (Both Call and WhatsApp) */}
        <div className="w-full max-w-2xl mx-auto mb-12 font-montserrat">
          <div className="text-center mb-5">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#E11D48] font-semibold block">
              Direct Contact &amp; Inquiries
            </span>
            <p className="text-xs text-slate-300 tracking-wider uppercase mt-1">
              Reach Gym Administration Directly
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gym Owner Contact Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md flex flex-col items-center justify-between gap-3 text-center transition-all hover:border-[#E11D48]/50">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#E11D48]">
                  <UserCheck className="w-3.5 h-3.5" />
                  {GYM_CONTACTS.owner.role}
                </span>
                <p className="font-mono text-sm sm:text-base text-white font-medium mt-1 tracking-wide">
                  {GYM_CONTACTS.owner.phoneFormatted}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 w-full pt-1">
                <a
                  href={`tel:${GYM_CONTACTS.owner.tel}`}
                  className="flex-1 py-2 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Call</span>
                </a>
                <a
                  href={GYM_CONTACTS.owner.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-white border border-[#25D366]/40 text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366] group-hover:text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Gym Manager Contact Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md flex flex-col items-center justify-between gap-3 text-center transition-all hover:border-[#E11D48]/50">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-300">
                  <UserCheck className="w-3.5 h-3.5 text-[#E11D48]" />
                  {GYM_CONTACTS.manager.role}
                </span>
                <p className="font-mono text-sm sm:text-base text-white font-medium mt-1 tracking-wide">
                  {GYM_CONTACTS.manager.phoneFormatted}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 w-full pt-1">
                <a
                  href={`tel:${GYM_CONTACTS.manager.tel}`}
                  className="flex-1 py-2 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Call</span>
                </a>
                <a
                  href={GYM_CONTACTS.manager.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-white border border-[#25D366]/40 text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366] group-hover:text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Official Instagram Pill */}
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.instagram.com/rkfitness2304?vrfl=ZzE0cmx5eXNkZTB0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-pink-950/25 hover:bg-pink-900/40 text-pink-200 border border-pink-500/35 text-xs uppercase tracking-[0.14em] font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Official Instagram: @rkfitness2304</span>
            </a>
          </div>
        </div>

        {/* Quiet Editorial Footer */}
        <div className="w-full pt-8 border-t border-white/20 flex flex-col items-center justify-center gap-4 text-xs text-slate-200 text-center text-halo">
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-center">
            <span className="font-cormorant font-normal text-white tracking-[0.32em] uppercase text-base text-center luxury-text-shadow">
              RK FITNESS
            </span>
            <span className="text-[#E11D48]">·</span>
            <span className="font-montserrat font-medium text-white tracking-wider">Strength &amp; Conditioning Club</span>
            <span className="text-[#E11D48]">·</span>
            <span className="font-montserrat font-normal text-slate-300">Bajrangi Chowk, Pahari, Patna</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-center font-montserrat text-xs tracking-wider">
            <a href="#atmosphere" className="text-slate-200 hover:text-white transition-colors">Atmosphere</a>
            <a href="#facilities" className="text-slate-200 hover:text-white transition-colors">Facilities</a>
            <a href="#specialist" className="text-slate-200 hover:text-white transition-colors">Coach Kushal</a>
            <a href="#reviews" className="text-slate-200 hover:text-white transition-colors">Google Reviews</a>
            <a href="#location" className="text-slate-200 hover:text-white transition-colors">Location &amp; Hours</a>
          </div>

          <p className="tabular-nums text-center text-slate-400 font-montserrat text-xs tracking-wide">
            © {new Date().getFullYear()} RK FITNESS. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
