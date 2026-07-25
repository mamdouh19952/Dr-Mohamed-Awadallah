<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { processSteps } from '@/data/content'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { useReveal } from '@/composables/useReveal'

const { t } = useI18n()
const { el } = useReveal<HTMLDivElement>()
</script>

<template>
  <section id="process" class="bg-alt py-20 sm:py-28">
    <div ref="el" class="reveal container-x">
      <!-- Header -->
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div
          class="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-accent-300/40 to-brand-100"
        >
          <span class="text-4xl font-black text-accent-500">5</span>
          <span class="text-[10px] font-bold uppercase tracking-widest text-brand-700">
            {{ t('process.stepsLabel') }}
          </span>
        </div>
        <div>
          <span class="pill">{{ t('process.tag') }}</span>
          <h2 class="mt-3 text-3xl font-extrabold sm:text-4xl">{{ t('process.title') }}</h2>
          <p class="mt-2 max-w-2xl text-body">{{ t('process.subtitle') }}</p>
        </div>
      </div>

      <!-- Steps -->
      <ol class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <li
          v-for="(step, i) in processSteps"
          :key="step.id"
          class="relative flex flex-col"
        >
          <span class="grid h-12 w-12 place-items-center rounded-xl bg-card text-brand-600 shadow-card">
            <BaseIcon :name="step.icon" :size="22" />
          </span>

          <span class="mt-4 pill w-fit bg-brand-100">
            {{ t('process.stepsLabel') }} {{ String(i + 1).padStart(2, '0') }}
          </span>

          <div class="mt-3 flex items-center gap-2">
            <span
              class="h-3 w-3 rounded-full"
              :class="i === 0 ? 'bg-accent-400' : 'bg-brand-500'"
            />
            <span class="h-px flex-1 bg-line" />
          </div>

          <h3 class="mt-3 text-base font-bold text-strong">{{ t(step.titleKey) }}</h3>
          <p class="mt-1 text-sm text-muted">{{ t(step.descKey) }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
