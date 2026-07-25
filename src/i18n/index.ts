import { createI18n } from 'vue-i18n'
import ar from './locales/ar'
import en from './locales/en'
import type { Locale } from '@/types/content'

const STORAGE_KEY = 'lang'

function detectInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'en' ? 'en' : 'ar'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectInitialLocale(),
  fallbackLocale: 'en',
  messages: { ar, en },
})
