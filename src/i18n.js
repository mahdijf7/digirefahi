import i18n, { t } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './assets/locales/en/translation.json';
import fa from './assets/locales/fa/translation.json';
// const lang = localStorage.getItem('lang');
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: en,
            },
            fa: {
                translation: fa,
            },
        },
        lng: 'fa', // if you're using a language detector, do not define the lng option
        // fallbackLng: 'en',

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

export { i18n as default, t };
