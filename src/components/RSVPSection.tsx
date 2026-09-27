import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle2, User, Mail, Phone, Users, Utensils, MessageSquareHeart, Sparkles } from 'lucide-react';
import { RSVPRecord, CeremonyDetails } from '../types';

interface RSVPSectionProps {
  details: CeremonyDetails;
  onRSVPSubmit: (record: Omit<RSVPRecord, 'id' | 'submittedAt'>) => void;
  onOpenTracker: () => void;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({
  details,
  onRSVPSubmit,
  onOpenTracker,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declined'>('attending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [guestNames, setGuestNames] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState<RSVPRecord['dietaryPreference']>('Vegetarian');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    onRSVPSubmit({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      attendance,
      guestCount: attendance === 'attending' ? guestCount : 0,
      guestNames: guestNames.trim(),
      dietaryPreference,
      message: message.trim(),
    });

    setIsSubmitted(true);

    // Celebratory confetti if attending
    if (attendance === 'attending') {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF7F2', '#E6C587', '#9C7026'],
      });
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setGuestNames('');
  };

  return (
    <section
      id="rsvp-section-container"
      className="w-full max-w-[440px] mx-auto bg-[#FAF7F2] text-[#2B2317] rounded-[38px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-4 border-[#3A332A] relative paper-shadow p-6 sm:p-7 mt-8"
    >
      {/* Decorative Ornate Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 text-[#8C6D32] mb-1">
          <Heart className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
          <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] font-semibold">
            Honored Guests
          </span>
          <Heart className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
        </div>
        <h2 className="font-cormorant text-3xl font-bold text-[#2A1E11]">
          RSVP for the Ceremony
        </h2>
        <p className="text-xs text-[#69533B] mt-1">
          Kindly RSVP by Nov 25, 2026 to celebrate with {details.brideName} &amp; {details.groomName}
        </p>
        <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3" />
      </div>

      {isSubmitted ? (
        <div className="text-center py-8 px-4 rounded-2xl bg-[#F4EDE2] border border-[#C5A059]/40 shadow-inner">
          <div className="w-14 h-14 rounded-full bg-[#EBD8B0] flex items-center justify-center mx-auto mb-3 text-[#7C5A23]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-cormorant text-2xl font-bold text-[#2C2012]">
            Thank You, {fullName}!
          </h3>
          <p className="text-xs text-[#5C4830] mt-2 leading-relaxed">
            {attendance === 'attending'
              ? `Your response for ${guestCount} guest(s) has been joyfully recorded in the family guestbook. We eagerly look forward to celebrating together!`
              : `Your response has been noted with warm gratitude. You will be deeply missed at the engagement ceremony.`}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="rsvp-another-response-button"
              onClick={handleReset}
              className="text-xs font-cinzel text-[#8C6D32] hover:text-[#5C451D] underline tracking-wider cursor-pointer"
            >
              Submit another response
            </button>
            <button
              id="view-host-guestlist-button"
              onClick={onOpenTracker}
              className="px-4 py-2 rounded-full bg-[#C5A059] text-white text-xs font-cinzel font-semibold tracking-wider hover:bg-[#A8823B] transition-colors cursor-pointer shadow-sm"
            >
              View Host Guest Tracker
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Attendance Choice */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-cinzel font-semibold tracking-wider text-[#695239] uppercase">
              Will you be attending? *
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                id="attendance-accept-btn"
                onClick={() => setAttendance('attending')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  attendance === 'attending'
                    ? 'bg-[#EFE5D3] border-[#9C7026] text-[#2C1F10] shadow-sm font-semibold'
                    : 'bg-white/70 border-[#D4AF37]/40 text-[#6B5539] hover:bg-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#9C7026]" />
                <span className="text-xs font-cinzel tracking-wider">Joyfully Accepts</span>
              </button>

              <button
                type="button"
                id="attendance-decline-btn"
                onClick={() => setAttendance('declined')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  attendance === 'declined'
                    ? 'bg-[#EFE5D3] border-[#9C7026] text-[#2C1F10] shadow-sm font-semibold'
                    : 'bg-white/70 border-[#D4AF37]/40 text-[#6B5539] hover:bg-white'
                }`}
              >
                <Heart className="w-4 h-4 text-[#A6874E]" />
                <span className="text-xs font-cinzel tracking-wider">Regretfully Declines</span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="guest-full-name"
              className="block text-[11px] font-cinzel font-semibold tracking-wider text-[#695239] uppercase mb-1"
            >
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#A6874E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="guest-full-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dr. Salman Qureshi"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059] text-xs text-[#2B2317] placeholder:text-[#9E8E7C]"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="guest-email"
                className="block text-[11px] font-cinzel font-semibold tracking-wider text-[#695239] uppercase mb-1"
              >
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A6874E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="guest-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059] text-xs text-[#2B2317] placeholder:text-[#9E8E7C]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="guest-phone"
                className="block text-[11px] font-cinzel font-semibold tracking-wider text-[#695239] uppercase mb-1"
              >
                Phone / WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#A6874E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="guest-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 234-5678"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059] text-xs text-[#2B2317] placeholder:text-[#9E8E7C]"
                />
              </div>
            </div>
          </div>

          {/* Attending Specific Fields */}
          {attendance === 'attending' && (
            <>
              {/* Guest Count */}
              <div>
                <label
                  htmlFor="guest-count-select"
                  className="block text-[11px] font-cinzel font-semibold tracking-wider text-[#695239] uppercase mb-1"
                >
                  Total Guests Attending (Including Yourself)
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-[#A6874E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    id="guest-count-select"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059] text-xs text-[#2B2317]"
                  >
                    <option value={1}>1 Guest (Just myself)</option>
                    <option value={2}>2 Guests (Myself + 1)</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests (Family)</option>
                    <option value={5}>5+ Guests (Family)</option>
                  </select>
                </div>
              </div>

              {/* Accompanying Names */}
              {guestCount > 1 && (
                <div>
                  <label
                    htmlFor="accompanying-guests"
                    className="block text-[11px] font-cinzel font-semibold tracking-wider text-[#695239] uppercase mb-1"
                  >
                    Names of Accompanying Guests
                  </label>
                  <input
                    id="accompanying-guests"
                    type="text"
                    value={guestNames}
                    onChange={(e) => setGuestNames(e.target.value)}
                    placeholder="e.g. Fatima Qureshi, Ayla Qureshi"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D4AF37]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059] text-xs text-[#2B2317] placeholder:text-[#9E8E7C]"
                  />
                </div>
              )}

              {/* Dietary Preference */}
              <div>
                <label
                  htmlFor="dietary-preference-select"
                  className="block text-[11px] font-cinzel font-semibold tracking-wider text-[#695239] uppercase mb-1"
                >
                  Dietary Requirements (Banquet Catering)
                </label>
                <div className="relative">
                  <Utensils className="w-4 h-4 text-[#A6874E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    id="dietary-preference-select"
                    value={dietaryPreference}
                    onChange={(e) =>
                      setDietaryPreference(e.target.value as RSVPRecord['dietaryPreference'])
                    }
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059] text-xs text-[#2B2317]"
                  >
                    <option value="Pure Vegetarian">Pure Vegetarian (Shakahari)</option>
                    <option value="Jain Vegetarian">Jain Vegetarian (No Onion / Garlic)</option>
                    <option value="Vegetarian">Standard Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="No Restrictions">No Special Restrictions</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Warm Message / Blessing */}
          <div>
            <label
              htmlFor="guest-message"
              className="block text-[11px] font-cinzel font-semibold tracking-wider text-[#695239] uppercase mb-1"
            >
              Blessing &amp; Message for the Couple
            </label>
            <div className="relative">
              <MessageSquareHeart className="w-4 h-4 text-[#A6874E] absolute left-3 top-3" />
              <textarea
                id="guest-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Dear ${details.brideName} & ${details.groomName}, wishing you a lifetime of laughter, harmony, and endless blessings...`}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D4AF37]/40 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059] text-xs text-[#2B2317] placeholder:text-[#9E8E7C] resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="submit-rsvp-button"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#9C7026] text-white font-cinzel font-bold text-xs uppercase tracking-widest shadow-md hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Confirm RSVP</span>
          </button>
        </form>
      )}

      {/* Host Tracker Fast Link */}
      <div className="mt-5 pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs">
        <span className="text-[#8C6D32] font-cinzel text-[11px]">
          Host Administration
        </span>
        <button
          id="toggle-rsvp-tracker-drawer-btn"
          onClick={onOpenTracker}
          className="font-cinzel text-[11px] font-semibold text-[#7C5A23] hover:text-[#5C451D] underline tracking-wider cursor-pointer"
        >
          ✦ View RSVP Tracking Dashboard
        </button>
      </div>
    </section>
  );
};
