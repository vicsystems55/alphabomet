<template>
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
</template>

<script setup>
import { useHead } from "@unhead/vue";

import HomeGlobeHero from "../components/hero/HomeGlobeHero.vue";
import HomeActionStrip from "../components/home/HomeActionStrip.vue";
import HomeEcosystem from "../components/home/HomeEcosystem.vue";
import HomeImpact from "../components/home/HomeImpact.vue";
// import HomeHeroSlider from "../components/hero/HomeHeroSlider.vue";
// import HomeStats from "../components/home/HomeStats.vue";
// import HomeBusinesses from "../components/home/HomeBusinesses.vue";
// import HomeStrategy from "../components/home/HomeStrategy.vue";

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
