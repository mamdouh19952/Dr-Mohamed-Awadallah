<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { services } from '@/data/content'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useReveal } from '@/composables/useReveal'

const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 0 })

const { t } = useI18n()
const { el } = useReveal<HTMLDivElement>()
const shown = computed(() => (props.limit > 0 ? services.slice(0, props.limit) : services))
</script>

<template>
  <section id="services" class="py-20 sm:py-28">
    <div ref="el" class="reveal container-x">
      <SectionHeading
        :tag="t('services.tag')"
        :title="t('services.title')"
        :subtitle="t('services.subtitle')"
        center
      />

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in shown"
          :key="service.id"
          class="card group relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1"
        >
          <span
            class="absolute end-5 top-4 text-4xl font-black text-brand-100 transition group-hover:text-brand-200"
          >
            {{ String(service.order).padStart(2, '0') }}
          </span>
          <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-700">
            <BaseIcon :name="service.icon" :size="24" />
          </span>
          <h3 class="mt-5 text-lg font-bold text-strong">{{ t(service.titleKey) }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-body">{{ t(service.descKey) }}</p>
        </article>
      </div>

      <div v-if="limit > 0" class="mt-10 text-center">
        <RouterLink to="/services" class="btn btn-primary">{{ t('services.viewAll') }}</RouterLink>
      </div>
    </div>
  </section>
</template>
