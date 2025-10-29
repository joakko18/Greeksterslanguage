// app/i18n/settings.ts

// CHANGE 2: Update the languages array
export const languages = ['en', 'es']; // Changed from ['en', 'it', 'gr']

export const defaultNS = 'translation'; // Standard namespace
export const fallbackLng = 'en';
// This function provides common i18next options
export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: process.env.NODE_ENV === 'development', // Uncomment for debugging in dev mode
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    interpolation: {
      escapeValue: false // React already escapes values, so disable this
    }
  };
}