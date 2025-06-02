import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./public/locales/en-US/translation.json"
import pt from "./public/locales/pt-BR/translation.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      "en-US": {
        translation: en,      
      },
      "pt-BR": {
        translation: pt,      
      },
    },
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;