<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { heroCards } from '@/data/content'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import BaseImage from '@/components/ui/BaseImage.vue'

const { t } = useI18n()
</script>

<template>
  <section
    id="home"
    class="relative overflow-hidden bg-gradient-to-b from-brand-50 to-bg pt-28 pb-16 sm:pt-32 sm:pb-24"
  >
    <div class="container-x grid items-center gap-10 lg:grid-cols-2">
      <!-- Copy -->
      <div>
        <span class="pill">{{ t('hero.pill') }}</span>
        <h1 class="mt-5 text-4xl font-black leading-[1.15] sm:text-5xl">
          {{ t('hero.title') }}
        </h1>
        <p class="mt-5 max-w-xl text-lg text-body">{{ t('hero.subtitle') }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/contact" class="btn btn-accent">
            {{ t('common.book') }}
            <BaseIcon name="bolt" :size="18" />
          </RouterLink>
          <RouterLink to="/services" class="btn btn-ghost">{{ t('common.learnMore') }}</RouterLink>
        </div>
      </div>

      <!-- Visual: portrait + floating cards -->
      <div class="relative">
        <div class="card mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden">
          <BaseImage src="/images/doctor.jpeg" :alt="t('about.name')" />
        </div>

        <div
          class="absolute -bottom-6 start-0 w-[min(20rem,90%)] space-y-3 sm:-start-6"
        >
          <div
            v-for="card in heroCards"
            :key="card.id"
            class="card flex items-center gap-3 bg-card/95 p-3 backdrop-blur"
          >
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <BaseIcon :name="card.icon" :size="20" />
            </span>
            <div>
              <p class="text-sm font-bold text-strong">{{ t(card.titleKey) }}</p>
              <p class="text-xs text-muted">{{ t(card.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
