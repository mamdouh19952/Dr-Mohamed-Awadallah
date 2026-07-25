<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { socialLinks } from '@/data/content'

const { t } = useI18n()
</script>

<template>
  <footer class="bg-brand-900 text-white">
    <div class="container-x flex flex-col items-center gap-6 py-12 text-center">
      <p class="text-2xl font-extrabold">{{ t('brand.name') }}</p>
      <p class="max-w-md text-brand-100">{{ t('footer.tagline') }}</p>

      <div class="flex items-center gap-3">
        <a
          v-for="s in socialLinks"
          :key="s.platform"
          :href="s.href"
          target="_blank"
          rel="noopener"
          :aria-label="s.label"
          class="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-accent-400 hover:text-brand-900"
        >
          <BaseIcon :name="s.icon" :size="20" />
        </a>
      </div>

      <p class="mt-2 border-t border-white/10 pt-6 text-sm text-brand-100">
        {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
