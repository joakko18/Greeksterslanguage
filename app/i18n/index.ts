// app/i18n/index.ts
// This file is used in Server Components to fetch translations

import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from './settings';
import type { TOptions } from 'i18next';

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(resourcesToBackend((language: string, namespace: string) =>
      import(`../../public/locales/${language}/${namespace}.json`)
    ))
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(lng: string, ns = 'translation', options: TOptions = {}) {
  const i18nextInstance = await initI18next(lng, ns);

  // Fix: Safely extract keyPrefix and ensure its type is string | undefined
  // This explicitly checks if keyPrefix exists and is a string, otherwise it's undefined.
  const keyPrefixValue: string | undefined = typeof options.keyPrefix === 'string'
    ? options.keyPrefix
    : undefined;

  return {
    // Pass the explicitly typed keyPrefixValue to getFixedT
    t: i18nextInstance.getFixedT(lng, ns, keyPrefixValue),
    i18n: i18nextInstance,
  };
}