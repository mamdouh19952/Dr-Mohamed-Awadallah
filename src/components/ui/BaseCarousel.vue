<script setup lang="ts" generic="T">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePreferencesStore } from '@/stores/preferences'
import BaseIcon from './BaseIcon.vue'

const props = withDefaults(
  defineProps<{ items: T[]; interval?: number }>(),
  { interval: 5000 },
)

const { t } = useI18n()
const prefs = usePreferencesStore()
const index = ref(0)
let timer: number | undefined

const isRtl = computed(() => prefs.locale === 'ar')

function go(to: number) {
  const n = props.items.length
  index.value = (to + n) % n
}
function next() {
  go(index.value + 1)
}
function prev() {
  go(index.value - 1)
}

function start() {
  stop()
  if (props.items.length > 1) {
    timer = window.setInterval(next, props.interval)
  }
}
function stop() {
  if (timer) window.clearInterval(timer)
}

// Arrow keys map to visual direction, honoring RTL.
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') isRtl.value ? next() : prev()
  else if (e.key === 'ArrowRight') isRtl.value ? prev() : next()
}

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <div
    class="relative"
    role="region"
    :aria-label="'carousel'"
    tabindex="0"
    @mouseenter="stop"
    @mouseleave="start"
    @focusin="stop"
    @focusout="start"
    @keydown="onKey"
  >
    <div :key="index" class="cs-slide">
      <slot name="slide" :item="items[index]" :index="index" />
    </div>

    <div class="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        class="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-strong transition hover:bg-alt"
        :aria-label="t('common.prev')"
        @click="prev"
      >
        <BaseIcon :name="isRtl ? 'chevron-right' : 'chevron-left'" :size="18" />
      </button>

      <div class="flex items-center gap-2">
        <button
          v-for="(_, i) in items"
          :key="i"
          type="button"
          class="h-2.5 rounded-full transition-all"
          :class="i === index ? 'w-6 bg-brand-600' : 'w-2.5 bg-brand-200'"
          :aria-label="`${i + 1}`"
          :aria-current="i === index"
          @click="go(i)"
        />
      </div>

      <button
        type="button"
        class="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-strong transition hover:bg-alt"
        :aria-label="t('common.next')"
        @click="next"
      >
        <BaseIcon :name="isRtl ? 'chevron-left' : 'chevron-right'" :size="18" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.cs-slide {
  animation: cs-fade 0.35s ease;
}
@keyframes cs-fade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .cs-slide {
    animation: none;
  }
}
</style>
