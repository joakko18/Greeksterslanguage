// app/i18n/settings.ts

export const fallbackLng = 'en'; // Default language if detection fails
export const languages = [fallbackLng, 'it', 'gr']; // List of all supported languages
export const defaultNS = 'translation'; // Default namespace (your main translation file name)

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