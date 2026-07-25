<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { contactChannels, MAPS_COORDS, MAPS_URL, PHONE, WHATSAPP } from '@/data/content'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useReveal } from '@/composables/useReveal'

const { t } = useI18n()
const { el } = useReveal<HTMLDivElement>()

// Real clinic location — keyless embeddable map centered on the coordinates.
const mapSrc = `https://maps.google.com/maps?q=${MAPS_COORDS.lat},${MAPS_COORDS.lng}&z=15&hl=ar&output=embed`
</script>

<template>
  <section id="contact" class="bg-alt py-20 sm:py-28">
    <div ref="el" class="reveal container-x">
      <SectionHeading
        :tag="t('contact.tag')"
        :title="t('contact.title')"
        :subtitle="t('contact.subtitle')"
        center
      />

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="c in contactChannels" :key="c.type" class="card flex flex-col gap-3 p-6">
          <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-700">
            <BaseIcon :name="c.icon" :size="24" />
          </span>
          <h3 class="text-lg font-bold text-strong">{{ t(c.titleKey) }}</h3>

          <template v-if="c.type === 'phone'">
            <a :href="`tel:${PHONE}`" dir="ltr" class="font-semibold text-brand-700 hover:underline">
              {{ PHONE }}
            </a>
          </template>

          <template v-else-if="c.type === 'whatsapp'">
            <a
              :href="`https://wa.me/${WHATSAPP}`"
              target="_blank"
              rel="noopener"
              class="font-semibold text-brand-700 hover:underline"
            >
              {{ t('contact.whatsapp.action') }}
            </a>
          </template>

          <template v-else>
            <p v-for="v in c.values" :key="v" class="text-body">{{ t(v) }}</p>
            <span
              v-if="c.type === 'hours'"
              class="mt-1 w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700"
            >
              {{ t('contact.hours.online') }}
            </span>
          </template>
        </div>
      </div>

      <!-- Map -->
      <div class="card mt-8 overflow-hidden">
        <iframe
          :src="mapSrc"
          :title="t('contact.mapTitle')"
          class="h-72 w-full border-0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
        <a
          :href="MAPS_URL"
          target="_blank"
          rel="noopener"
          class="flex items-center justify-center gap-2 border-t border-line py-3 text-sm font-bold text-brand-700 hover:bg-alt"
        >
          <BaseIcon name="pin" :size="18" />
          {{ t('contact.openMap') }}
        </a>
      </div>
    </div>
  </section>
</template>
