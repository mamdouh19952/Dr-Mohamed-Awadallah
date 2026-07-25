<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { findCase, cases, WHATSAPP } from '@/data/content'
import BaseImage from '@/components/ui/BaseImage.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import CaseCard from '@/components/ui/CaseCard.vue'

const route = useRoute()
const { t } = useI18n()

const current = computed(() => findCase(String(route.params.id)))
const others = computed(() =>
  cases.filter((c) => c.id !== route.params.id).slice(0, 3),
)
</script>

<template>
  <main class="pt-24">
    <div class="container-x py-10">
      <RouterLink to="/cases" class="inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:underline">
        <BaseIcon name="chevron-right" :size="16" class="rtl:block ltr:hidden" />
        <BaseIcon name="chevron-left" :size="16" class="ltr:block rtl:hidden" />
        {{ t('cases.viewAll') }}
      </RouterLink>

      <template v-if="current">
        <div class="mt-6 grid gap-8 lg:grid-cols-2">
          <div class="card aspect-[4/5] overflow-hidden">
            <BaseImage :src="current.image" :alt="t(current.titleKey)" />
          </div>

          <div>
            <span class="rounded-full bg-accent-400 px-3 py-1 text-xs font-bold text-brand-900">
              {{ t('cases.typeLoss') }}
            </span>
            <h1 class="mt-4 text-3xl font-black sm:text-4xl">{{ t(current.titleKey) }}</h1>

            <div class="mt-6 grid grid-cols-3 gap-4">
              <div class="card p-4 text-center">
                <p class="text-xl font-black text-brand-700">{{ t(current.changeKey) }}</p>
                <p class="mt-1 text-xs text-muted">{{ t('cases.changeLabel') }}</p>
              </div>
              <div class="card p-4 text-center">
                <p class="text-xl font-black text-strong">{{ t(current.durationKey) }}</p>
                <p class="mt-1 text-xs text-muted">{{ t('cases.durationLabel') }}</p>
              </div>
              <div class="card p-4 text-center">
                <p class="text-sm font-black text-strong">{{ t(current.dateKey) }}</p>
                <p class="mt-1 text-xs text-muted">{{ t('cases.dateLabel') }}</p>
              </div>
            </div>

            <h2 class="mt-8 text-lg font-bold text-strong">{{ t('cases.journeyTitle') }}</h2>
            <p class="mt-3 leading-relaxed text-body">{{ t(current.descKey) }}</p>

            <div class="mt-8 flex flex-wrap gap-3">
              <RouterLink to="/contact" class="btn btn-primary">{{ t('common.book') }}</RouterLink>
              <a
                :href="`https://wa.me/${WHATSAPP}`"
                target="_blank"
                rel="noopener"
                class="btn btn-accent"
              >
                {{ t('common.inquire') }}
                <BaseIcon name="whatsapp" :size="18" />
              </a>
            </div>
          </div>
        </div>

        <!-- More cases -->
        <div class="mt-16">
          <h2 class="mb-6 text-2xl font-extrabold">{{ t('cases.title') }}</h2>
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CaseCard v-for="c in others" :key="c.id" :item="c" />
          </div>
        </div>
      </template>

      <p v-else class="py-20 text-center text-xl text-muted">{{ t('cases.notFound') }}</p>
    </div>
  </main>
</template>
