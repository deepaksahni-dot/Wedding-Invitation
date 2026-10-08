import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const YOUTUBE_VIDEO_ID = 'sfyDlrl2kgw';

interface MusicPlayerButtonProps {
  autoStart?: boolean;
}

export const MusicPlayerButton: React.FC<MusicPlayerButtonProps> = ({ autoStart = false }) => {
  // Start playing immediately when the page loads
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Keep in sync if autoStart changes (kept for compatibility)
  React.useEffect(() => {
    if (autoStart) setIsPlaying(true);
  }, [autoStart]);

  const handleToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const embedSrc = isPlaying
    ? `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&mute=0`
    : '';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Hidden YouTube iframe — audio only player */}
      <iframe
        ref={iframeRef}
        src={embedSrc}
        allow="autoplay"
        style={{ width: 0, height: 0, border: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        title="Background music"
      />

      {/* Song label pill */}
      {isPlaying && (
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1712]/90 backdrop-blur-md border border-[#C5A059]/40 text-[#F5E0A3] text-xs font-cinzel shadow-lg">
          <Music className="w-3 h-3 animate-bounce text-[#D4AF37]" />
          <span>Music ♪</span>
        </span>
      )}

      {/* Circular Gold Button */}
      <button
        id="royal-music-toggle"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause Music' : 'Play Ranjha'}
        className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 shadow-[0_8px_20px_rgba(40,25,10,0.5),inset_0_2px_4px_rgba(255,255,255,0.7)] border-2 border-[#FFE399] bg-gradient-to-br from-[#F5D88A] via-[#C99B4B] to-[#916922] text-[#2C1D08]"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#2A1D0B]" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#2A1D0B]/75" />
        )}

        {/* Ambient ring pulse when playing */}
        {isPlaying && (
          <span className="absolute -inset-1.5 rounded-full border border-[#D4AF37]/50 animate-ping pointer-events-none opacity-40" />
        )}
      </button>
    </div>
  );
};
