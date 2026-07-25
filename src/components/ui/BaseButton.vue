<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    href?: string
    variant?: 'accent' | 'primary' | 'ghost'
    target?: string
  }>(),
  { variant: 'accent' },
)

const classes = computed(() => ({
  'btn-accent': props.variant === 'accent',
  'btn-primary': props.variant === 'primary',
  'btn-ghost': props.variant === 'ghost',
}))
</script>

<template>
  <a v-if="href" :href="href" :target="target" :class="classes" class="btn">
    <slot />
  </a>
  <button v-else type="button" :class="classes" class="btn">
    <slot />
  </button>
</template>
