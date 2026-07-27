<template>
  <section class="construction-page" aria-labelledby="construction-title">
    <div class="construction-page__content">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <RouterLink to="/">Home</RouterLink>
        <ChevronRight :size="14" />
        <RouterLink :to="parentPath">{{ section }}</RouterLink>
        <ChevronRight :size="14" />
        <span>{{ title }}</span>
      </nav>

      <div class="construction-badge">
        <span></span>
        Page in development
      </div>
      <p class="eyebrow">{{ section }}</p>
      <h1 id="construction-title">{{ title }}</h1>
      <p class="construction-page__summary">
        We are preparing a more complete view of this part of the Alphabomet ecosystem.
        The page will be available soon.
      </p>

      <div class="construction-page__actions">
        <RouterLink :to="parentPath" class="button-gold">
          Explore {{ section }} <ArrowRight :size="18" />
        </RouterLink>
        <RouterLink to="/contact/contact-us" class="button-ghost">Contact us</RouterLink>
      </div>
    </div>

    <div class="construction-visual" aria-hidden="true">
      <span class="construction-visual__number">A</span>
      <div class="construction-visual__rings">
        <span></span><span></span><span></span>
      </div>
      <p>Boundless<br />opportunities</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight, ChevronRight } from "@lucide/vue";

const route = useRoute();
const title = computed(() => route.meta.pageTitle || "Coming Soon");
const section = computed(() => route.meta.section || "Alphabomet");
const parentPath = computed(() => route.meta.parentPath || "/");
</script>
