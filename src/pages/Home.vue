<template>
  <HomeHeroSlider />
  <HomeStats />
  <HomeBusinesses />
  <HomeStrategy />
</template>

<script setup>
import { useHead } from "@unhead/vue";

import HomeHeroSlider from "../components/hero/HomeHeroSlider.vue";
import HomeStats from "../components/home/HomeStats.vue";
import HomeBusinesses from "../components/home/HomeBusinesses.vue";
import HomeStrategy from "../components/home/HomeStrategy.vue";

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