import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import portuguese from './languages/pt'
import english from './languages/en'

const languages = {
    en: { translation: english },
    pt: { translation: portuguese }
};


i18n.use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: languages,
        lng: 'pt',
        debug: true,
        // fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
    });
    
export default i18n;