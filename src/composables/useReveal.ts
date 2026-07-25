import { onMounted, onBeforeUnmount, ref } from 'vue'

/**
 * Scroll-reveal helper. Adds `is-visible` to the target when it enters the
 * viewport. Respects `prefers-reduced-motion` (reveals immediately, no motion).
 * Uses IntersectionObserver to stay dependency-free and cheap.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options?: {
  threshold?: number
  once?: boolean
}) {
  const el = ref<T | null>(null)
  const threshold = options?.threshold ?? 0.15
  const once = options?.once ?? true
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const target = el.value
    if (!target) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      target.classList.add('is-visible')
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            if (once) observer?.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('is-visible')
          }
        }
      },
      { threshold },
    )
    observer.observe(target)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { el }
}
