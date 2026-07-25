<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { usePreferencesStore } from '@/stores/preferences'

const prefs = usePreferencesStore()
const { t } = useI18n()
</script>

<template>
  <button
    type="button"
    class="rounded-full border border-line px-3 py-1.5 text-sm font-bold text-strong transition hover:bg-alt"
    :aria-label="t('common.switchLang')"
    @click="prefs.toggleLocale()"
  >
    {{ prefs.locale === 'ar' ? 'EN' : 'ع' }}
  </button>
</template>
