<template>
  <section class="page-hero" :class="{ 'page-hero--image': image }">
    <div
      v-if="image"
      class="page-hero__image"
      :style="{ backgroundImage: `url(${image})` }"
      aria-hidden="true"
    ></div>
    <div class="page-hero__orb"></div>
    <div class="page-hero__grid"></div>
    <div class="page-hero__content">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <RouterLink to="/">Home</RouterLink>
        <ChevronRight :size="14" />
        <span>{{ eyebrow }}</span>
      </nav>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p class="page-hero__summary">{{ summary }}</p>
      <slot />
    </div>
    <p class="page-hero__index" aria-hidden="true">{{ index }}</p>
  </section>
</template>

<script setup>
import { ChevronRight } from "@lucide/vue";

defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  index: { type: String, default: "A" },
  image: { type: String, default: "" },
});
</script>
