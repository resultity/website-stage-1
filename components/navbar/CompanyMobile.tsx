'use client'

import React from 'react';
import RLink from '@/components/rlink';
import { useLang } from '@/components/locale';
import dicts from './locale';

interface Props {
  companyVision: { children: string; route: string }[];
  companyCommunity: { children: string; route: string }[];
}

function CompanyDropdownMobile({ companyVision, companyCommunity }: Props) {
  const lang = useLang();
  const t = dicts[lang] ?? dicts.en;

  return (
    <div className="is-hidden-desktop px-2 mt-2">
      <p className="has-text-weight-semibold is-size-7 mb-1 has-text-right">{t.dropdowns.companyHeadings.essentials}</p>
      {companyVision.map(({ route, children }) => (
        <RLink className="navbar-item" route={route} key={route}>
          {children}
        </RLink>
      ))}

      <p className="has-text-weight-semibold is-size-7 mt-3 mb-1 has-text-right">{t.dropdowns.companyHeadings.community}</p>
      {companyCommunity.map(({ route, children }) => (
        <RLink className="navbar-item" route={route} key={route}>
          {children}
        </RLink>
      ))}
    </div>
  );
}

export default React.memo(CompanyDropdownMobile);
