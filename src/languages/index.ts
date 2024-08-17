import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enUs from './modules/en'
import zhCn from './modules/zh'
import { getBrowserLang } from '@/utils'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enUs,
    },
    zh: {
      translation: zhCn,
    },
  },
  lng: getBrowserLang(),
  debug: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
