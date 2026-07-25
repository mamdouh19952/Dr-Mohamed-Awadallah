<script setup lang="ts">
defineProps<{ tag: string; title: string; subtitle?: string; center?: boolean }>()
</script>

<template>
  <div :class="center ? 'text-center mx-auto max-w-2xl' : ''" class="mb-10 sm:mb-14">
    <span class="pill">{{ tag }}</span>
    <h2 class="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{{ title }}</h2>
    <p v-if="subtitle" class="mt-3 text-base text-body sm:text-lg">{{ subtitle }}</p>
  </div>
</template>
