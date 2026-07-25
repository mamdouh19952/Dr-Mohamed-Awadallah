<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { reviewImages } from '@/data/content'
import ReviewGallery from '@/components/ui/ReviewGallery.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const props = withDefaults(defineProps<{ mode?: 'carousel' | 'grid' }>(), { mode: 'carousel' })

const { t } = useI18n()

// Home shows a preview; the reviews page shows every screenshot.
const shown = computed(() => (props.mode === 'grid' ? reviewImages : reviewImages.slice(0, 8)))
</script>

<template>
  <section id="reviews" class="py-20 sm:py-28">
    <div class="container-x">
      <SectionHeading
        :tag="t('testimonials.tag')"
        :title="t('testimonials.title')"
        :subtitle="t('testimonials.subtitle')"
        center
      />

      <ReviewGallery :images="shown" />

      <div v-if="mode !== 'grid'" class="mt-10 text-center">
        <RouterLink to="/reviews" class="btn btn-primary">
          {{ t('testimonials.viewAll') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
