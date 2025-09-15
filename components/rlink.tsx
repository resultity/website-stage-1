// components/RLink.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES, type RouteKey } from '@/app/routes';
import { SUPPORTED_LANGUAGES } from '@/app/lang';
import {
  AnchorHTMLAttributes,
  ReactNode,
  MouseEvent,
  useEffect,
  useState,
} from 'react';

type RLinkProps = {
  route: RouteKey | string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

/** ——— simple event bus for the overlay ——— */
const EVT_SHOW = 'rtity:show-loader';
const EVT_HIDE = 'rtity:hide-loader';
function emit(name: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(name));
  }
}

/** ——— Overlay component (mount once globally) ——— */
export function RLinkLoadingOverlay() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // hide after route changes
  useEffect(() => {
    if (visible) setVisible(false);
  }, [pathname, visible]);

  useEffect(() => {
    const onShow = () => setVisible(true);
    const onHide = () => setVisible(false);
    window.addEventListener(EVT_SHOW, onShow as EventListener);
    window.addEventListener(EVT_HIDE, onHide as EventListener);
    return () => {
      window.removeEventListener(EVT_SHOW, onShow as EventListener);
      window.removeEventListener(EVT_HIDE, onHide as EventListener);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="rtity-loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="rtity-spinner" />
      <style jsx>{`
        .rtity-loader {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .rtity-spinner {
          width: 56px;
          height: 56px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: rtitySpin 0.9s linear infinite;
        }
        @keyframes rtitySpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/** ——— Link component (shows overlay on internal nav) ——— */
export default function RLink({
  route,
  children,
  className = '',
  target,
  rel,
  onClick,
  ...rest
}: RLinkProps) {
  const pathname = usePathname();

  // current lang prefix from URL
  const langMatch = pathname?.match(
    new RegExp(`^\\/(${SUPPORTED_LANGUAGES.join('|')})(\\/|$)`)
  );
  const langPrefix = langMatch ? `/${langMatch[1]}` : '';

  // route → href
  const rawHref = (route in ROUTES
    ? (ROUTES as Record<string, { href: string }>)[route as RouteKey].href
    : route) as string;

  const isExternal =
    rawHref.startsWith('http://') || rawHref.startsWith('https://');

  const alreadyHasLang = SUPPORTED_LANGUAGES.some((lang) =>
    rawHref.startsWith(`/${lang}/`) || rawHref === `/${lang}`
  );

  const normalizedHref = rawHref.startsWith('/') ? rawHref : `/${rawHref}`;
  const finalHref = isExternal
    ? rawHref
    : alreadyHasLang
    ? normalizedHref
    : `${langPrefix}${normalizedHref}`;

  const finalTarget = target ?? (isExternal ? '_blank' : undefined);
  const finalRel = rel ?? (isExternal ? 'noopener noreferrer' : undefined);

  const handleInternalClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    // only primary click, no modifiers, not _blank
    const primary =
      e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
    const sameRoute =
      finalHref === pathname ||
      (finalHref.endsWith('/') && finalHref.slice(0, -1) === pathname);

    if (primary && !finalTarget && !isExternal && !sameRoute) {
      emit(EVT_SHOW);
    }
  };

  if (isExternal) {
    return (
      <a
        href={finalHref}
        className={className}
        target={finalTarget}
        rel={finalRel}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={finalHref}
      className={className}
      {...(finalTarget ? { target: finalTarget, rel: finalRel } : {})}
      onClick={handleInternalClick}
      {...rest}
    >
      {children}
    </Link>
  );
}
