// components/locale.tsx
'use client';

import { usePathname } from 'next/navigation';

export type Lang = 'en' | 'ru' | 'id';

export const isSupportedLang = (v: string): v is Lang =>
  v === 'en' || v === 'ru' || v === 'id';

export function useLang(): Lang {
  const pathname = usePathname() || '';
  const seg = pathname.split('/').filter(Boolean)[0];
  return isSupportedLang(seg) ? seg : 'en';
}

export type BaseSeo = {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonical?: string;
  keywords?: string;
};

export type PageLocaleShape<T extends object = object> = {
  seo: BaseSeo;
} & T;

export type Dicts<T extends object = object> = Record<Lang, PageLocaleShape<T>>;
