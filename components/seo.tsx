// components/seo.ts
'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import type { BaseSeo } from '@/components/locale';

export default function Seo(seo: BaseSeo) {
  const {
    title,
    description,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    canonical,
    keywords,
  } = seo;

  const canonicalHref =
    canonical || (typeof window !== 'undefined' ? window.location.href : undefined);

  // Client-side fallback to ensure title/meta are applied even if next/head is ignored
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    if (canonicalHref) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalHref);
    }
  }, [title, description, canonicalHref]);

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
      <meta property="og:title" content={title || ''} />
      <meta property="og:description" content={description || ''} />
      {ogType && <meta property="og:type" content={ogType} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:title" content={title || ''} />
      <meta name="twitter:description" content={description || ''} />
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Head>
  );
}
