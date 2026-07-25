<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { PHONE, WHATSAPP } from '@/data/content'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="bg-brand-900 py-16 text-white sm:py-20">
    <div class="container-x flex flex-col items-center gap-6 text-center">
      <h2 class="text-3xl font-extrabold text-white sm:text-4xl">{{ t('contact.title') }}</h2>
      <p class="max-w-xl text-brand-100">{{ t('contact.subtitle') }}</p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <a
          :href="`https://wa.me/${WHATSAPP}`"
          target="_blank"
          rel="noopener"
          class="btn btn-accent"
        >
          {{ t('common.inquire') }}
          <BaseIcon name="whatsapp" :size="18" />
        </a>
        <a :href="`tel:${PHONE}`" dir="ltr" class="btn border border-white/30 text-white hover:bg-white/10">
          {{ PHONE }}
        </a>
        <RouterLink to="/contact" class="btn border border-white/30 text-white hover:bg-white/10">
          {{ t('contact.fullPage') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
