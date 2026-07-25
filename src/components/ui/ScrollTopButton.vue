<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseIcon from './BaseIcon.vue'

const { t } = useI18n()
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 600
}
function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="fade">
    <button
      v-show="visible"
      type="button"
      :aria-label="t('common.scrollTop')"
      class="fixed bottom-5 end-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-brand-700 text-white shadow-soft transition hover:bg-brand-800"
      @click="toTop"
    >
      <BaseIcon name="arrow-up" :size="20" />
    </button>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
