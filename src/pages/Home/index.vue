<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import StatsBar from '@/components/sections/StatsBar.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import ServicesGrid from '@/components/sections/ServicesGrid.vue'
import CasesMarquee from '@/components/sections/CasesMarquee.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import ContactCta from '@/components/sections/ContactCta.vue'
</script>

<template>
  <main>
    <HeroSection />
    <StatsBar />
    <AboutSection teaser />
    <ProcessSection />
    <ServicesGrid :limit="3" />
    <CasesMarquee />
    <TestimonialsSection mode="carousel" />
    <ContactCta />
  </main>
</template>
