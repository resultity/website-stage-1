'use client'

import React from 'react';
import Image from 'next/image';
import RLink from '@/components/rlink';
import { ROUTES as R } from '@/app/routes';
import { CheckSquare } from 'lucide-react';
import { useLang } from '@/components/locale';
import dicts from './locale';

function TokenDropdownDesktop() {
  const lang = useLang();
  const t = dicts[lang] ?? dicts.en;
  const tokenDict = t.dropdowns.token;

  const features = [
    tokenDict.features.payments,
    tokenDict.features.airdrop,
    tokenDict.features.staking,
    tokenDict.features.rewards,
  ];

  return (
    <>
      <div className="token-dropdown-desktop">
        <div className="card matrix-card has-background-black token-card">
          <div className="bsc-icon">
            <Image
              src="/chains/bsc.svg"
              alt="BSC"
              width={48}  // 3rem
              height={48}
              priority={false}
            />
          </div>

          <div className="card-content is-family-monospace">
            <code className="title is-4 has-text-primary has-text-weight-light mb-4">
              $RTITY
            </code>
            <p className="is-size-6 has-text-centered my-4">{tokenDict.utility}</p>

            <div className="columns mb-4">
              <div className="column has-text-centered">
                <p className="heading has-text-weight-bold">{tokenDict.totalSupply}</p>
                <p className="title is-5 has-text-white">1,327,200,000</p>
              </div>
              <div className="column has-text-centered">
                <p className="heading has-text-weight-bold">{tokenDict.launchDate}</p>
                <p className="title is-5 has-text-white">{tokenDict.tba}</p>
              </div>
            </div>

            <div className="columns mb-1">
              {features.map((item) => (
                <div className="column has-text-centered" key={item}>
                  <p className="heading has-text-weight-bold">{item}</p>
                  <p className="title is-5 has-text-white">
                    <CheckSquare className="has-text-success" size={32} />
                  </p>
                </div>
              ))}
            </div>

            <div className="columns">
              <div className="column">
                <RLink className="button is-primary is-fullwidth" route={R.token.href}>
                  {tokenDict.tokenomics}
                </RLink>
              </div>
              <div className="column">
                <RLink className="button is-white is-fullwidth" route={R.roadmap.href}>
                  {tokenDict.roadmap}
                </RLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .token-dropdown-desktop {
          width: 30rem;
          padding: 1rem 1rem;
        }
        .token-card {
          position: relative;
        }
        .bsc-icon {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
        }
        .matrix-card {
          position: relative;
          overflow: hidden;
          background-color: #000;
        }
        .matrix-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3E<rect x='1' y='1' width='28' height='28' fill='none' stroke='%239fff80' stroke-width='2'/%3E</svg>"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E<rect width='10' height='10' x='30' y='10' fill='%23666666'/%3E<rect width='15' height='15' x='55' y='5' fill='%23555555'/%3E<rect width='12' height='12' x='10' y='50' fill='%23777777'/%3E<rect width='18' height='18' x='40' y='45' fill='%23888888'/%3E</svg>");
          background-repeat: repeat, repeat;
          background-size: 30px 30px, 80px 80px;
          opacity: 0.1;
          animation:
            rain-scroll 10s linear infinite,
            opacity-pulse 10s ease-in-out infinite;
          z-index: 0;
        }
        @keyframes rain-scroll {
          0% {
            background-position: 0 0, 0 0;
          }
          100% {
            background-position: 0 80%, 0 80%;
          }
        }
        @keyframes opacity-pulse {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 0.1;
          }
        }
        .matrix-card > .card-content {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </>
  );
}

export default React.memo(TokenDropdownDesktop);
