'use client';

import { useEffect } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { useCookies } from 'react-cookie';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { getOptions } from './settings';

// Initialize i18next ONCE with HTTP backend for dynamic resource loading
if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpBackend)
    .init({
      ...getOptions(),
      lng: undefined,
      fallbackLng: 'en',
      detection: {
        order: ['cookie', 'navigator'],
        caches: ['cookie'],
        lookupCookie: 'i18next',
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      react: {
        useSuspense: false,
      },
    });
}

export function useTranslation(lng: string, ns = 'translation', options?: any) {
  const [cookies, setCookie] = useCookies(['i18next']);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  useEffect(() => {
    if (i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  useEffect(() => {
    if (i18n.resolvedLanguage) {
      setCookie('i18next', i18n.resolvedLanguage, { path: '/' });
    }
  }, [i18n.resolvedLanguage, setCookie]);

  return ret;
}

// I18nProvider is not strictly needed, but you can keep it for compatibility
export function I18nProvider({ children }: { children: React.ReactNode }) {
  return children;
}