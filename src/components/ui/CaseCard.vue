<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseImage from './BaseImage.vue'
import type { Case } from '@/types/content'

defineProps<{ item: Case }>()
const { t } = useI18n()
</script>

<template>
  <RouterLink
    :to="`/cases/${item.id}`"
    class="card group block overflow-hidden transition-transform duration-300 hover:-translate-y-1"
  >
    <div class="relative aspect-[4/5] overflow-hidden">
      <BaseImage :src="item.image" :alt="t(item.titleKey)" />
      <span class="absolute start-3 top-3 rounded-full bg-accent-400 px-3 py-1 text-xs font-bold text-brand-900">
        {{ t('cases.typeLoss') }}
      </span>
    </div>
    <div class="p-5">
      <div class="flex items-center justify-between gap-2">
        <span class="text-xl font-black text-brand-700">{{ t(item.changeKey) }}</span>
        <span class="text-sm text-muted">{{ t(item.durationKey) }}</span>
      </div>
      <h3 class="mt-2 font-bold text-strong">{{ t(item.titleKey) }}</h3>
      <p class="mt-1 text-sm text-muted">{{ t(item.dateKey) }}</p>
      <span class="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-600 group-hover:underline">
        {{ t('cases.viewCase') }}
      </span>
    </div>
  </RouterLink>
</template>
