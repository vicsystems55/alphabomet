<template>
  <div v-if="group" class="sector-page">
    <section class="sector-page__hero">
      <div
        class="sector-page__hero-image"
        :style="{ backgroundImage: `url(${sectorImage})` }"
        aria-hidden="true"
      ></div>
      <div class="sector-page__hero-content">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <RouterLink to="/">Home</RouterLink>
          <ChevronRight :size="14" />
          <RouterLink to="/businesses">Our Businesses</RouterLink>
          <ChevronRight :size="14" />
          <span>{{ group.title }}</span>
        </nav>
        <p class="eyebrow">Our businesses / {{ group.title }}</p>
        <h1>{{ heroTitle }}</h1>
        <p>{{ group.description }}</p>
      </div>
    </section>

    <section class="sector-page__intro">
      <div>
        <p class="eyebrow">{{ group.title }}</p>
        <h2>Focused companies.<br />Shared momentum.</h2>
      </div>
      <p>
        Each company combines sector expertise with Alphabomet's strategic direction,
        governance framework and investment capacity to build durable value.
      </p>
    </section>

    <section class="sector-page__companies">
      <img :src="treeArt" alt="" aria-hidden="true" />
      <div class="section-heading">
        <div>
          <p class="eyebrow">Portfolio companies</p>
          <h2>Explore {{ group.title }}</h2>
        </div>
        <p>
          Discover the businesses advancing Alphabomet's ambitions in this strategic
          sector.
        </p>
      </div>

      <div class="sector-page__company-grid">
        <RouterLink
          v-for="company in group.companies"
          :key="company.slug"
          :to="`/businesses/${groupSlug}/${company.slug}`"
        >
          <div>
            <CompanyLogo
              v-if="company.logoKey"
              :logo-key="company.logoKey"
              :alt="`${company.name} logo`"
            />
            <span v-else>{{ initials(company.name) }}</span>
          </div>
          <p>{{ company.sector }}</p>
          <h3>{{ company.name }}</h3>
          <ArrowUpRight :size="19" />
        </RouterLink>
      </div>
    </section>

    <section class="page-cta">
      <p class="eyebrow">One ecosystem</p>
      <h2>Explore the complete Alphabomet portfolio.</h2>
      <RouterLink to="/businesses" class="button-gold">
        All businesses <ArrowRight :size="18" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight, ArrowUpRight, ChevronRight } from "@lucide/vue";
import CompanyLogo from "../components/shared/CompanyLogo.vue";
import { businessGroups } from "../data/siteNavigation";
import aboutImage from "../assets/slide-1.png";
import logisticsImage from "../assets/slide-2.png";
import agricultureImage from "../assets/slide-3.png";
import corporateImage from "../assets/corporate.jpg";
import globeImage from "../assets/images/globe.jpg";
import treeArt from "../assets/images/white-tree.png";

const route = useRoute();
const group = computed(() =>
  businessGroups.find((item) => item.title === route.meta.businessGroup),
);

const imageByGroup = {
  Energy: globeImage,
  Agriculture: agricultureImage,
  Infrastructure: aboutImage,
  Mining: logisticsImage,
  Logistics: logisticsImage,
  Technology: corporateImage,
  Investment: corporateImage,
  "Financial Services": corporateImage,
  Defence: corporateImage,
};

const titleByGroup = {
  Energy: "Powering resilient economies.",
  Agriculture: "Growing Africa's food future.",
  Infrastructure: "Building what progress requires.",
  Mining: "Developing resources responsibly.",
  Logistics: "Connecting markets and opportunity.",
  Technology: "Engineering a digital-first Africa.",
  Investment: "Capital for enduring enterprise.",
  "Financial Services": "Finance that broadens opportunity.",
  Defence: "Capability for a safer future.",
};

const sectorImage = computed(() => imageByGroup[group.value?.title] || aboutImage);
const heroTitle = computed(() => titleByGroup[group.value?.title] || group.value?.title);
const groupSlug = computed(() =>
  group.value?.title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
);
const initials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
</script>

<style scoped>
.sector-page__hero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: end;
  min-height: 44rem;
  padding: 10rem max(1.5rem, calc((100vw - 82rem) / 2)) 6rem;
  overflow: hidden;
  color: #f8f4ee;
}

.sector-page__hero-image {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
  transform: scale(1.01);
}

.sector-page__hero-image::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(25, 2, 3, 0.96), rgba(74, 7, 11, 0.7) 52%, rgba(0, 0, 0, 0.2)),
    linear-gradient(0deg, rgba(25, 2, 3, 0.65), transparent 55%);
  content: "";
}

.sector-page__hero-content {
  position: relative;
  z-index: 1;
  max-width: 53rem;
}

.sector-page__hero .eyebrow {
  color: #dcc190;
}

.sector-page__hero h1 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(3.5rem, 7vw, 6.8rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 0.92;
}

.sector-page__hero-content > p:last-child {
  max-width: 38rem;
  margin: 1.7rem 0 0;
  color: rgba(248, 244, 238, 0.72);
  font-size: 1rem;
  line-height: 1.75;
}

.sector-page__intro {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: clamp(3rem, 8vw, 8rem);
  width: min(100% - 3rem, 82rem);
  margin: 0 auto;
  padding: 7rem 0;
}

.sector-page h2 {
  margin: 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: clamp(2.7rem, 5vw, 4.7rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}

.sector-page__intro > p {
  align-self: end;
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.85;
}

.sector-page__companies {
  position: relative;
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  overflow: hidden;
  background: var(--surface-secondary);
}

.sector-page__companies > img {
  position: absolute;
  right: -6rem;
  bottom: -8rem;
  width: min(34rem, 50vw);
  opacity: 0.045;
}

.sector-page__company-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--border-subtle);
  border-left: 1px solid var(--border-subtle);
}

.sector-page__company-grid > a {
  position: relative;
  min-height: 20rem;
  padding: 1.7rem;
  border-right: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  background: rgba(255, 255, 255, 0.35);
  transition: 220ms ease;
}

.sector-page__company-grid > a > div {
  display: grid;
  height: 8rem;
  place-items: center;
  padding: 1rem;
  background: var(--logo-surface);
}

.sector-page__company-grid img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.sector-page__company-grid > a > div span {
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
}

.sector-page__company-grid p {
  margin: 1.5rem 0 0;
  color: rgba(128, 20, 24, 0.6);
  font-size: 0.57rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.sector-page__company-grid h3 {
  margin: 0.55rem 0 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: 1.7rem;
}

.sector-page__company-grid > a > svg {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  color: var(--heading-color);
}

.sector-page__company-grid > a:hover {
  z-index: 1;
  background: var(--surface-primary);
  box-shadow: 0 1.5rem 3rem rgba(74, 7, 11, 0.14);
  transform: translateY(-0.3rem);
}

@media (max-width: 760px) {
  .sector-page__hero { min-height: 39rem; padding: 8.5rem 1.25rem 4.5rem; }
  .sector-page__intro { grid-template-columns: 1fr; gap: 2rem; width: calc(100% - 2.5rem); padding: 5rem 0; }
  .sector-page__companies { padding: 5rem 1.25rem; }
  .sector-page__company-grid { grid-template-columns: 1fr; }
  .sector-page__company-grid > a { min-height: 18rem; }
}
</style>
