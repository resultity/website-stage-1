// app/[lang]/roadmap/HeroComponents/Sky.tsx
'use client';

import React from 'react';
import Image from 'next/image';

type Palette = {
  sky?: string;
  skyImage?: string;
  skyHeight?: string;
  skyZ?: number;
  sunGlow?: string;
};

export default function Sky({
  palette,
  nextPalette,
}: {
  palette: Palette;
  nextPalette: () => void;
}) {
  const z = palette.skyZ ?? 0;
  const skyImage = palette.skyImage;
  const isRemote = !!skyImage && /^https?:\/\//i.test(skyImage);

  return (
    <>
      <div
        className="sky-container"
        onClick={nextPalette}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '120%',
          zIndex: z,
          cursor: 'pointer',
          overflow: 'hidden',
          opacity: 0,
          animation: 'fadeIn 2s ease-in-out forwards',
        }}
      >
        {skyImage ? (
          // Wrapper takes care of horizontal sway + oversizing.
          <div
            className="sky-image-wrap"
            style={{
              position: 'absolute',
              top: 0,
              left: '-3%',
              width: '130%',
              height: '100%',
              animation: 'swayX 60s ease-in-out infinite alternate',
              willChange: 'transform',
              pointerEvents: 'none',
            }}
          >
            <Image
              src={skyImage}
              alt="sky"
              fill
              priority
              sizes="100vw"
              unoptimized={isRemote}
              style={{
                objectFit: 'cover',
                objectPosition: 'bottom',
              }}
            />
          </div>
        ) : (
          <div
            className="sky-gradient"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: palette.sky || 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '120% 100%',
              backgroundPosition: 'center bottom',
              transform: 'translateX(12%)',
              animation: 'swayX 60s ease-in-out infinite alternate',
              willChange: 'transform',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      <style jsx>{`
        .sky-container {
          height: 60%;
        }

        @media (max-width: 768px) {
          .sky-container {
            height: 60%;
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes swayX {
          0% {
            transform: translateX(-3%);
          }
          50% {
            transform: translateX(3%);
          }
          100% {
            transform: translateX(-3%);
          }
        }
      `}</style>
    </>
  );
}
