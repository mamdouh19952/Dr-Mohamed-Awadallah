<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePreferencesStore } from '@/stores/preferences'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const prefs = usePreferencesStore()
const { t } = useI18n()
const isDark = computed(() => prefs.theme === 'dark')
</script>

<template>
  <button
    type="button"
    class="grid h-9 w-9 place-items-center rounded-full border border-line text-strong transition hover:bg-alt"
    :aria-label="isDark ? t('common.lightMode') : t('common.darkMode')"
    @click="prefs.toggleTheme()"
  >
    <BaseIcon :name="isDark ? 'sun' : 'moon'" :size="18" />
  </button>
</template>
