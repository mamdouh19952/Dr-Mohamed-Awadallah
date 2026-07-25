import type {
  Case,
  ContactChannel,
  NavLink,
  Service,
  SocialLink,
  Stat,
} from '@/types/content'

/** Real contact number extracted from the doctor's own marketing photos. */
export const PHONE = '+201008028751'
export const WHATSAPP = '201008028751'

/** Clinic location (Google Maps). */
export const MAPS_COORDS = { lat: 30.465588, lng: 31.125992 }
export const MAPS_URL = `https://www.google.com/maps?q=${MAPS_COORDS.lat},${MAPS_COORDS.lng}`

/** Official social profiles — single source of truth (footer, contact, etc.). */
export const socialLinks: SocialLink[] = [
  { platform: 'facebook', icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/DR.Mohamed.Awad.Allah.pharmacy' },
  { platform: 'instagram', icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/dr.mohamed_awadallah' },
  { platform: 'tiktok', icon: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@dr.mohamedawadallah19' },
  { platform: 'youtube', icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@dr.mohamedawadallah' },
  { platform: 'whatsapp', icon: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${WHATSAPP}` },
  { platform: 'maps', icon: 'pin', label: 'الموقع على الخريطة', href: MAPS_URL },
]

export const navLinks: NavLink[] = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/services', labelKey: 'nav.services' },
  { to: '/cases', labelKey: 'nav.cases' },
  { to: '/reviews', labelKey: 'nav.reviews' },
  { to: '/contact', labelKey: 'nav.contact' },
]

export const heroCards = [
  { id: 'plan', icon: 'clipboard', titleKey: 'hero.cards.plan.title', descKey: 'hero.cards.plan.desc' },
  { id: 'track', icon: 'activity', titleKey: 'hero.cards.track.title', descKey: 'hero.cards.track.desc' },
  { id: 'online', icon: 'monitor', titleKey: 'hero.cards.online.title', descKey: 'hero.cards.online.desc' },
] as const

export const stats: Stat[] = [
  { id: 'success', value: 1000, suffix: '+', labelKey: 'stats.successCases' },
  { id: 'experience', value: 16, suffix: '+', labelKey: 'stats.experience' },
  { id: 'satisfaction', value: 98, suffix: '%', labelKey: 'stats.satisfaction' },
  { id: 'rating', value: 5, suffix: '★', labelKey: 'stats.rating' },
]

export const processSteps = [
  { id: 's1', icon: 'search', titleKey: 'process.steps.s1.title', descKey: 'process.steps.s1.desc' },
  { id: 's2', icon: 'chart', titleKey: 'process.steps.s2.title', descKey: 'process.steps.s2.desc' },
  { id: 's3', icon: 'clipboard', titleKey: 'process.steps.s3.title', descKey: 'process.steps.s3.desc' },
  { id: 's4', icon: 'refresh', titleKey: 'process.steps.s4.title', descKey: 'process.steps.s4.desc' },
  { id: 's5', icon: 'trophy', titleKey: 'process.steps.s5.title', descKey: 'process.steps.s5.desc' },
] as const

export const services: Service[] = [
  { id: 'weightLoss', order: 1, icon: 'scale', titleKey: 'services.items.weightLoss.title', descKey: 'services.items.weightLoss.desc' },
  { id: 'therapeutic', order: 2, icon: 'heart', titleKey: 'services.items.therapeutic.title', descKey: 'services.items.therapeutic.desc' },
  { id: 'weightGain', order: 3, icon: 'dumbbell', titleKey: 'services.items.weightGain.title', descKey: 'services.items.weightGain.desc' },
  { id: 'sports', order: 4, icon: 'run', titleKey: 'services.items.sports.title', descKey: 'services.items.sports.desc' },
  { id: 'children', order: 5, icon: 'child', titleKey: 'services.items.children.title', descKey: 'services.items.children.desc' },
  { id: 'online', order: 6, icon: 'monitor', titleKey: 'services.items.online.title', descKey: 'services.items.online.desc' },
]

/** Real client-review screenshots (in the order they should appear). */
export const reviewImages: string[] = [
  '/images/photo_5974217050118885130_y.jpg',
  '/images/photo_5974217050118885131_y.jpg',
  '/images/photo_5974217050118885137_y.jpg',
  '/images/photo_5974217050118885138_y.jpg',
  '/images/photo_5974217050118885139_y.jpg',
  '/images/photo_5974217050118885140_y.jpg',
  '/images/photo_5974217050118885141_y.jpg',
  '/images/photo_5974217050118885148_y.jpg',
  '/images/photo_5974217050118885149_y.jpg',
  '/images/photo_5974217050118885150_y.jpg',
  '/images/photo_5974217050118885151_y.jpg',
  '/images/photo_5974217050118885152_y.jpg',
  '/images/photo_5974217050118885153_y.jpg',
  '/images/photo_5974217050118885159_y.jpg',
]

export const cases: Case[] = [
  { id: 'c1', image: '/images/gallery-6.jpeg', titleKey: 'cases.items.c1.title', changeKey: 'cases.items.c1.change', durationKey: 'cases.items.c1.duration', dateKey: 'cases.items.c1.date', descKey: 'cases.items.c1.desc' },
  { id: 'c2', image: '/images/gallery-13.jpeg', titleKey: 'cases.items.c2.title', changeKey: 'cases.items.c2.change', durationKey: 'cases.items.c2.duration', dateKey: 'cases.items.c2.date', descKey: 'cases.items.c2.desc' },
  { id: 'c3', image: '/images/gallery-5.jpeg', titleKey: 'cases.items.c3.title', changeKey: 'cases.items.c3.change', durationKey: 'cases.items.c3.duration', dateKey: 'cases.items.c3.date', descKey: 'cases.items.c3.desc' },
  { id: 'c5', image: '/images/gallery-9.jpeg', titleKey: 'cases.items.c5.title', changeKey: 'cases.items.c5.change', durationKey: 'cases.items.c5.duration', dateKey: 'cases.items.c5.date', descKey: 'cases.items.c5.desc' },
  { id: 'c6', image: '/images/gallery-4.jpeg', titleKey: 'cases.items.c6.title', changeKey: 'cases.items.c6.change', durationKey: 'cases.items.c6.duration', dateKey: 'cases.items.c6.date', descKey: 'cases.items.c6.desc' },
]

export function findCase(id: string): Case | undefined {
  return cases.find((c) => c.id === id)
}

export const contactChannels: ContactChannel[] = [
  { type: 'phone', icon: 'phone', titleKey: 'contact.phone.title', values: [PHONE] },
  { type: 'whatsapp', icon: 'whatsapp', titleKey: 'contact.whatsapp.title', values: [WHATSAPP] },
  {
    type: 'address',
    icon: 'pin',
    titleKey: 'contact.address.title',
    values: ['contact.address.line1', 'contact.address.line2'],
    translate: true,
  },
  {
    type: 'hours',
    icon: 'clock',
    titleKey: 'contact.hours.title',
    values: ['contact.hours.days', 'contact.hours.time'],
    translate: true,
  },
]
