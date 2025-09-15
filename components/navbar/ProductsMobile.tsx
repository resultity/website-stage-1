'use client'

import React from 'react';
import RLink from '@/components/rlink';
import { useLang } from '@/components/locale';
import dicts from './locale';

type LinkItem = { children: string; route: string };

function ProductsDropdownMobile({ productsLeft, productsRight }: { productsLeft: LinkItem[], productsRight: LinkItem[] }) {
  const lang = useLang();
  const t = dicts[lang] ?? dicts.en;

  return (
    <div className="is-hidden-desktop px-2 mt-2">
      <p className="has-text-weight-semibold has-text-right is-size-7 mb-1">{t.dropdowns.productsHeadings.platform}</p>
      {productsLeft.map(({ route, children }) => (
        <RLink className="navbar-item" route={route} key={route}>
          {children}
        </RLink>
      ))}
      <p className="has-text-weight-semibold is-size-7 has-text-right mt-3 mb-1">{t.dropdowns.productsHeadings.development}</p>
      {productsRight.map(({ route, children }) => (
        <RLink className="navbar-item" route={route} key={route}>
          {children}
        </RLink>
      ))}
    </div>
  );
}

export default React.memo(ProductsDropdownMobile);
