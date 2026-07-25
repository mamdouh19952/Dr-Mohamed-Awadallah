<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { cases } from '@/data/content'
import type { Case } from '@/types/content'
import BaseCarousel from '@/components/ui/BaseCarousel.vue'
import BaseImage from '@/components/ui/BaseImage.vue'
import CaseCard from '@/components/ui/CaseCard.vue'

const { t } = useI18n()
</script>

<template>
  <main class="pt-24">
    <!-- Header + featured slider -->
    <section class="bg-gradient-to-b from-brand-50 to-bg py-14">
      <div class="container-x">
        <span class="pill">{{ t('cases.tag') }}</span>
        <h1 class="mt-4 text-3xl font-black sm:text-4xl">{{ t('cases.title') }}</h1>
        <p class="mt-3 max-w-2xl text-body">{{ t('cases.subtitle') }}</p>

        <div class="mt-10">
          <BaseCarousel :items="cases" :interval="6000">
            <template #slide="{ item }: { item: Case }">
              <div class="card grid overflow-hidden md:grid-cols-2">
                <div class="h-64 sm:h-80 md:h-[28rem]">
                  <BaseImage :src="item.image" :alt="t(item.titleKey)" />
                </div>
                <div class="flex flex-col justify-center gap-4 p-6 sm:p-10">
                  <span class="w-fit rounded-full bg-accent-400 px-3 py-1 text-xs font-bold text-brand-900">
                    {{ t('cases.typeLoss') }}
                  </span>
                  <h2 class="text-2xl font-black sm:text-3xl">{{ t(item.titleKey) }}</h2>
                  <div class="flex flex-wrap gap-6">
                    <div>
                      <p class="text-2xl font-black text-brand-700">{{ t(item.changeKey) }}</p>
                      <p class="text-xs text-muted">{{ t('cases.changeLabel') }}</p>
                    </div>
                    <div>
                      <p class="text-2xl font-black text-strong">{{ t(item.durationKey) }}</p>
                      <p class="text-xs text-muted">{{ t('cases.durationLabel') }}</p>
                    </div>
                  </div>
                  <p class="line-clamp-3 text-body">{{ t(item.descKey) }}</p>
                  <RouterLink :to="`/cases/${item.id}`" class="btn btn-primary w-fit">
                    {{ t('cases.viewCase') }}
                  </RouterLink>
                </div>
              </div>
            </template>
          </BaseCarousel>
        </div>
      </div>
    </section>

    <!-- Grid -->
    <section class="py-16">
      <div class="container-x">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CaseCard v-for="c in cases" :key="c.id" :item="c" />
        </div>
      </div>
    </section>
  </main>
</template>
