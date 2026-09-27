import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RotateCcw,
  Edit3,
  ChevronUp
} from 'lucide-react';
import { CeremonyDetails } from './types';
import { Envelope } from './components/Envelope';
import { InvitationCard } from './components/InvitationCard';
import { EditCeremonyModal } from './components/EditCeremonyModal';
import { MusicPlayerButton } from './components/MusicPlayerButton';
import warmPampasBg from './assets/images/warm_pampas_bg_1789386863101.jpg';

const INITIAL_CEREMONY_DETAILS: CeremonyDetails = {
  brideName: 'Priyanshi',
  brideParents: 'Mr. Mukesh Singhal & Mrs. Rakhi Singhal',
  groomName: 'Aashutosh',
  groomParents: 'Mr. Rajdeep Chaudhary & Mrs. Meenakshi Nirwal',
  ceremonyType: 'Engagement Ceremony',
  monogram: 'P & A',
  eventDate: {
    day: '13',
    month: 'Nov',
    year: '2026',
    fullDateString: 'Friday, Nov 13, 2026',
    time: '',
  },
  venue: {
    name: 'Hotel The Grand Cassel',
    address: 'Saharanpur Rd, opposite ITI, Niranjanpur',
    cityState: 'Dehradun',
    mapUrl: 'https://maps.app.goo.gl/1GidqcKuV5MzdKrB7',
  },
  welcomeMessage: 'With the divine blessings of Lord Ganesha and our elders, we cordially invite you to the auspicious engagement ceremony of Priyanshi with Aashutosh.',
  invitationNote: 'Join us for an auspicious morning and afternoon of love, joyous laughter, sacred blessings, and memorable celebrations as we celebrate their engagement and embark on this beautiful new journey.',
};

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [shouldAutoPlayMusic, setShouldAutoPlayMusic] = useState(false);
  const [details, setDetails] = useState<CeremonyDetails>(() => {
    try {
      const saved = localStorage.getItem('ceremony_invitation_details_v6');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.brideName === 'Priyanshi' &&
          parsed.venue?.name === 'Hotel The Grand Cassel' &&
          parsed.ceremonyType === 'Engagement Ceremony'
        ) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_CEREMONY_DETAILS;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ceremony_invitation_details_v6', JSON.stringify(details));
  }, [details]);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setShouldAutoPlayMusic(true);
  };

  const handleResetEnvelope = () => {
    setIsEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen bg-[#1A140F] text-[#FAF7F2] relative selection:bg-[#C5A059] selection:text-black">
      {/* Warm Textured Golden-Brown / Pampas Grass Background Atmosphere matching reference */}
      <div
        className="fixed inset-0 bg-cover bg-center pointer-events-none z-0 brightness-[0.92] contrast-[1.05]"
        style={{ backgroundImage: `url(${warmPampasBg})` }}
      />
      {/* Soft warm cinematic studio overlay with subtle vignette */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1C140D]/75 via-[#1C140D]/55 to-[#120D09]/85 pointer-events-none z-0" />

      {/* Subtle Background Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#9C7026]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Floating Family & Host Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#1C1713]/90 backdrop-blur-md border-b border-[#C5A059]/30 py-2.5 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Couple Monogram & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5D88A] via-[#C99B4B] to-[#916922] text-[#2C1D08] flex items-center justify-center font-script text-base font-bold shadow-sm">
              {details.monogram}
            </div>
            <div>
              <div className="font-cinzel text-xs font-bold text-[#FFE6AD] tracking-wider">
                {details.brideName} &amp; {details.groomName}
              </div>
              <div className="text-[10px] text-[#A6874E] tracking-widest uppercase font-cinzel">
                {details.ceremonyType}
              </div>
            </div>
          </div>

          {/* Action Buttons for Host Family */}
          <div className="flex items-center gap-2">
            {isEnvelopeOpen && (
              <button
                id="reseal-envelope-btn"
                onClick={handleResetEnvelope}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#D4AF37]/40 text-[#DEC8A2] text-xs font-cinzel transition-colors cursor-pointer"
                title="Re-seal envelope to preview opening experience"
              >
                <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
                <span>Re-seal</span>
              </button>
            )}

            <button
              id="edit-ceremony-details-btn"
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#D4AF37]/40 text-[#DEC8A2] hover:text-white text-xs font-cinzel transition-colors cursor-pointer"
              title="Personalize names, dates and venue"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#F5D88A]" />
              <span className="hidden sm:inline">Customize</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 py-6 sm:py-10 px-3 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isEnvelopeOpen ? (
            /* Screen 1: Unopened Embossed Envelope with Wax Seal */
            <motion.div
              key="envelope-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full flex flex-col items-center"
            >
              <Envelope
                monogram={details.monogram}
                brideName={details.brideName}
                groomName={details.groomName}
                onOpen={handleOpenEnvelope}
                isOpen={isEnvelopeOpen}
              />
            </motion.div>
          ) : (
            /* Screen 2: Opened Full Invitation */
            <motion.div
              key="invitation-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full flex flex-col items-center space-y-6"
            >
              {/* Full Invitation Card */}
              <InvitationCard
                details={details}
              />

              {/* Scroll To Top Helper */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-cinzel text-[#A6874E] hover:text-[#DEC8A2] tracking-wider transition-colors cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Back to Top of Invitation</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background Royal Ambient Music Player */}
      <MusicPlayerButton autoStart={shouldAutoPlayMusic} />

      {/* Ceremony Personalization Modal */}
      <EditCeremonyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        details={details}
        onSave={setDetails}
      />
    </div>
  );
}
