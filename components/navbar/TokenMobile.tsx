'use client'

import React from 'react';
import Image from 'next/image';
import RLink from '@/components/rlink';
import { ROUTES as R } from '@/app/routes';
import { useLang } from '@/components/locale';
import dicts from './locale';

function TokenDropdownMobile() {
  const lang = useLang();
  const t = dicts[lang] ?? dicts.en;
  const tokenDict = t.dropdowns.token;

  return (
    <div className="token-mobile-dropdown">
      <div className="token-header">
        <Image
          src="/chains/bsc.svg"
          alt="BSC"
          className="bsc-icon"
          width={32}
          height={32}
          priority={false}
        />
        <div className="token-title has-text-monospace">$RTITY</div>
      </div>

      <div className="token-stats">
        <div className="stat">
          <div className="label">{tokenDict.supplyShort}</div>
          <div className="value">1&#39;327.2M</div>
        </div>
        <div className="stat">
          <div className="label">{tokenDict.launchShort}</div>
          <div className="value">{tokenDict.tba}</div>
        </div>
      </div>

      <div className="token-buttons is-flex is-justify-content-space-between">
        <RLink className="button is-primary is-small is-fullwidth mr-2" route={R.token.href}>
          {tokenDict.tokenomics}
        </RLink>
        <RLink className="button is-white is-small is-fullwidth ml-2" route={R.roadmap.href}>
          {tokenDict.roadmap}
        </RLink>
      </div>

      <style jsx>{`
        .token-mobile-dropdown {
          background: linear-gradient(to bottom right, #f9a72990, #111111 50%);
          padding: 1rem;
          border-radius: 0.75rem;
          margin-top: 0.5rem;
        }

        .token-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .bsc-icon {
          width: 2rem;
          height: 2rem;
          margin-right: 0.75rem;
        }

        .token-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #f9a729;
          font-family: monospace;
        }

        .token-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .stat {
          text-align: center;
          flex: 1;
        }

        .label {
          font-size: 0.75rem;
          color: #aaa;
        }

        .value {
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
        }

        .token-buttons {
          display: flex;
        }

        .token-buttons .button {
          font-size: 0.9rem;
        }

        .token-buttons .button:first-child {
          margin-right: 0.5rem;
        }

        .token-buttons .button:last-child {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default React.memo(TokenDropdownMobile);
