<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ src: string | null; alt: string }>()
const failed = ref(false)
</script>

<template>
  <img
    v-if="src && !failed"
    :src="src"
    :alt="alt"
    loading="lazy"
    decoding="async"
    class="h-full w-full object-cover"
    @error="failed = true"
  />
  <div
    v-else
    class="grid h-full w-full place-items-center bg-brand-100 text-brand-600"
    role="img"
    :aria-label="alt"
  >
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <path d="M3 5h18v14H3z" />
      <path d="m3 16 5-5 4 4 3-3 6 6" />
      <circle cx="8" cy="9" r="1.5" />
    </svg>
  </div>
</template>
