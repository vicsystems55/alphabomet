<template>
  <section class="bg-white py-section-sm text-primary">
    <div class="mx-auto max-w-container px-6">
      <div class="mb-12 text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70">
          Our Businesses
        </p>

        <div class="mx-auto mt-4 h-px w-24 bg-secondary"></div>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="business in businesses"
          :key="business.title"
          class="group overflow-hidden rounded-card bg-white shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div class="relative h-44 overflow-hidden">
            <img
              :src="business.image"
              :alt="business.title"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div class="absolute inset-x-0 bottom-0 h-2 bg-primary"></div>

            <div class="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-secondary shadow-lg">
              <component :is="business.icon" class="h-6 w-6" />
            </div>
          </div>

          <div class="px-6 pb-7 pt-10">
            <h3 class="font-heading text-2xl font-semibold leading-tight text-primary">
              {{ business.title }}
            </h3>

            <p class="mt-4 text-sm leading-relaxed text-primary/75">
              {{ business.description }}
            </p>

            <RouterLink
              :to="business.link"
              class="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary transition hover:text-secondary-dark"
            >
              Learn More
              <span>→</span>
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Building2,
  Landmark,
  Cpu,
  Truck,
} from "@lucide/vue";

import businessImage from "../../assets/images/our-business1.png";

const businesses = [
  {
    icon: Building2,
    title: "Infrastructure & Construction",
    description:
      "Engineering excellence in civil construction, infrastructure delivery and PPP projects.",
    image: businessImage,
    link: "/businesses",
  },
  {
    icon: Landmark,
    title: "Investment & Asset Development",
    description:
      "Strategic investments in real estate, assets and projects that generate long-term value.",
    image: businessImage,
    link: "/businesses",
  },
  {
    icon: Cpu,
    title: "Technology & Innovation",
    description:
      "Driving digital transformation and innovative solutions for businesses and communities.",
    image: businessImage,
    link: "/businesses",
  },
  {
    icon: Truck,
    title: "Trade & Industrial Services",
    description:
      "Enabling trade, logistics, industrial services and reliable supply chain solutions.",
    image: businessImage,
    link: "/businesses",
  },
];
</script>