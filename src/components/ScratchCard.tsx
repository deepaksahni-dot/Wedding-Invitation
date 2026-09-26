import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

interface ScratchCardProps {
  label: string;
  value: string;
  subtext?: string;
  cardId: string;
  onFullyRevealed?: () => void;
  isRevealedOverride?: boolean;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  label,
  value,
  subtext,
  cardId,
  onFullyRevealed,
  isRevealedOverride = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [percentageRevealed, setPercentageRevealed] = useState(0);

  const initFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Elegant gold metallic gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#F5E0A3');
    grad.addColorStop(0.25, '#D4AF37');
    grad.addColorStop(0.5, '#FFF2C6');
    grad.addColorStop(0.75, '#AA8221');
    grad.addColorStop(1, '#D8B244');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle luxury speckles / noise
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(120, 80, 20, 0.25)';
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.5, 1.5);
    }

    // Elegant filigree border on foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    // Scratch prompt text
    ctx.fillStyle = '#6E4E14';
    ctx.font = 'bold 11px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH', width / 2, height / 2 - 8);

    ctx.fillStyle = 'rgba(110, 78, 20, 0.8)';
    ctx.font = '9px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✦ ✦ ✦', width / 2, height / 2 + 10);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Set actual canvas resolution matching display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    initFoil();
  }, [initFoil]);

  useEffect(() => {
    if (isRevealedOverride && !revealed) {
      setRevealed(true);
      if (onFullyRevealed) onFullyRevealed();
    }
  }, [isRevealedOverride, revealed, onFullyRevealed]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      const totalPixels = imgData.data.length / 4;

      // Sample every 8th pixel for fast performance
      for (let i = 3; i < imgData.data.length; i += 32) {
        if (imgData.data[i] === 0) {
          transparentPixels++;
        }
      }

      const ratio = transparentPixels / (totalPixels / 8);
      const pct = Math.min(100, Math.round(ratio * 100));
      setPercentageRevealed(pct);

      if (pct > 40 && !revealed) {
        setRevealed(true);
        if (onFullyRevealed) onFullyRevealed();
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FAF7F2', '#E6C587'],
        });
      }
    } catch {
      // Ignored if cross-origin or canvas read error
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchPercentage();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
  };

  return (
    <div id={`scratch-container-${cardId}`} className="flex flex-col items-center flex-1 min-w-[90px] max-w-[130px]">
      {/* Outer Card with golden border */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-[#FDFBF7] to-[#F5EFE6] border border-[#D4AF37]/50 shadow-[0_8px_20px_-6px_rgba(110,78,20,0.25)] flex flex-col items-center justify-center p-2 select-none group">
        {/* Underlying revealed content */}
        <div className="flex flex-col items-center justify-center text-center w-full h-full px-1">
          <span className="text-[10px] tracking-widest text-[#8C6D32] uppercase font-cinzel font-semibold mb-1">
            {label}
          </span>
          <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-[#2B2317] leading-none mb-1">
            {value}
          </span>
          {subtext && (
            <span className="text-[9px] text-[#A6874E] tracking-wider uppercase font-medium">
              {subtext}
            </span>
          )}
          <div className="mt-1 flex items-center justify-center text-[#C5A059]">
            <Sparkles className="w-3 h-3 animate-pulse" />
          </div>
        </div>

        {/* Scratchable Canvas Overlay */}
        <canvas
          ref={canvasRef}
          id={`scratch-canvas-${cardId}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none transition-opacity duration-700 ${
            revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ touchAction: 'none' }}
        />
      </div>

      {/* Label under the card */}
      <span className="mt-2 text-[10px] font-cinzel tracking-widest uppercase font-semibold text-[#8C6D32]">
        {label}
      </span>
    </div>
  );
};
