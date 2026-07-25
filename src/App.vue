<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePreferencesStore } from '@/stores/preferences'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import ScrollTopButton from '@/components/ui/ScrollTopButton.vue'

const prefs = usePreferencesStore()
const { locale } = useI18n()

// Keep vue-i18n's active locale in lockstep with the persisted preference.
watch(
  () => prefs.locale,
  (value) => {
    locale.value = value
  },
  { immediate: true },
)

const ready = ref(false)
onMounted(() => {
  ready.value = true
})
</script>

<template>
  <TheNavbar />
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
  <TheFooter />
  <ScrollTopButton v-if="ready" />
</template>
