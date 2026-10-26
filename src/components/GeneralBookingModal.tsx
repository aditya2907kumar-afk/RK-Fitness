import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Send, Phone, User, UserCheck } from 'lucide-react';
import { GYM_CONTACTS } from '../data/gymContacts.ts';

interface GeneralBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeneralBookingModal: React.FC<GeneralBookingModalProps> = ({ isOpen, onClose }) => {
  const [recipient, setRecipient] = useState<'owner' | 'manager'>('owner');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('Powerlifting & Strength Development');

  // Handle ESC key to easily dismiss and go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeContact = GYM_CONTACTS[recipient];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedText = `*New Consultation & Membership Inquiry — RK FITNESS*
━━━━━━━━━━━━━━━━━━━
*Recipient:* ${activeContact.role}
*Name:* ${name.trim() || 'Guest Inquirer'}
*Contact Phone:* ${phone.trim() || 'Not specified'}
*Primary Focus:* ${goal}
*Facility:* Bajrangi Chowk, Jakariyapur, Pahari, Patna (near R J Super Market)
━━━━━━━━━━━━━━━━━━━
_Sent via RK FITNESS Web Terminal_`;

    const encoded = encodeURIComponent(formattedText);
    const targetUrl = `${activeContact.whatsappUrl}?text=${encoded}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop — click anywhere outside to immediately go back */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer"
        aria-hidden="true"
        title="Click to go back"
      />

      {/* Compact Card — Shorter, clean, centered, and never takes over full screen */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#091726]/98 border border-white/20 shadow-2xl p-5 sm:p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Navigation Row: Clear "← Back" button on left & "X" on right */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <button
            onClick={onClose}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-montserrat font-semibold uppercase tracking-wider text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 transition-all active:scale-95"
            aria-label="Go back to website"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Back</span>
          </button>

          <span className="text-[11px] font-montserrat font-bold text-[#E11D48] tracking-[0.2em] uppercase">
            RK FITNESS
          </span>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E11D48] text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Title */}
        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl font-cormorant font-medium text-white luxury-text-shadow leading-tight">
            Consultation &amp; Membership
          </h2>
          <p className="text-[11px] font-montserrat text-slate-400 mt-0.5">
            Bajrangi Chowk, Pahari, Patna · Open Daily 5:30 AM – 10:00 PM
          </p>
        </div>

        {/* Fast Recipient Switcher */}
        <div className="mb-3.5 font-montserrat">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRecipient('owner')}
              className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                recipient === 'owner'
                  ? 'bg-[#E11D48]/25 border-[#E11D48] text-white shadow-sm'
                  : 'bg-white/[0.04] border-white/15 text-slate-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                <UserCheck className="w-3 h-3 text-[#E11D48]" />
                <span>{GYM_CONTACTS.owner.role}</span>
              </div>
              <span className="block font-mono text-[10px] text-slate-300 mt-0.5">
                {GYM_CONTACTS.owner.phoneFormatted}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRecipient('manager')}
              className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                recipient === 'manager'
                  ? 'bg-[#E11D48]/25 border-[#E11D48] text-white shadow-sm'
                  : 'bg-white/[0.04] border-white/15 text-slate-300 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                <UserCheck className="w-3 h-3 text-[#E11D48]" />
                <span>{GYM_CONTACTS.manager.role}</span>
              </div>
              <span className="block font-mono text-[10px] text-slate-300 mt-0.5">
                {GYM_CONTACTS.manager.phoneFormatted}
              </span>
            </button>
          </div>
        </div>

        {/* Compact Form */}
        <form onSubmit={handleSubmit} className="space-y-3 font-montserrat">
          {/* Name & Phone side-by-side or tightly stacked */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] font-semibold tracking-wider uppercase text-slate-300 mb-1">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2 rounded-lg bg-black/50 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#E11D48]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold tracking-wider uppercase text-slate-300 mb-1">
                WhatsApp Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2 rounded-lg bg-black/50 border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#E11D48]"
                />
              </div>
            </div>
          </div>

          {/* Primary Goal */}
          <div>
            <label className="block text-[10px] font-semibold tracking-wider uppercase text-slate-300 mb-1">
              Primary Goal / Interest
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#E11D48]"
            >
              <option value="Powerlifting & Compound PRs">Powerlifting & Compound PRs</option>
              <option value="Advanced Muscle Hypertrophy">Advanced Muscle Hypertrophy</option>
              <option value="Fat Loss & Body Shredding">Fat Loss & Body Shredding</option>
              <option value="1-on-1 Dedicated Coaching">1-on-1 Dedicated Coaching</option>
              <option value="General Strength & Athletic Conditioning">General Athletic Conditioning</option>
              <option value="Diet & Macro Nutrition Program">Diet & Macro Program</option>
            </select>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-montserrat font-bold text-xs uppercase tracking-[0.14em] rounded-full shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-98 mt-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Connect with {activeContact.role}</span>
          </button>

          {/* Direct Instant Call Alternative & Go Back Action */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
            <a
              href={`tel:${activeContact.tel}`}
              className="flex-1 py-2 px-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center justify-center gap-1.5 transition-all text-[11px]"
            >
              <Phone className="w-3 h-3 text-[#E11D48]" />
              <span>Call: {activeContact.phoneFormatted}</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-full border border-white/20 hover:border-white/40 text-slate-300 hover:text-white font-medium text-[11px] transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
