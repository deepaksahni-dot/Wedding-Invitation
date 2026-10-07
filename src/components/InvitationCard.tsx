import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  MapPin,
  Sparkles,
  ExternalLink,
  GlassWater,
  PartyPopper,
  Gem,
  Utensils,
  Music2,
  Share2,
  Check,
} from 'lucide-react';
import { CeremonyDetails, TimelineItem } from '../types';
import { ScratchCard } from './ScratchCard';
import coupleHeroImg from '../assets/images/ceremony_hero_couple_1789386132462.jpg';

interface InvitationCardProps {
  details: CeremonyDetails;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  details,
}) => {
  const [revealAll, setRevealAll] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const timelineItems: TimelineItem[] = [
    {
      time: '',
      title: 'Ganesh Vandana & Tilak Ceremony',
      description: 'Commencing with auspicious Vedic mantras and prayers to Lord Ganesha, followed by the Tilak rituals and seeking heartfelt blessings from beloved parents and elders.',
      iconName: 'entrance',
    },
    {
      time: '',
      title: 'God Bharai Rasam',
      description: 'A sacred and heartfelt ritual where the family fills the bride\'s lap with gifts, sweets, and blessings, symbolising love, prosperity, and a blessed new beginning.',
      iconName: 'entrance',
    },
    {
      time: '',
      title: 'Sangeet Celebration',
      description: 'Festive celebratory family dance, heartfelt toasts, and joyous music.',
      iconName: 'cake',
    },
    {
      time: '',
      title: 'Ring Ceremony',
      description: 'The exchange of engagement rings between Priyanshi & Aashutosh.',
      iconName: 'ring',
    },
    {
      time: '',
      title: 'Lunch',
      description: 'Curated royal multi-course traditional lunch banquet, artisan delicacies, and celebratory traditional mithai.',
      iconName: 'feast',
    },
  ];

  const handleScratchReveal = () => {
    setRevealedCount((prev) => prev + 1);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddToCalendar = () => {
    // Generate Google Calendar Link
    const title = encodeURIComponent(`Engagement Ceremony: ${details.brideName} & ${details.groomName}`);
    const location = encodeURIComponent(`${details.venue.name}, ${details.venue.address}, ${details.venue.cityState}`);
    const detailsText = encodeURIComponent(`You are joyfully invited to the Engagement Ceremony of ${details.brideName} & ${details.groomName}.`);
    // Example date formatting
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${detailsText}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <div id="invitation-main-card" className="w-full max-w-[440px] mx-auto bg-[#FAF7F2] text-[#2B2317] rounded-[38px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-4 border-[#3A332A] relative paper-shadow pb-16">
      {/* Top Phone Notch Mockup */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-3">
        <div className="w-2 h-2 rounded-full bg-[#111]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#1E293B]" />
      </div>

      {/* Hero Section with Palace Terrace & Grand Mughal Archway Video (00:09 - 00:19) */}
      <div className="relative w-full min-h-[540px] flex flex-col items-center justify-between pt-12 pb-6 px-4 overflow-hidden">
        {/* Static Hero Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={coupleHeroImg}
            alt="Priyanshi & Aashutosh"
            className="w-full h-full object-cover object-center brightness-90"
          />
          {/* Subtle overlay gradients for high typographic contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2B1B10]/70 via-[#1C140D]/35 to-[#FAF7F2]" />
        </div>


        {/* Floating Golden Dust Particles across the video */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <motion.div
            animate={{ y: [-10, -80], opacity: [0, 0.8, 0], x: [0, 15] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 left-12 w-1.5 h-1.5 rounded-full bg-[#FFF4C2] shadow-[0_0_8px_#FFD700]"
          />
          <motion.div
            animate={{ y: [-20, -100], opacity: [0, 1, 0], x: [0, -20] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
            className="absolute bottom-28 right-16 w-2 h-2 rounded-full bg-[#FFE599] shadow-[0_0_10px_#FFD700]"
          />
          <motion.div
            animate={{ y: [0, -70], opacity: [0, 0.7, 0], x: [0, 10] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
            className="absolute bottom-36 left-1/3 w-1 h-1 rounded-full bg-[#FFF9EB] shadow-[0_0_6px_#FFD700]"
          />
        </div>

        {/* Ornate Arch Top Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative z-10 text-center flex flex-col items-center pt-2"
        >
          {/* Auspicious Hindu Invocation */}
          <div className="text-center mb-1">
            <span className="font-cinzel text-sm sm:text-base font-bold tracking-[0.25em] text-[#FFE8B3] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              ॥ श्री गणेशाय नमः ॥
            </span>
          </div>

          {/* Auspicious Arch Filigree SVG */}
          <div className="flex items-center gap-2 mb-1 text-[#F3DEB0]">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F3DEB0]" />
            <Sparkles className="w-5 h-5" />
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#F3DEB0]" />
          </div>

          <p className="font-cinzel text-sm uppercase tracking-[0.25em] text-[#FFF4DA] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Welcome to the
          </p>
          <h2 className="font-cormorant text-3xl sm:text-4xl font-extrabold tracking-wide text-[#FFE4A3] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] italic mt-0.5">
            {details.ceremonyType}
          </h2>
          <p className="font-cinzel text-sm uppercase tracking-[0.2em] text-[#FFF4DA] font-bold mt-0.5">
            of
          </p>

          {/* Couple Names */}
          <div className="mt-2 flex flex-col items-center">
            <h1 className="font-cormorant italic font-extrabold text-5xl sm:text-6xl text-[#FFF8E7] drop-shadow-[0_3px_8px_rgba(40,20,5,0.9)] tracking-wide">
              {details.brideName}
            </h1>
            <span className="font-cinzel text-base text-[#F7DFA6] tracking-widest my-0.5 font-bold">
              &amp;
            </span>
            <h1 className="font-cormorant italic font-extrabold text-5xl sm:text-6xl text-[#FFF8E7] drop-shadow-[0_3px_8px_rgba(40,20,5,0.9)] tracking-wide">
              {details.groomName}
            </h1>
          </div>
        </motion.div>

        {/* Scroll Down Cue */}
        <div className="relative z-10 flex flex-col items-center gap-1 text-[#2B2317] mt-auto pt-16">
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#7C5A23] font-semibold">
            Scroll down ↓
          </span>
        </div>
      </div>

      {/* The Date - Interactive Scratch Cards Section (00:12 - 00:15 in Video) */}
      <section id="ceremony-date-section" className="relative px-5 py-8 text-center bg-[#FAF7F2]">
        {/* Subtle Decorative Floral Flourish */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="h-[1px] w-12 bg-[#D4AF37]/50" />
          <span className="font-script text-3xl text-[#9C7026] leading-none">The Date</span>
          <span className="h-[1px] w-12 bg-[#D4AF37]/50" />
        </div>

        <p className="text-xs font-cinzel text-[#8C6D32] tracking-wider mb-6 font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Scratch to reveal the date</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        </p>

        {/* Three Interactive Scratch Off Cards */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 max-w-sm mx-auto">
          <ScratchCard
            cardId="day"
            label="DAY"
            value={details.eventDate.day}
            subtext={details.eventDate.fullDateString.split(',')[0] || 'Celebration'}
            onFullyRevealed={handleScratchReveal}
            isRevealedOverride={revealAll}
          />
          <ScratchCard
            cardId="month"
            label="MONTH"
            value={details.eventDate.month}
            onFullyRevealed={handleScratchReveal}
            isRevealedOverride={revealAll}
          />
          <ScratchCard
            cardId="year"
            label="YEAR"
            value={details.eventDate.year}
            onFullyRevealed={handleScratchReveal}
            isRevealedOverride={revealAll}
          />
        </div>

        {/* Quick Reveal button / hint */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            id="reveal-all-date-button"
            onClick={() => setRevealAll(true)}
            className="text-[11px] font-cinzel uppercase tracking-wider text-[#A68032] hover:text-[#7C5A23] underline decoration-[#D4AF37]/60 underline-offset-4 cursor-pointer transition-colors"
          >
            {revealAll ? '✦ All Details Revealed' : '✦ Tap to reveal all date cards'}
          </button>
        </div>

        {/* Time Badge - Removed */}
      </section>

      {/* Decorative Ornate Divider Arch */}
      <div className="w-full flex justify-center py-2">
        <svg className="w-48 h-6 text-[#C5A059]" viewBox="0 0 200 24" fill="currentColor">
          <path d="M0 12 Q50 0 100 12 Q150 24 200 12 Q150 14 100 8 Q50 14 0 12 Z" opacity="0.5" />
          <circle cx="100" cy="8" r="3" />
        </svg>
      </div>

      {/* Engagement Invitation & Parents' Blessing Section */}
      <section id="engagement-invitation-details" className="relative px-6 py-6 text-center">
        {/* Ornate Invocation Blessing Header */}
        <div className="mb-4 flex flex-col items-center">
          <div className="text-sm font-cormorant italic text-[#8C6D32] tracking-widest">
            ✦ With the Divine Blessings of Lord Ganesha &amp; Our Beloved Families ✦
          </div>
          <div className="font-cinzel font-bold text-xs sm:text-sm tracking-[0.2em] text-[#9C7026] mt-1.5">
            ॥ ॐ श्री गणेशाय नमः ॥
          </div>
        </div>

        <p className="font-cinzel text-[11px] tracking-[0.25em] text-[#7C5E29] uppercase font-bold mb-4">
          You are cordially invited to the
          <br />
          Engagement Ceremony of
        </p>

        {/* Groom & Bride Parentage Framing */}
        <div className="space-y-4 my-6">
          {/* Bride */}
          <div className="flex flex-col items-center">
            <h3 className="font-cormorant italic text-5xl text-[#3A2A14] font-extrabold">
              {details.brideName}
            </h3>
            <span className="text-[11px] uppercase tracking-wider font-cinzel text-[#8C6D32] mt-0.5">
              Daughter of
            </span>
            <p className="font-cormorant text-sm font-semibold text-[#4A3820] mt-0.5">
              {details.brideParents}
            </p>
          </div>

          {/* With / Wedding Knot */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#C5A059]" />
            <span className="font-cormorant italic text-lg text-[#9C7026] font-bold">with</span>
            <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>

          {/* Groom */}
          <div className="flex flex-col items-center">
            <h3 className="font-cormorant italic text-5xl text-[#3A2A14] font-extrabold">
              {details.groomName}
            </h3>
            <span className="text-[11px] uppercase tracking-wider font-cinzel text-[#8C6D32] mt-0.5">
              Son of
            </span>
            <p className="font-cormorant text-sm font-semibold text-[#4A3820] mt-0.5">
              {details.groomParents}
            </p>
          </div>
        </div>

        {/* Heartfelt Note */}
        <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#D4AF37]/35 shadow-sm text-center">
          <p className="font-cormorant text-base text-[#423320] leading-relaxed italic">
            &ldquo;{details.invitationNote}&rdquo;
          </p>
          <p className="font-cinzel text-[10px] tracking-widest text-[#8C6D32] uppercase mt-2 font-semibold">
            ✦ The Family of the Bride ✦
          </p>
        </div>
      </section>

      {/* Ceremony Timeline Section (00:17 - 00:19 in Video) */}
      <section id="ceremony-timeline-section" className="relative px-5 py-6">
        <div className="text-center mb-6">
          <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#8C6D32] font-semibold">
            Order of Events
          </span>
          <h3 className="font-cormorant text-2xl font-bold text-[#2E2213] tracking-wide mt-0.5">
            Ceremony Timeline
          </h3>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-2" />
        </div>

        {/* Timeline Items */}
        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#D4AF37] before:via-[#C5A059] before:to-[#D4AF37]/30">
          {timelineItems.map((item, idx) => (
            <div key={idx} className="relative flex flex-col">
              {/* Timeline Pin Node */}
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#8C6D32]" />
              </div>

              {/* Time pill - Removed */}

              {/* Title */}
              <h4 className="font-cormorant text-lg font-bold text-[#2A1F12] mt-0.5">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-xs text-[#5E4C34] leading-relaxed mt-0.5">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Venue & Location Section */}
      <section id="ceremony-venue-section" className="relative px-5 py-6 bg-[#F3ECE0]/70 border-y border-[#D4AF37]/30">
        <div className="text-center mb-4">
          <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#8C6D32] font-semibold">
            Celebration Venue
          </span>
          <h3 className="font-cormorant text-2xl font-bold text-[#2E2213]">
            {details.venue.name}
          </h3>
        </div>

        <div className="rounded-2xl bg-white/90 p-4 border border-[#C5A059]/40 shadow-sm text-center">
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/60 flex items-center justify-center mx-auto mb-2.5 text-[#8C6D32]">
            <MapPin className="w-5 h-5" />
          </div>

          <p className="text-sm font-semibold text-[#332617]">
            {details.venue.address}
          </p>
          <p className="text-xs text-[#6B5539] mt-0.5">
            {details.venue.cityState}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2.5 flex-wrap">
            <a
              id="google-maps-link"
              href={details.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C5A059] text-white text-xs font-cinzel font-semibold tracking-wider hover:bg-[#A8823B] transition-colors shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              id="add-to-calendar-button"
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-[#7C5A23] text-xs font-cinzel font-semibold tracking-wider hover:bg-[#F0E6D6] transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <footer className="px-6 text-center pt-2">
        <p className="font-script text-2xl text-[#8C6D32]">
          With Warm Regards &amp; Gratitude
        </p>
        <p className="font-cinzel text-[10px] text-[#8C6D32] tracking-widest uppercase mt-1 font-bold">
          ✦ The Family of the Bride ✦
        </p>
      </footer>
    </div>
  );
};
