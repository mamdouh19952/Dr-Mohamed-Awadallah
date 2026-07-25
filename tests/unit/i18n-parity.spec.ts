import { describe, it, expect } from 'vitest'
import ar from '@/i18n/locales/ar'
import en from '@/i18n/locales/en'

function flatten(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return value && typeof value === 'object'
      ? flatten(value as Record<string, unknown>, path)
      : [path]
  })
}

describe('i18n catalog parity (FR-011)', () => {
  const arKeys = flatten(ar).sort()
  const enKeys = flatten(en).sort()

  it('ar and en have identical key sets', () => {
    const missingInEn = arKeys.filter((k) => !enKeys.includes(k))
    const missingInAr = enKeys.filter((k) => !arKeys.includes(k))
    expect(missingInEn, `keys missing in en: ${missingInEn.join(', ')}`).toEqual([])
    expect(missingInAr, `keys missing in ar: ${missingInAr.join(', ')}`).toEqual([])
  })

  it('no string value is empty in either language', () => {
    const emptyAr = flatten(ar).filter((k) => resolve(ar, k).trim() === '')
    const emptyEn = flatten(en).filter((k) => resolve(en, k).trim() === '')
    expect(emptyAr).toEqual([])
    expect(emptyEn).toEqual([])
  })
})

function resolve(obj: Record<string, unknown>, path: string): string {
  return path.split('.').reduce<unknown>((acc, part) => {
    return acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined
  }, obj) as string
}
