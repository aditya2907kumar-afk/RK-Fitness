import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageSquare, ChevronDown, UserCheck, Menu, X } from 'lucide-react';
import { GYM_CONTACTS } from '../data/gymContacts.ts';

interface TopNavbarProps {
  onOpenConsultation: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setContactDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? 'translate-y-0 opacity-100 pointer-events-auto bg-[#050B14]/92 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : '-translate-y-full opacity-0 pointer-events-none py-3.5'
      }`}
    >
      {/* Top Hairline with red accent corner markers matching inspiration photo */}
      <div className="absolute top-0 left-6 sm:left-12 w-2 h-2 bg-[#E11D48]" aria-hidden="true" />
      <div className="absolute top-0 right-6 sm:right-12 w-2 h-2 bg-[#E11D48]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Brand: Wide Tracking Upper Typography (Matching Inspiration Photo) */}
        <a
          href="#"
          className="text-base sm:text-lg font-cormorant font-normal tracking-[0.32em] uppercase text-white whitespace-nowrap shrink-0 hover:text-[#E11D48] transition-colors"
        >
          RK FITNESS
        </a>

        {/* Center Nav Links (Hidden on small screens) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-montserrat font-medium uppercase tracking-[0.2em] text-slate-300">
          <a
            href="#facilities"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#E11D48] decoration-2"
          >
            Facilities
          </a>
          <a
            href="#atmosphere"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#E11D48] decoration-2"
          >
            Atmosphere
          </a>
          <a
            href="#specialist"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#E11D48] decoration-2"
          >
            Head Coach
          </a>
          <a
            href="#reviews"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#E11D48] decoration-2"
          >
            Reviews
          </a>
          <a
            href="#location"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#E11D48] decoration-2"
          >
            Location
          </a>
        </nav>

        {/* Action Pills: Dual Contact Menu + BOOK Capsule */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 font-montserrat">
          {/* Contact Menu Dropdown (Gym Owner + Gym Manager) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium tracking-[0.14em] uppercase text-slate-200 hover:text-white border border-white/20 hover:border-[#E11D48] rounded-full bg-white/5 backdrop-blur-md transition-all whitespace-nowrap"
              aria-label="Direct Contact (Call & WhatsApp)"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Call / WhatsApp</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${contactDropdownOpen ? 'rotate-180 text-[#E11D48]' : 'text-slate-400'}`} />
            </button>

            {contactDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#091726]/98 border border-white/20 shadow-2xl backdrop-blur-xl p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 mb-2 border-b border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#E11D48]">
                    Direct Administration Contacts
                  </span>
                </div>

                <div className="space-y-2.5">
                  {/* Gym Owner Item */}
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#E11D48]/40 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <UserCheck className="w-3 h-3 text-[#E11D48]" />
                        {GYM_CONTACTS.owner.role}
                      </span>
                      <span className="font-mono text-xs text-slate-300">
                        {GYM_CONTACTS.owner.phoneFormatted}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={`tel:${GYM_CONTACTS.owner.tel}`}
                        onClick={() => setContactDropdownOpen(false)}
                        className="flex-1 py-1.5 px-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                      >
                        <Phone className="w-3 h-3 text-[#E11D48]" />
                        <span>Call</span>
                      </a>
                      <a
                        href={GYM_CONTACTS.owner.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setContactDropdownOpen(false)}
                        className="flex-1 py-1.5 px-2.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-white text-[11px] font-medium uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                      >
                        <MessageSquare className="w-3 h-3 text-[#25D366] group-hover:text-white" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Gym Manager Item */}
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#E11D48]/40 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <UserCheck className="w-3 h-3 text-[#E11D48]" />
                        {GYM_CONTACTS.manager.role}
                      </span>
                      <span className="font-mono text-xs text-slate-300">
                        {GYM_CONTACTS.manager.phoneFormatted}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={`tel:${GYM_CONTACTS.manager.tel}`}
                        onClick={() => setContactDropdownOpen(false)}
                        className="flex-1 py-1.5 px-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                      >
                        <Phone className="w-3 h-3 text-[#E11D48]" />
                        <span>Call</span>
                      </a>
                      <a
                        href={GYM_CONTACTS.manager.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setContactDropdownOpen(false)}
                        className="flex-1 py-1.5 px-2.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-white text-[11px] font-medium uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                      >
                        <MessageSquare className="w-3 h-3 text-[#25D366] group-hover:text-white" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Book Consultation Button */}
          <button
            onClick={onOpenConsultation}
            className="px-4 sm:px-5 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-white bg-black/40 hover:bg-[#E11D48] border border-white/25 hover:border-[#E11D48] rounded-full backdrop-blur-md shadow-lg transition-all transform active:scale-95 whitespace-nowrap shrink-0"
          >
            Book
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/20 text-white hover:text-[#E11D48] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050B14]/98 border-b border-white/10 px-6 py-5 space-y-4 text-xs uppercase tracking-wider font-semibold font-montserrat">
          <div className="space-y-3 pb-3 border-b border-white/10">
            <a
              href="#facilities"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-1"
            >
              Facilities
            </a>
            <a
              href="#atmosphere"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-1"
            >
              Atmosphere
            </a>
            <a
              href="#specialist"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-1"
            >
              Head Coach
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-1"
            >
              Google Reviews
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-1"
            >
              Location &amp; Hours
            </a>
          </div>

          {/* Mobile Direct Contacts for Owner & Manager */}
          <div className="pt-2">
            <span className="block text-[10px] uppercase tracking-[0.24em] text-[#E11D48] font-bold mb-2.5">
              Contact Administration
            </span>

            <div className="space-y-2.5">
              {/* Owner */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center justify-between mb-1.5 normal-case">
                  <span className="font-semibold text-white text-[11px] uppercase tracking-wider">
                    {GYM_CONTACTS.owner.role}
                  </span>
                  <span className="font-mono text-slate-300 text-xs">
                    {GYM_CONTACTS.owner.phoneFormatted}
                  </span>
                </div>
                <div className="flex gap-2 pt-1">
                  <a
                    href={`tel:${GYM_CONTACTS.owner.tel}`}
                    className="flex-1 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-semibold flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-[#E11D48]" />
                    Call
                  </a>
                  <a
                    href={GYM_CONTACTS.owner.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 rounded-full bg-[#25D366]/20 text-white text-[10px] font-semibold flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3 text-[#25D366]" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Manager */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center justify-between mb-1.5 normal-case">
                  <span className="font-semibold text-white text-[11px] uppercase tracking-wider">
                    {GYM_CONTACTS.manager.role}
                  </span>
                  <span className="font-mono text-slate-300 text-xs">
                    {GYM_CONTACTS.manager.phoneFormatted}
                  </span>
                </div>
                <div className="flex gap-2 pt-1">
                  <a
                    href={`tel:${GYM_CONTACTS.manager.tel}`}
                    className="flex-1 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-semibold flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-[#E11D48]" />
                    Call
                  </a>
                  <a
                    href={GYM_CONTACTS.manager.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 rounded-full bg-[#25D366]/20 text-white text-[10px] font-semibold flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3 text-[#25D366]" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
