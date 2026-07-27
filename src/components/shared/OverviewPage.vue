<template>
  <div>
    <PageHero
      :eyebrow="eyebrow"
      :title="title"
      :summary="summary"
      :index="index"
    />

    <section class="overview-intro">
      <div>
        <p class="eyebrow">{{ statementLabel }}</p>
        <h2>{{ statement }}</h2>
      </div>
      <p>{{ body }}</p>
    </section>

    <section class="overview-links">
      <div class="section-heading">
        <div>
          <p class="eyebrow">{{ linksLabel }}</p>
          <h2>{{ linksTitle }}</h2>
        </div>
        <p>{{ linksSummary }}</p>
      </div>

      <div class="overview-links__grid">
        <RouterLink
          v-for="(item, itemIndex) in items"
          :key="item.path"
          :to="item.path"
          class="overview-card"
        >
          <span>0{{ itemIndex + 1 }}</span>
          <div>
            <h3>{{ item.label }}</h3>
            <p>{{ item.description || `Discover Alphabomet's approach to ${item.label.toLowerCase()}.` }}</p>
          </div>
          <ArrowUpRight :size="21" />
        </RouterLink>
      </div>
    </section>

    <section class="page-cta">
      <p class="eyebrow">{{ ctaEyebrow }}</p>
      <h2>{{ ctaTitle }}</h2>
      <RouterLink :to="ctaPath" class="button-gold">
        {{ ctaLabel }} <ArrowRight :size="18" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight, ArrowUpRight } from "@lucide/vue";
import PageHero from "./PageHero.vue";

defineProps({
  eyebrow: String,
  title: String,
  summary: String,
  index: String,
  statementLabel: String,
  statement: String,
  body: String,
  linksLabel: { type: String, default: "Explore" },
  linksTitle: String,
  linksSummary: String,
  items: { type: Array, required: true },
  ctaEyebrow: { type: String, default: "Build with us" },
  ctaTitle: String,
  ctaLabel: { type: String, default: "Start a conversation" },
  ctaPath: { type: String, default: "/contact/partner-with-us" },
});
</script>
