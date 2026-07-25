<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { stats } from '@/data/content'

const { t } = useI18n()
const root = ref<HTMLElement | null>(null)
const displays = ref<number[]>(stats.map(() => 0))

function animate() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    displays.value = stats.map((s) => s.value)
    return
  }
  const duration = 1400
  const start = performance.now()
  function frame(now: number) {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    displays.value = stats.map((s) => Math.round(s.value * eased))
    if (p < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

onMounted(() => {
  const el = root.value
  if (!el || !('IntersectionObserver' in window)) {
    animate()
    return
  }
  const obs = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        animate()
        obs.disconnect()
      }
    },
    { threshold: 0.4 },
  )
  obs.observe(el)
})
</script>

<template>
  <section ref="root" class="bg-brand-700 py-10 text-white">
    <div class="container-x grid grid-cols-2 gap-6 md:grid-cols-4">
      <div
        v-for="(s, i) in stats"
        :key="s.id"
        class="text-center md:border-e md:border-white/15 md:last:border-e-0"
      >
        <p class="text-4xl font-black sm:text-5xl">
          <span>{{ displays[i] }}</span><span class="text-accent-400">{{ s.suffix }}</span>
        </p>
        <p class="mt-1 text-sm text-brand-100">{{ t(s.labelKey) }}</p>
      </div>
    </div>
  </section>
</template>
