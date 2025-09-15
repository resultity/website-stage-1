'use client'

import React from 'react';
import RLink from '../rlink';
import { useLang } from '../locale';
import dicts from './locale';

interface Props {
  companyVision: { children: string; route: string }[];
  companyCommunity: { children: string; route: string }[];
}

function CompanyDropdownDesktop({ companyVision, companyCommunity }: Props) {
  const lang = useLang();
  const t = dicts[lang] ?? dicts.en;

  return (
    <div className="columns is-hidden-touch is-mobile">
      <div className="column is-half">
        <p className="has-text-weight-semibold mb-2">{t.dropdowns.companyHeadings.essentials}</p>
        {companyVision.map(({ route, children }) => (
          <RLink className="navbar-item" route={route} key={route}>
            {children}
          </RLink>
        ))}
      </div>
      <div className="column is-half">
        <p className="has-text-weight-semibold mb-2">{t.dropdowns.companyHeadings.community}</p>
        {companyCommunity.map(({ route, children }) => (
          <RLink className="navbar-item" route={route} key={route}>
            {children}
          </RLink>
        ))}
      </div>
    </div>
  );
}

export default React.memo(CompanyDropdownDesktop);

