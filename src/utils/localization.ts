import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

function loadI18n() {
  return i18n.use(initReactI18next).init({
    lng: getLocales()[0].languageCode,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: require('../locales/en/locales.json')
      },
      es: {
        translation: require('../locales/es/locales.json')
      }
    }
  });
}

export default loadI18n;
