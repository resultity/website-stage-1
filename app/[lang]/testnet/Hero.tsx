'use client';

import { useState, useEffect } from 'react';
import HeroTestnetContent from './HeroContent';

export default function HeroTestnet() {
  const [tileOrder, setTileOrder] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<'orange' | 'grey'>('orange');
  const [stars, setStars] = useState<{ x: number; y: number; size: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    const total = 60;
    const indices = new Set<number>();
    while (indices.size < 12) {
      indices.add(Math.floor(Math.random() * total));
    }
    setTileOrder([...indices]);
  }, []);

  useEffect(() => {
    if (tileOrder.length === 0) return;

    let current = 0;
    let phaseTimer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      setActiveIndex(tileOrder[current]);
      current++;
      if (current >= tileOrder.length) {
        clearInterval(interval);
        phaseTimer = setTimeout(() => {
          setPhase('grey');
          current = 0;
          interval = setInterval(() => {
            setActiveIndex(tileOrder[current]);
            current = (current + 1) % tileOrder.length;
          }, 1000);
        }, 1000);
      }
    }, 300);

    return () => {
      clearInterval(interval);
      clearTimeout(phaseTimer);
    };
  }, [tileOrder]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const reflection = document.querySelector('.synthwave-moon.reflected');
      reflection?.classList.add('visible-reflection');
    }, 11000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const colors = ['#fff', '#999', '#f9a729'];
    const generatedStars = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 50,
      size: Math.floor(Math.random() * 4) + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section className="hero is-fullheight hero-testnet">
      <div className="tiles-top">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="tile-top" />
        ))}
      </div>

      <div className="moon-wrapper">
        <div className="synthwave-moon">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="moon-line" style={{ top: `${(i + 1) * 12}%` }} />
          ))}
        </div>
      </div>

      <div className="moon-reflection">
        <div className="synthwave-moon reflected">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="moon-line" style={{ top: `${(i + 1) * 12}%` }} />
          ))}
        </div>
      </div>

      <HeroTestnetContent />

      <div className="tiles">
        {Array.from({ length: 60 }).map((_, i) => {
          const isActive = i === activeIndex;
          const isBlinkable = tileOrder.includes(i);
          const className = [
            'tile',
            isBlinkable && isActive && phase === 'orange' ? 'blink-primary' : '',
            isBlinkable && isActive && phase === 'grey' ? 'blink-grey' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return <div key={i} className={className} />;
        })}
      </div>

      <style jsx>{`
        .hero-testnet {
          position: relative;
          background-color: #000;
          color: #fff;
          height: calc(var(--vh, 1vh) * 100);
          overflow: hidden;
        }

        .tiles-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          display: grid;
          grid-template-rows: repeat(6, 1fr);
          grid-template-columns: repeat(10, 1fr);
          z-index: 0;
          pointer-events: none;
        }

        .tile-top {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        .star {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: starFade 4s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes starFade {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.9; }
        }

        .moon-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          overflow: hidden;
          z-index: 1;
        }

        .synthwave-moon {
          position: absolute;
          bottom: -25vw;
          left: 50%;
          transform: translateX(-50%);
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle at center top, #f9a729 0%, #000000 100%);
          border-radius: 50%;
          overflow: hidden;
          opacity: 0;
          animation: fadeInMoon 10s ease-in-out 0.5s forwards;
        }

        .moon-reflection {
          position: absolute;
          top: 20%;
          left: 0;
          width: 100%;
          height: 50%;
          overflow: hidden;
          transform: scaleY(-1);
          z-index: 2;
          pointer-events: none;
        }

        .synthwave-moon.reflected {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50vw;
          height: 20vw;
          background: radial-gradient(circle at center top, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%);
          border-radius: 50%;
          overflow: hidden;
          opacity: 0;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), transparent);
        }

        .synthwave-moon.reflected.visible-reflection {
          opacity: 0.3;
        }

        .moon-line {
          position: absolute;
          left: 0;
          width: 100%;
          height:2px;
          background-color: #000;
          opacity: 0.5;
        }

        @keyframes fadeInMoon {
          from {
            opacity: 0;
            transform: translateX(-50%) scale(0.95);
          }
          to {
            opacity: 0.5;
            transform: translateX(-50%) scale(1);
          }
        }

        .tiles {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          display: grid;
          grid-template-rows: repeat(6, 1fr);
          grid-template-columns: repeat(10, 1fr);
          transform: perspective(800px) rotateX(60deg);
          transform-origin: top;
          z-index: 1;
        }

        .tile {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .blink-primary {
          animation: blinkPrimary 0.6s ease-in-out 1;
        }

        @keyframes blinkPrimary {
          0% { opacity: 0.1; background: rgba(249,167,41,0.2); border-color: #F9A729; }
          50% { opacity: 0.7; background: rgba(249,167,41,0.4); border-color: #F9A729; }
          100% { opacity: 0.1; background: rgba(249,167,41,0.2); border-color: #F9A729; }
        }

        .blink-grey {
          animation: blinkGrey 1s ease-in-out infinite;
        }

        @keyframes blinkGrey {
          0% { opacity: 0.1; background: rgba(249,167,41,0.2); border-color: #F9A729; }
          50% { opacity: 0.3; background: rgba(249,167,41,0.5); border-color: #F9A729; }
          100% { opacity: 0.1; background: rgba(249,167,41,0.2); border-color: #F9A729; }
        }
      `}</style>
    </section>
  );
}
