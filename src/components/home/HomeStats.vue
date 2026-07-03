<template>
  <section class="relative overflow-hidden bg-[#0A0A0A] py-14">
    <img
      src="../../assets/images/white-tree.png"
      alt=""
      class="pointer-events-none absolute left-0 top-0 h-full opacity-[0.05]"
    />

    <div class="relative mx-auto max-w-container px-6">
      <div class="grid gap-8 md:grid-cols-4">
        <div
          v-for="item in stats"
          :key="item.title"
          class="flex flex-col items-center border-secondary/20 text-center md:border-r last:border-r-0"
        >
          <component
            :is="item.icon"
            class="mb-4 h-10 w-10 rounded-full border border-secondary/50 p-2 text-secondary"
          />

          <h3 class="font-heading text-4xl text-secondary">
            {{ item.value }}
          </h3>

          <p class="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-ivory">
            {{ item.title }}
          </p>

          <p class="mt-1 text-sm text-ivory/65">
            {{ item.subtitle }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Building2,
  CalendarDays,
  Globe2,
  ShieldCheck,
} from "@lucide/vue";

const stats = [
  {
    icon: Building2,
    value: "4+",
    title: "Core Business",
    subtitle: "Verticals",
  },
  {
    icon: CalendarDays,
    value: "2026",
    title: "Strategic Growth",
    subtitle: "Framework",
  },
  {
    icon: Globe2,
    value: "West Africa",
    title: "Regional Focus",
    subtitle: "Global Vision",
  },
  {
    icon: ShieldCheck,
    value: "ESG",
    title: "Integrated",
    subtitle: "Governance",
  },
];
</script>