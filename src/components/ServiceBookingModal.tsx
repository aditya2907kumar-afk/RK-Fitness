import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, CheckCircle2, MessageSquare, Calendar, User, Phone, Dumbbell, UserCheck } from 'lucide-react';
import { ServiceItem } from '../data/servicesData.ts';
import { GYM_CONTACTS } from '../data/gymContacts.ts';

interface ServiceBookingModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({ service, onClose }) => {
  const [recipient, setRecipient] = useState<'owner' | 'manager'>('owner');
  const [preferredSlot, setPreferredSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [trainingExperience, setTrainingExperience] = useState('Beginner / Intermediate');
  const [notes, setNotes] = useState('');

  // Handle ESC key to easily dismiss and go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  const activeContact = GYM_CONTACTS[recipient];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const textMessage = `*New Service Booking Inquiry — RK FITNESS*
━━━━━━━━━━━━━━━━━━━
*Recipient:* ${activeContact.role}
*Discipline:* ${service.title}
*Preferred Slot:* ${preferredSlot} (Gym Hours: 5:30 AM – 10:00 PM)
*Client Name:* ${fullName.trim() || 'Guest Lifter'}
*Phone Number:* ${phone.trim() || 'Not provided'}
*Experience Level:* ${trainingExperience}
*Personal Goals / Notes:* ${notes.trim() || 'Interested in trial & program enrollment.'}
━━━━━━━━━━━━━━━━━━━
_Sent via RK FITNESS Digital Booking Terminal_`;

    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappUrl = `${activeContact.whatsappUrl}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#091726]/95 border border-white/20 shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header & Hero Image (Strict Zero Clutter on Photo) */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-black">
          {service.defaultPhoto ? (
            <img
              src={service.defaultPhoto}
              alt={service.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#091726] via-[#091726]/40 to-black/30 pointer-events-none" />

          {/* Top Back & Close Buttons */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/70 hover:bg-[#E11D48] text-white flex items-center gap-1.5 text-xs font-montserrat font-semibold tracking-wider uppercase border border-white/20 transition-all active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#E11D48] text-white flex items-center justify-center border border-white/20 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-cinzel tracking-widest text-[#E11D48] font-bold uppercase">
              {service.subtitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight luxury-text-shadow">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Detailed Breakdown */}
          <div>
            <h4 className="text-xs font-cinzel tracking-wider text-slate-400 uppercase font-bold mb-2">
              Program Architecture
            </h4>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Focus Areas & Session Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10">
              <h5 className="text-xs font-semibold text-[#E11D48] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Primary Technical Focus</span>
              </h5>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                {service.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10">
              <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FCD34D]" />
                <span>Session Highlights</span>
              </h5>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                {service.sessionHighlights.map((high, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FCD34D] shrink-0 mt-1.5" />
                    <span>{high}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recipient Selection for WhatsApp Booking */}
          <div className="pt-2">
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Send WhatsApp Booking Inquiry To:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRecipient('owner')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  recipient === 'owner'
                    ? 'bg-[#E11D48]/20 border-[#E11D48] text-white shadow-md'
                    : 'bg-black/40 border-white/15 text-slate-300 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <UserCheck className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>{GYM_CONTACTS.owner.role}</span>
                </div>
                <span className="block font-mono text-xs text-slate-200 mt-1">
                  {GYM_CONTACTS.owner.phoneFormatted}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRecipient('manager')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  recipient === 'manager'
                    ? 'bg-[#E11D48]/20 border-[#E11D48] text-white shadow-md'
                    : 'bg-black/40 border-white/15 text-slate-300 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <UserCheck className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>{GYM_CONTACTS.manager.role}</span>
                </div>
                <span className="block font-mono text-xs text-slate-200 mt-1">
                  {GYM_CONTACTS.manager.phoneFormatted}
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Booking Form */}
          <form onSubmit={handleSubmit} className="pt-2 border-t border-white/10 space-y-4">
            <h4 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#E11D48]" />
              <span>Program Registration Details</span>
            </h4>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Preferred Training Slot (Gym Open 5:30 AM – 10:00 PM Daily)
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {(['Morning', 'Afternoon', 'Evening'] as const).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPreferredSlot(slot)}
                    className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all border ${
                      preferredSlot === slot
                        ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-md'
                        : 'bg-black/40 text-slate-300 border-white/15 hover:border-white/30'
                    }`}
                  >
                    {slot} {slot === 'Morning' ? '(5:30 - 11 AM)' : slot === 'Afternoon' ? '(11 AM - 4 PM)' : '(4 - 10 PM)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aman Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/50 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#E11D48]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">WhatsApp / Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/50 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#E11D48]"
                  />
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs text-slate-300 mb-1">Current Training Background</label>
              <select
                value={trainingExperience}
                onChange={(e) => setTrainingExperience(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-[#E11D48]"
              >
                <option value="Beginner / First Time in Gym">Beginner / First Time in Gym</option>
                <option value="Intermediate (1-3 Years Training)">Intermediate (1-3 Years Training)</option>
                <option value="Advanced Powerlifter / Bodybuilder">Advanced Powerlifter / Bodybuilder</option>
                <option value="Athlete Rehab / Recovery Focus">Athlete Rehab / Recovery Focus</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs text-slate-300 mb-1">Notes / Target Goal / Inquiries</label>
              <textarea
                rows={2}
                placeholder="Mention past injuries, specific PR targets, or questions about gym membership..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#E11D48]"
              />
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold text-sm rounded-xl shadow-xl luxury-glow-red transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>Connect on WhatsApp with {activeContact.role} ({activeContact.phoneFormatted})</span>
            </button>

            {/* Immediate Direct Calling Options */}
            <div className="pt-3 border-t border-white/10">
              <span className="block text-[11px] uppercase tracking-wider text-slate-400 text-center mb-2">
                Need Immediate Assistance? Call Directly:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${GYM_CONTACTS.owner.tel}`}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium flex items-center justify-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Call Owner: {GYM_CONTACTS.owner.phoneFormatted}</span>
                </a>
                <a
                  href={`tel:${GYM_CONTACTS.manager.tel}`}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium flex items-center justify-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>Call Manager: {GYM_CONTACTS.manager.phoneFormatted}</span>
                </a>
              </div>
            </div>

            <p className="text-[11px] text-center text-slate-400 pt-1">
              Direct response from RK FITNESS administration · Location: Bajrangi Chowk, Pahari, Patna
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
