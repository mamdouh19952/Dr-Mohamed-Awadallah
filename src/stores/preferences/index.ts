import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Locale, Theme } from '@/types/content'

const LANG_KEY = 'lang'
const THEME_KEY = 'theme'

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* storage unavailable (private mode) — ignore */
  }
}

function applyDocument(locale: Locale, theme: Theme): void {
  const el = document.documentElement
  el.setAttribute('lang', locale)
  el.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
  el.setAttribute('data-theme', theme)
}

export const usePreferencesStore = defineStore('preferences', () => {
  const initialLocale: Locale = readStorage(LANG_KEY) === 'en' ? 'en' : 'ar'
  const storedTheme = readStorage(THEME_KEY)
  const initialTheme: Theme =
    storedTheme === 'dark' || storedTheme === 'light'
      ? storedTheme
      : window.matchMedia?.('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

  const locale = ref<Locale>(initialLocale)
  const theme = ref<Theme>(initialTheme)

  // Apply the hydrated preferences to the document immediately.
  applyDocument(locale.value, theme.value)

  function setLocale(next: Locale): void {
    locale.value = next
    writeStorage(LANG_KEY, next)
    applyDocument(locale.value, theme.value)
  }
  function toggleLocale(): void {
    setLocale(locale.value === 'ar' ? 'en' : 'ar')
  }
  function setTheme(next: Theme): void {
    theme.value = next
    writeStorage(THEME_KEY, next)
    applyDocument(locale.value, theme.value)
  }
  function toggleTheme(): void {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { locale, theme, setLocale, toggleLocale, setTheme, toggleTheme }
})
