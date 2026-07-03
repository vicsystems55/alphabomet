<template>
  <HomeHeroSlider />
</template>

<script setup>
import { useHead } from "@unhead/vue";
import HomeHeroSlider from "../components/hero/HomeHeroSlider.vue";

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