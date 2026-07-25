<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseImage from '@/components/ui/BaseImage.vue'
import { useReveal } from '@/composables/useReveal'

withDefaults(defineProps<{ teaser?: boolean }>(), { teaser: false })

const { t } = useI18n()
const { el } = useReveal<HTMLDivElement>()

const pills = ['about.pills.degree', 'about.pills.diploma', 'about.pills.member']
</script>

<template>
  <section id="about" class="py-20 sm:py-28">
    <div ref="el" class="reveal container-x grid items-center gap-10 lg:grid-cols-12">
      <!-- Portrait -->
      <div class="lg:col-span-5">
        <div class="relative mx-auto max-w-md">
          <div class="card aspect-[4/5] overflow-hidden">
            <BaseImage src="/images/doctor.jpeg" :alt="t('about.name')" />
          </div>
          <div
            class="absolute -bottom-5 end-5 flex flex-col items-center rounded-2xl bg-accent-400 px-5 py-3 text-brand-900 shadow-soft"
          >
            <span class="text-2xl font-black leading-none">16+</span>
            <span class="text-xs font-bold">{{ t('about.expLabel') }}</span>
          </div>
        </div>
      </div>

      <!-- Text -->
      <div class="lg:col-span-7">
        <span class="pill">{{ t('about.tag') }}</span>
        <h2 class="mt-4 text-3xl font-extrabold sm:text-4xl">{{ t('about.name') }}</h2>
        <p class="mt-2 text-lg font-semibold text-brand-700">{{ t('about.title') }}</p>
        <p class="mt-4 leading-relaxed text-body" :class="teaser ? 'line-clamp-3' : ''">
          {{ t('about.bio') }}
        </p>

        <ul v-if="!teaser" class="mt-6 flex flex-wrap gap-2">
          <li v-for="p in pills" :key="p" class="pill bg-alt text-brand-700">{{ t(p) }}</li>
        </ul>

        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink v-if="teaser" to="/about" class="btn btn-primary">
            {{ t('about.more') }}
          </RouterLink>
          <RouterLink v-else to="/contact" class="btn btn-primary">
            {{ t('common.bookNow') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
