<template>
  <div ref="homePage">
    <!-- Previous rotating slider and standalone stats are intentionally disabled. -->
    <!-- <HomeHeroSlider /> -->
    <!-- <HomeStats /> -->
    <HomeGlobeHero />
    <HomeEcosystem />
    <HomeImpact />
    <HomeActionStrip />
    <!-- Previous homepage business and strategy sections are retained but disabled. -->
    <!-- <HomeBusinesses /> -->
    <!-- <HomeStrategy /> -->
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useHead } from "@unhead/vue";

import HomeGlobeHero from "../components/hero/HomeGlobeHero.vue";
import HomeActionStrip from "../components/home/HomeActionStrip.vue";
import HomeEcosystem from "../components/home/HomeEcosystem.vue";
import HomeImpact from "../components/home/HomeImpact.vue";
// import HomeHeroSlider from "../components/hero/HomeHeroSlider.vue";
// import HomeStats from "../components/home/HomeStats.vue";
// import HomeBusinesses from "../components/home/HomeBusinesses.vue";
// import HomeStrategy from "../components/home/HomeStrategy.vue";

const homePage = ref(null);
let revealObserver;

onMounted(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elements = homePage.value?.querySelectorAll("[data-home-reveal]") || [];

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
  );

  elements.forEach((element) => revealObserver.observe(element));
});

onBeforeUnmount(() => revealObserver?.disconnect());

useHead({
  title: "Building Enterprises That Power Economies | Alphabomet Holdings",
  meta: [
    {
      name: "description",
      content:
        "Alphabomet Holdings is an Africa-focused holding company building enterprises across infrastructure, investment, agriculture, logistics, technology and trade.",
    },
  ],
});
</script>
