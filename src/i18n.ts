// src/i18n.ts (или где у вас конфиг i18n)

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languageDetector'
import HttpBackend from 'i18next-http-backend' // <-- Новый импорт
import LocizeBackend from 'i18next-locize-backend' // Оставляем для dev
import LastUsed from 'locize-lastused'
import { locizePlugin } from 'locize'

const isDev = import.meta.env.DEV

const locizeOptions = {
  projectId: import.meta.env.VITE_LOCIZE_PROJECTID,
  apiKey: import.meta.env.VITE_LOCIZE_APIKEY, // Вы должны не выставлять свой API ключ в продакшене!!!
  version: import.meta.env.VITE_LOCIZE_VERSION
}

if (isDev) {
  i18n
    .use(LastUsed)
    .use(LocizeBackend) // Используем LocizeBackend только в dev-режиме
} else {
  // В продакшене используем HttpBackend для загрузки статических файлов
  // Предполагается, что у вас есть папка public/locales/{{lng}}/{{ns}}.json
  i18n.use(HttpBackend)
}

i18n
  // detect user language
  .use(LanguageDetector)
  // Bind i18next to React
  .use(initReactI18next)
  // InContext Editor of locize (только для dev, но можно оставить плагин для всех режимов, он сам не активен)
  .use(locizePlugin)
  // init i18next
  .init({
    debug: isDev,
    fallbackLng: 'en',
    // backend: locizeOptions, // Эту строку убираем, так как бэкенд будет условным
    backend: isDev ? locizeOptions : {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },
    locizeLastUsed: isDev ? locizeOptions : undefined, // locizeLastUsed только в dev
    saveMissing: isDev, // saveMissing только в dev
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
  })

export default i18n