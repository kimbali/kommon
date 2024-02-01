import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require('./en.json'),
    },
    es: {
      translation: require('./es.json'),
    },
    ca: {
      translation: require('./ca.json'),
    },
  },
  lng: 'es', // Establece el idioma predeterminado
  fallbackLng: 'es', // Idioma de respaldo si no se encuentra una traducción
  interpolation: {
    escapeValue: false, // Evita escapar HTML o caracteres especiales en las traducciones
  },
});

export function translate(key) {
  return i18n.t(key);
}

export default i18n;
