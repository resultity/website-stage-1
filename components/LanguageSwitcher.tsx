// components/locale/LanguageSwitcher.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/components/locale";
import Image from "next/image";

// Optional: adjust if your language list lives elsewhere
const SUPPORTED = ["en", "ru", "id"] as const;
type Lang = (typeof SUPPORTED)[number];

const LABELS: Record<Lang, string> = {
  en: "English",
  ru: "Русский",
  id: "Bahasa Indonesia",
};

const SHORTLABELS: Record<Lang, string> = {
  en: "Eng",
  ru: "Рус",
  id: "Ind",
};

const FLAGS: Record<Lang, string> = {
  en: "/flags/en.svg",
  ru: "/flags/ru.svg",
  id: "/flags/id.svg",
};

function replaceLangInPath(path: string, newLang: Lang): string {
  // Replace the first path segment if it is one of supported langs
  const re = new RegExp(`^/(?:${SUPPORTED.join("|")})(?=/|$)`);
  if (re.test(path)) return path.replace(re, `/${newLang}`);
  // If no lang segment present, prefix it
  return `/${newLang}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const current = useLang() as Lang;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo<Lang[]>(
    () => SUPPORTED.filter((l) => l !== current),
    [current]
  );

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    // Close when route changes
    setOpen(false);
  }, [pathname]);

  const go = (lang: Lang) => {
    const href = replaceLangInPath(pathname, lang);
    router.push(href);
  };

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        right: "0.5rem",
        bottom: "0.5rem",
        zIndex: 60,
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Change language"
        className="button is-dark is-rounded"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        }}
      >
        <Image
          src={FLAGS[current]}
          alt={`${LABELS[current]} flag`}
          width={20}
          height={14}
          style={{ display: "block", borderRadius: "2px", height: "14px", width: "20px" }}
        />
        <span className="is-family-monospace">{SHORTLABELS[current]}</span>
        <span className="is-size-6">▾</span>
      </button>

      {open && (
        <div
          className="box"
          role="menu"
          style={{
            marginTop: "0.5rem",
            minWidth: "14rem",
            padding: "0.3rem",
            background: "rgba(0,0,0,0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0.5rem",
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            color: "white",
          }}
        >
          {[current, ...options].map((lang) => (
            <button
              key={lang}
              role="menuitemradio"
              aria-checked={lang === current}
              type="button"
              onClick={() => go(lang)}
              className="button is-fullwidth is-ghost"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                justifyContent: "flex-start",
                padding: "0.3rem 0.45rem",
                color: "white",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                opacity: lang === current ? 1 : 0.9,
              }}
            >
              <Image
                src={FLAGS[lang]}
                alt={`${LABELS[lang]} flag`}
                width={20}
                height={14}
                style={{ display: "block", borderRadius: "2px", height: "14px", width: "20px" }}
              />
              <span className="is-family-monospace">{LABELS[lang]}</span>
              {lang === current && (
                <span aria-hidden="true" style={{ marginLeft: "auto", opacity: 0.8 }}>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
