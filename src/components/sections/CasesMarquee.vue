<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { cases } from '@/data/content'
import CaseCard from '@/components/ui/CaseCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const { t } = useI18n()
</script>

<template>
  <section id="results" class="bg-alt py-20 sm:py-28">
    <div class="container-x">
      <SectionHeading
        :tag="t('cases.homeTag')"
        :title="t('cases.homeTitle')"
        :subtitle="t('cases.homeSubtitle')"
        center
      />
    </div>

    <!-- Signature: self-running looping results strip; pauses on hover/focus -->
    <div class="marquee" :aria-label="t('cases.title')">
      <div class="marquee-track">
        <div v-for="half in 2" :key="half" class="marquee-half" :aria-hidden="half === 2">
          <div v-for="c in cases" :key="`${half}-${c.id}`" class="w-72 shrink-0 sm:w-80">
            <CaseCard :item="c" :tabindex="half === 2 ? -1 : undefined" />
          </div>
        </div>
      </div>
    </div>

    <div class="container-x mt-10 text-center">
      <RouterLink to="/cases" class="btn btn-primary">{{ t('cases.viewAll') }}</RouterLink>
    </div>
  </section>
</template>

