'use client';

import React from 'react';
import Image from 'next/image';

interface HeroSideBgProps {
  contentCol: number; // 1–12
  imageCol: number;   // 1–12
  imageRight?: boolean;
  inverted?: boolean;
  imageSrc: string;
  imageAlt?: string;
  children: React.ReactNode;
}

export default function HeroSideBg({
  contentCol,
  imageCol,
  imageRight = false,
  inverted = false,
  imageSrc,
  imageAlt = 'background caption',
  children,
}: HeroSideBgProps) {
  const contentClass = `column is-${contentCol}`;
  const imageClass = `column is-${imageCol} is-hidden-mobile`;

  return (
    <section className="section hero-side-bg is-fullheight-with-navbar">
      <div className="container">
        <div className="columns is-vcentered is-multiline is-variable is-6">
          {imageRight ? (
            <>
              <div className={contentClass}>{children}</div>
              <div className={imageClass}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  className="hero-image"
                  width={1600}
                  height={900}
                  priority
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </>
          ) : (
            <>
              <div className={imageClass}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  className="hero-image"
                  width={1600}
                  height={900}
                  priority
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className={contentClass}>{children}</div>
            </>
          )}
        </div>
      </div>

      {/* Mobile background with position based on imageRight */}
      <div
        className={`mobile-bg is-hidden-tablet ${imageRight ? 'align-right' : 'align-left'}`}
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundColor: inverted ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
        }}
      />

      <style jsx>{`
        .hero-side-bg {
          position: relative;
          overflow: hidden;
        }

        .hero-image {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .mobile-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-blend-mode: overlay;
          background-position: center;
          filter: blur(3px);
          z-index: 0;
        }

        .align-right {
          background-position: right center;
        }

        .align-left {
          background-position: left center;
        }

        .container,
        .columns,
        .column {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </section>
  );
}
