export type Locale = 'ar' | 'en'
export type Theme = 'light' | 'dark'

export interface NavLink {
  /** Route path, e.g. "/cases". */
  to: string
  labelKey: string
}

export interface Case {
  id: string
  image: string | null
  titleKey: string
  changeKey: string
  durationKey: string
  dateKey: string
  descKey: string
}

export interface Stat {
  id: string
  value: number
  suffix: '+' | '%' | '★' | ''
  labelKey: string
}

export interface Service {
  id: string
  order: number
  icon: string
  titleKey: string
  descKey: string
}

export interface SocialLink {
  platform: string
  icon: string
  label: string
  href: string
}

export type ContactType = 'phone' | 'whatsapp' | 'address' | 'hours'

export interface ContactChannel {
  type: ContactType
  icon: string
  titleKey: string
  /** Either literal values (tel/links) or i18n keys — see `translate` flag. */
  values: string[]
  translate?: boolean
}
