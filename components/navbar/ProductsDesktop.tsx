'use client'

import React from 'react';
import RLink from '@/components/rlink';
import { useLang } from '@/components/locale';
import dicts from './locale';

type LinkItem = { children: string; route: string };

function ProductsDropdownDesktop({ productsLeft, productsRight }: { productsLeft: LinkItem[], productsRight: LinkItem[] }) {
  const lang = useLang();
  const t = dicts[lang] ?? dicts.en;

  return (
    <div className="columns is-hidden-touch is-mobile">
      <div className="column is-half">
        <p className="has-text-weight-semibold mb-2">{t.dropdowns.productsHeadings.platform}</p>
        {productsLeft.map(({ route, children }) => (
          <RLink className="navbar-item" route={route} key={route}>
            {children}
          </RLink>
        ))}
      </div>
      <div className="column is-half">
        <p className="has-text-weight-semibold mb-2">{t.dropdowns.productsHeadings.development}</p>
        {productsRight.map(({ route, children }) => (
          <RLink className="navbar-item" route={route} key={route}>
            {children}
          </RLink>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ProductsDropdownDesktop);
