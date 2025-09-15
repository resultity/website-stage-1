export const SUPPORTED_LANGUAGES = ['en', 'ru', 'id'] as const;
export type Lang = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANG: Lang = SUPPORTED_LANGUAGES[0];

export const isSupportedLang = (lang: string): lang is Lang =>
  SUPPORTED_LANGUAGES.includes(lang as Lang);