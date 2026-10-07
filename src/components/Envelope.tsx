import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import embossedBg from '../assets/images/embossed_envelope_texture_1789386146755.jpg';

interface EnvelopeProps {
  monogram: string;
  brideName: string;
  groomName: string;
  onOpen: () => void;
  isOpen: boolean;
}

type AnimationPhase = 'sealed' | 'pressing' | 'glowing' | 'unfolding' | 'revealed';

export const Envelope: React.FC<EnvelopeProps> = ({
  monogram,
  brideName,
  groomName,
  onOpen,
  isOpen,
}) => {
  const [phase, setPhase] = useState<AnimationPhase>('sealed');

  useEffect(() => {
    if (!isOpen && phase !== 'sealed') {
      setPhase('sealed');
    }
  }, [isOpen]);

  const handleSealClick = () => {
    if (phase !== 'sealed' || isOpen) return;

    // 1. Tactile press phase
    setPhase('pressing');

    // 2. Glowing phase: golden light bursts from seal & seams
    setTimeout(() => {
      setPhase('glowing');

      // Delicate golden confetti shimmer
      confetti({
        particleCount: 45,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FFF3D1', '#F7DF9C', '#B88628'],
        disableForReducedMotion: true,
      });
    }, 220);

    // 3. Unfolding phase: flaps physically part & 3D open
    setTimeout(() => {
      setPhase('unfolding');
    }, 850);

    // 4. Complete transition to revealed ceremony video
    setTimeout(() => {
      setPhase('revealed');
      onOpen();
    }, 1900);
  };

  return (
    <div
      id="envelope-wrapper"
      className="relative w-full max-w-[420px] aspect-[9/16] min-h-[580px] max-h-[820px] mx-auto flex items-center justify-center select-none"
      style={{ perspective: '1600px' }}
    >
      {/* Phone / Physical Stationery Frame */}
      <div className="relative w-full h-full rounded-[38px] overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(212,175,55,0.25)] border-[3.5px] border-[#382F24] bg-[#17130F]">
        {/* Top Speaker / Camera Notch Mockup */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black/90 rounded-full z-50 flex items-center justify-between px-3 border border-white/5 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-[#111]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A2333]" />
        </div>

        {/* Envelope Container */}
        <div className="relative w-full h-full overflow-hidden bg-[#FAF7F2]">
          {/* Base Embossed Paper Texture */}
          <div
            className="absolute inset-0 bg-cover bg-center brightness-[1.03] contrast-[0.96]"
            style={{ backgroundImage: `url(${embossedBg})` }}
          />

          {/* Warm cinematic vignette lighting */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2B1B10]/20 via-transparent to-[#2B1B10]/40 pointer-events-none" />

          {/* Underlay Preview of Ceremony Hall during unfolding */}
          {(phase === 'glowing' || phase === 'unfolding' || phase === 'revealed') && (
            <div className="absolute inset-0 bg-[#1D1712] flex items-center justify-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover brightness-105"
              >
                <source src="/ceremony_video.mp4" type="video/mp4" />
              </video>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              SEAMS & GOLDEN LIGHT BURST (Phase: glowing & unfolding)
              Light originates from seal and shoots along the 4 fold seams
             ══════════════════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {(phase === 'glowing' || phase === 'unfolding') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
              >
                {/* Central Radial Sunburst Glow */}
                <motion.div
                  initial={{ scale: 0.1, opacity: 0 }}
                  animate={{
                    scale: [0.2, 1.8, 2.6],
                    opacity: [0, 1, 0.85],
                  }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="absolute w-80 h-80 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,244,195,0.98) 0%, rgba(245,216,138,0.85) 30%, rgba(212,175,55,0.45) 60%, rgba(212,175,55,0) 80%)',
                    filter: 'blur(8px)',
                  }}
                />

                {/* Diagonal Light Beams along envelope seams */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 0.9], scale: [0.4, 1.2, 1.5] }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Top-to-Bottom Seam Beam */}
                  <div className="absolute w-1.5 h-full bg-gradient-to-b from-transparent via-[#FFF6D4] to-transparent blur-[2px] shadow-[0_0_20px_#FFE082]" />
                  {/* Left-to-Right Seam Beam */}
                  <div className="absolute w-full h-1.5 bg-gradient-to-r from-transparent via-[#FFF6D4] to-transparent blur-[2px] shadow-[0_0_20px_#FFE082]" />
                  {/* Diagonal X Beams */}
                  <div className="absolute w-[120%] h-1 bg-gradient-to-r from-transparent via-[#FFE599] to-transparent rotate-45 blur-[2px] shadow-[0_0_18px_#D4AF37]" />
                  <div className="absolute w-[120%] h-1 bg-gradient-to-r from-transparent via-[#FFE599] to-transparent -rotate-45 blur-[2px] shadow-[0_0_18px_#D4AF37]" />
                </motion.div>

                {/* Sparkling Halo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-96 h-96 rounded-full border border-[#FFF0B3]/40 blur-[1px]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══════════════════════════════════════════════════════════════════
              PHYSICAL 4-FLAP PAPER STRUCTURE
             ══════════════════════════════════════════════════════════════════ */}

          {/* LEFT FLAP */}
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={
              phase === 'unfolding' || phase === 'revealed'
                ? { x: '-105%', opacity: 0 }
                : { x: 0, opacity: 1 }
            }
            transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
              backgroundImage: `url(${embossedBg})`,
              backgroundSize: 'cover',
              filter: 'drop-shadow(4px 0 10px rgba(45,30,15,0.3))',
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-black/15 to-white/10" />
            {/* Embossed edge border */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="50" y2="50" stroke="#C5A059" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
              <line x1="0" y1="100" x2="50" y2="50" stroke="#C5A059" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
            </svg>
          </motion.div>

          {/* RIGHT FLAP */}
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={
              phase === 'unfolding' || phase === 'revealed'
                ? { x: '105%', opacity: 0 }
                : { x: 0, opacity: 1 }
            }
            transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
              backgroundImage: `url(${embossedBg})`,
              backgroundSize: 'cover',
              filter: 'drop-shadow(-4px 0 10px rgba(45,30,15,0.3))',
            }}
          >
            <div className="w-full h-full bg-gradient-to-l from-black/15 to-white/10" />
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="100" y1="0" x2="50" y2="50" stroke="#C5A059" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
              <line x1="100" y1="100" x2="50" y2="50" stroke="#C5A059" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
            </svg>
          </motion.div>

          {/* BOTTOM FLAP */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={
              phase === 'unfolding' || phase === 'revealed'
                ? { y: '105%', opacity: 0 }
                : { y: 0, opacity: 1 }
            }
            transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 z-15 pointer-events-none"
            style={{
              clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)',
              backgroundImage: `url(${embossedBg})`,
              backgroundSize: 'cover',
              filter: 'drop-shadow(0 -4px 12px rgba(45,30,15,0.35))',
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-black/20 via-transparent to-white/10" />
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="100" x2="50" y2="50" stroke="#C5A059" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
              <line x1="100" y1="100" x2="50" y2="50" stroke="#C5A059" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
            </svg>
          </motion.div>

          {/* TOP FLAP (3D Rotation around the top edge) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={
              phase === 'unfolding' || phase === 'revealed'
                ? { rotateX: -175, opacity: 0.15 }
                : { rotateX: 0, opacity: 1 }
            }
            transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
            style={{
              transformOrigin: 'top center',
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%)',
              backgroundImage: `url(${embossedBg})`,
              backgroundSize: 'cover',
              filter: 'drop-shadow(0 8px 16px rgba(45,30,15,0.45))',
            }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            <div className="w-full h-full bg-gradient-to-b from-black/10 via-transparent to-black/20" />
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="50" y2="50" stroke="#D4AF37" strokeWidth="0.8" />
              <line x1="100" y1="0" x2="50" y2="50" stroke="#D4AF37" strokeWidth="0.8" />
            </svg>
          </motion.div>

          {/* Ornate Gold Filigree Crest Lines across the front */}
          <div className="absolute inset-0 pointer-events-none z-20 opacity-35">
            <svg className="w-full h-full" viewBox="0 0 380 660" fill="none">
              {/* Border Filigree */}
              <rect x="18" y="24" width="344" height="612" rx="20" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="6 4" />
              {/* Corner Ornaments */}
              <circle cx="32" cy="38" r="6" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="348" cy="38" r="6" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="32" cy="622" r="6" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="348" cy="622" r="6" stroke="#D4AF37" strokeWidth="1" />
            </svg>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              CENTRAL 3D WAX SEAL EMBLEM
             ══════════════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">
            {/* The Seal Button */}
            <motion.button
              id="wax-seal-button"
              onClick={handleSealClick}
              disabled={phase !== 'sealed'}
              whileHover={phase === 'sealed' ? { scale: 1.04 } : {}}
              animate={
                phase === 'pressing'
                  ? { scale: 0.93, y: 3 }
                  : phase === 'glowing'
                  ? { scale: 1.15, filter: 'brightness(1.3)' }
                  : phase === 'unfolding' || phase === 'revealed'
                  ? { scale: [1.1, 1.4, 0], opacity: [1, 0.8, 0], rotate: 15 }
                  : { scale: [1, 1.02, 1] }
              }
              transition={
                phase === 'sealed'
                  ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.5 }
              }
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full cursor-pointer pointer-events-auto focus:outline-none select-none group"
              aria-label="Tap to open engagement invitation"
            >
              {/* Outer Organic Wax Rim with Highlights */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ECC880] via-[#B88628] to-[#785111] shadow-[0_14px_35px_rgba(50,30,10,0.65),inset_0_3px_5px_rgba(255,255,255,0.85),inset_0_-4px_6px_rgba(0,0,0,0.6)] wax-seal-glow" />

              {/* Inner Beveled Ring */}
              <div className="absolute inset-2 sm:inset-2.5 rounded-full border-2 border-[#FFE8B3]/75 shadow-[inset_0_2px_5px_rgba(0,0,0,0.45)] flex items-center justify-center bg-gradient-to-br from-[#C99B4B] via-[#9F762B] to-[#734E14]">
                {/* Dotted seal border */}
                <div className="absolute inset-1 rounded-full border border-dashed border-[#FFF7DE]/50" />

                {/* Monogram in center */}
                <div className="flex flex-col items-center justify-center">
                  <span className="font-cormorant italic font-bold text-3xl sm:text-4xl text-[#FFFBF0] tracking-wide drop-shadow-[0_2px_3px_rgba(60,35,5,0.8)]">
                    {monogram}
                  </span>
                </div>
              </div>

              {/* Little Sparkle Star */}
              <div className="absolute -top-1 -right-1 bg-[#D4AF37] text-white p-1 rounded-full shadow-md border border-[#FFE8B3]/60 group-hover:scale-110 transition-transform">
                <Sparkles className="w-3.5 h-3.5 text-[#FFFBEB]" />
              </div>
            </motion.button>

            {/* Tap Prompt Label (Fades out when pressed) */}
            <AnimatePresence>
              {phase === 'sealed' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 flex flex-col items-center text-center px-4"
                >
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1C1713]/90 backdrop-blur-md border border-[#D4AF37]/60 shadow-md">
                    <Heart className="w-3 h-3 text-[#F5D88A] fill-[#F5D88A]" />
                    <span className="font-cinzel text-xs tracking-widest text-[#FFE8B3] font-bold uppercase">
                      Tap Seal to Open
                    </span>
                    <Heart className="w-3 h-3 text-[#F5D88A] fill-[#F5D88A]" />
                  </div>
                  <p className="mt-3 text-xs font-cinzel font-bold tracking-[0.2em] text-[#FFE6AD] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    Engagement Ceremony of
                  </p>
                  <p className="font-cormorant text-2xl sm:text-3xl font-bold text-[#FFF8E7] drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] italic mt-0.5 tracking-wide">
                    {brideName} &amp; {groomName}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Opening Progress Label */}
            {phase === 'glowing' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 px-4 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[#FFF4D4] font-cinzel text-xs tracking-widest uppercase border border-[#D4AF37]/50"
              >
                ✦ Opening Invitation... ✦
              </motion.div>
            )}
          </div>

          {/* Bottom subtle stationery signature */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] font-cinzel text-[#8C6D32]/70 uppercase pointer-events-none z-10">
            ✦ Shubh Vivah Muhurat ✦
          </div>
        </div>
      </div>
    </div>
  );
};
