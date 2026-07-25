<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { navLinks } from '@/data/content'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import LangToggle from './LangToggle.vue'
import ThemeToggle from './ThemeToggle.vue'

const { t } = useI18n()
const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

/** Home is active only on "/"; other links stay active on their sub-pages too. */
function isActive(to: string): boolean {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

function onScroll() {
  scrolled.value = window.scrollY > 20
}
function closeMenu() {
  menuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-bg/90 shadow-card backdrop-blur' : 'bg-transparent'"
  >
    <nav class="container-x flex items-center justify-between gap-4 py-3">
      <!-- Brand -->
      <RouterLink to="/" class="flex flex-col leading-tight" @click="closeMenu">
        <span class="text-lg font-extrabold text-brand-700">{{ t('brand.name') }}</span>
        <span class="text-[11px] font-medium text-muted">{{ t('brand.sub') }}</span>
      </RouterLink>

      <!-- Desktop links -->
      <ul class="hidden items-center gap-6 lg:flex">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            :aria-current="isActive(link.to) ? 'page' : undefined"
            class="relative text-sm transition hover:text-brand-700"
            :class="
              isActive(link.to)
                ? 'font-bold text-brand-700 after:absolute after:-bottom-1.5 after:inset-x-0 after:h-0.5 after:rounded-full after:bg-brand-600'
                : 'font-semibold text-body'
            "
          >
            {{ t(link.labelKey) }}
          </RouterLink>
        </li>
      </ul>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <ThemeToggle />
        <LangToggle />
        <button
          type="button"
          class="grid h-9 w-9 place-items-center rounded-full border border-line text-strong lg:hidden"
          :aria-label="t('common.openMenu')"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <BaseIcon :name="menuOpen ? 'close' : 'menu'" :size="20" />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition name="menu">
      <div v-if="menuOpen" class="border-t border-line bg-bg lg:hidden">
        <ul class="container-x flex flex-col py-2">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              :aria-current="isActive(link.to) ? 'page' : undefined"
              class="block rounded-lg px-2 py-3 text-sm transition"
              :class="
                isActive(link.to)
                  ? 'bg-alt font-bold text-brand-700'
                  : 'font-semibold text-body hover:bg-alt hover:text-brand-700'
              "
              @click="closeMenu"
            >
              {{ t(link.labelKey) }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
