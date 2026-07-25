import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePreferencesStore } from '@/stores/preferences'

describe('preferences store (FR-012, FR-013)', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('dir')
    setActivePinia(createPinia())
  })

  it('defaults to Arabic + RTL', () => {
    const prefs = usePreferencesStore()
    expect(prefs.locale).toBe('ar')
    expect(document.documentElement.getAttribute('dir')).toBe('rtl')
  })

  it('toggling locale flips direction and persists', () => {
    const prefs = usePreferencesStore()
    prefs.toggleLocale()
    expect(prefs.locale).toBe('en')
    expect(document.documentElement.getAttribute('dir')).toBe('ltr')
    expect(localStorage.getItem('lang')).toBe('en')
  })

  it('toggling theme persists and updates data-theme', () => {
    const prefs = usePreferencesStore()
    const initial = prefs.theme
    prefs.toggleTheme()
    expect(prefs.theme).not.toBe(initial)
    expect(localStorage.getItem('theme')).toBe(prefs.theme)
    expect(document.documentElement.getAttribute('data-theme')).toBe(prefs.theme)
  })

  it('restores a stored locale', () => {
    localStorage.setItem('lang', 'en')
    setActivePinia(createPinia())
    const prefs = usePreferencesStore()
    expect(prefs.locale).toBe('en')
  })
})
