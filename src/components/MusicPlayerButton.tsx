import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { royalMusic } from '../utils/audio';

interface MusicPlayerButtonProps {
  autoStart?: boolean;
}

export const MusicPlayerButton: React.FC<MusicPlayerButtonProps> = ({ autoStart = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoStart && !isPlaying) {
      royalMusic.play();
      setIsPlaying(true);
    }
  }, [autoStart]);

  const handleToggle = () => {
    const active = royalMusic.toggle();
    setIsPlaying(active);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Subtle pulsing indicator */}
      {isPlaying && (
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1712]/90 backdrop-blur-md border border-[#C5A059]/40 text-[#F5E0A3] text-xs font-cinzel shadow-lg">
          <Music className="w-3 h-3 animate-bounce text-[#D4AF37]" />
          <span>Royal Melody</span>
        </span>
      )}

      {/* Circular Gold Button matching the video */}
      <button
        id="royal-music-toggle"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 shadow-[0_8px_20px_rgba(40,25,10,0.5),inset_0_2px_4px_rgba(255,255,255,0.7)] border-2 border-[#FFE399] bg-gradient-to-br from-[#F5D88A] via-[#C99B4B] to-[#916922] text-[#2C1D08]"
      >
        {isPlaying ? (
          <div className="flex items-center justify-center gap-0.5">
            <Volume2 className="w-5 h-5 text-[#2A1D0B]" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-[#2A1D0B]/75" />
        )}

        {/* Ambient Ring Wave when playing */}
        {isPlaying && (
          <span className="absolute -inset-1.5 rounded-full border border-[#D4AF37]/50 animate-ping pointer-events-none opacity-40" />
        )}
      </button>
    </div>
  );
};
