<template>
  <section class="relative overflow-hidden bg-primary py-section-sm text-ivory">
    <img
      src="../../assets/images/white-tree.png"
      alt=""
      class="pointer-events-none absolute left-0 top-0 h-full opacity-[0.04]"
    />

    <div class="relative mx-auto max-w-container px-6">
      <div class="mb-14 text-center">
        <p class="font-heading text-3xl text-ivory">
          Our Strategy 2026–2028
        </p>

        <div class="mx-auto mt-4 h-px w-24 bg-secondary"></div>
      </div>

      <div class="grid gap-10 lg:grid-cols-3">
        <div
          v-for="item in strategy"
          :key="item.year"
          class="relative flex gap-5"
        >
          <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-secondary text-xl font-semibold text-secondary">
            {{ item.number }}
          </div>

          <div>
            <p class="text-sm font-semibold tracking-[0.2em] text-secondary">
              {{ item.year }}
            </p>

            <h3 class="mt-1 font-heading text-2xl text-secondary">
              {{ item.title }}
            </h3>

            <p class="mt-3 max-w-sm text-sm leading-relaxed text-ivory/75">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <RouterLink
          to="/about"
          class="inline-flex items-center gap-3 border border-secondary px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-secondary transition hover:bg-secondary hover:text-primary"
        >
          View Our Strategy
          <span>→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const strategy = [
  {
    number: "01",
    year: "2026",
    title: "Consolidate",
    description:
      "Strengthen governance, optimize operations, and build a solid foundation for growth.",
  },
  {
    number: "02",
    year: "2027",
    title: "Expand",
    description:
      "Scale priority businesses, enter new markets and forge strategic partnerships.",
  },
  {
    number: "03",
    year: "2028",
    title: "Mature",
    description:
      "Achieve operational excellence, deliver sustainable returns and unlock new opportunities.",
  },
];
</script>