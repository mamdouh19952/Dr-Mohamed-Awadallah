<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseImage from './BaseImage.vue'
import BaseIcon from './BaseIcon.vue'

const props = defineProps<{ images: string[] }>()
const { t } = useI18n()

// Index of the image shown in the lightbox, or null when it's closed.
const active = ref<number | null>(null)

function open(i: number): void {
  active.value = i
}
function close(): void {
  active.value = null
}
function prev(): void {
  if (active.value === null) return
  active.value = (active.value - 1 + props.images.length) % props.images.length
}
function next(): void {
  if (active.value === null) return
  active.value = (active.value + 1) % props.images.length
}

function onKey(e: KeyboardEvent): void {
  if (active.value === null) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

// Lock page scroll + wire keyboard only while the lightbox is open.
watch(active, (value) => {
  if (value !== null) {
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKey)
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <div>
    <!-- Thumbnail grid -->
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <button
        v-for="(src, i) in images"
        :key="src"
        type="button"
        class="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-alt shadow-card focus-visible:outline-2"
        :aria-label="`${t('testimonials.viewImage')} ${i + 1}`"
        @click="open(i)"
      >
        <div class="h-full w-full transition-transform duration-300 group-hover:scale-105">
          <BaseImage :src="src" :alt="`${t('testimonials.reviewAlt')} ${i + 1}`" />
        </div>
        <span
          class="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-brand-900/40 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-800">
            {{ t('testimonials.viewImage') }}
          </span>
        </span>
      </button>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="active !== null"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <button
          type="button"
          class="absolute top-4 end-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          :aria-label="t('common.close')"
          @click="close"
        >
          <BaseIcon name="close" :size="22" />
        </button>

        <button
          type="button"
          class="absolute start-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:start-6"
          :aria-label="t('common.prev')"
          @click.stop="prev"
        >
          <BaseIcon name="chevron-right" :size="26" />
        </button>

        <img
          :src="images[active]"
          :alt="`${t('testimonials.reviewAlt')} ${active + 1}`"
          class="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-soft"
        />

        <button
          type="button"
          class="absolute end-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:end-6"
          :aria-label="t('common.next')"
          @click.stop="next"
        >
          <BaseIcon name="chevron-left" :size="26" />
        </button>

        <span
          dir="ltr"
          class="absolute bottom-5 start-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm text-white"
        >
          {{ active + 1 }} / {{ images.length }}
        </span>
      </div>
    </Teleport>
  </div>
</template>
