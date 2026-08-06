<template>
  <div v-if="company" class="company-profile">
    <section class="company-profile__hero">
      <div
        class="company-profile__hero-background"
        :style="{ backgroundImage: `url(${heroImage})` }"
        aria-hidden="true"
      ></div>
      <div class="company-profile__hero-overlay" aria-hidden="true"></div>
      <div class="company-profile__pattern" aria-hidden="true"></div>
      <img :src="treeArt" class="company-profile__tree" alt="" aria-hidden="true" />
      <div class="company-profile__hero-inner">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <RouterLink to="/">Home</RouterLink>
          <ChevronRight :size="14" />
          <RouterLink to="/businesses">Our Businesses</RouterLink>
          <ChevronRight :size="14" />
          <span>{{ company.name }}</span>
        </nav>

        <div class="company-profile__brand">
          <div class="company-profile__logo">
            <img v-if="company.logo" :src="company.logo" :alt="`${company.name} logo`" />
            <span v-else>{{ initials }}</span>
          </div>
          <div>
            <p class="eyebrow">{{ company.sector }}</p>
            <h1>{{ company.name }}</h1>
            <p v-if="company.abbreviation" class="company-profile__abbreviation">
              {{ company.abbreviation }}
            </p>
          </div>
        </div>

        <p class="company-profile__lead">{{ company.overview }}</p>
        <div class="company-profile__facts">
          <div v-if="company.strategicRole">
            <span>Strategic role</span>
            <strong>{{ company.strategicRole }}</strong>
          </div>
          <div v-if="company.focus">
            <span>Market focus</span>
            <strong>{{ company.focus }}</strong>
          </div>
          <div>
            <span>Business unit</span>
            <strong>{{ company.group }}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="company-profile__overview">
      <div>
        <p class="eyebrow">Company overview</p>
        <h2>Focused expertise.<br />Group-wide strength.</h2>
      </div>
      <div class="company-profile__copy">
        <p>
          {{ company.name }} operates independently within the Alphabomet portfolio,
          supported by the Group's strategic direction, governance framework and
          investment capacity.
        </p>
        <RouterLink :to="`/businesses/${groupSlug}`">
          Explore {{ company.group }} <ArrowRight :size="18" />
        </RouterLink>
      </div>
    </section>

    <section class="company-profile__capabilities">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Core capabilities</p>
          <h2>What we do</h2>
        </div>
        <p>
          Building practical solutions for governments, industries, businesses and
          communities across Africa and strategic international markets.
        </p>
      </div>

      <div class="company-profile__capability-grid">
        <article v-for="(capability, index) in company.capabilities" :key="capability">
          <span>0{{ index + 1 }}</span>
          <h3>{{ capability }}</h3>
        </article>
      </div>
    </section>

    <section class="page-cta">
      <p class="eyebrow">Part of Alphabomet Holdings</p>
      <h2>Building enterprises that power economies.</h2>
      <RouterLink to="/contact/partner-with-us" class="button-gold">
        Partner with us <ArrowRight :size="18" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight, ChevronRight } from "@lucide/vue";
import { companyBySlug } from "../data/companyProfiles";
import buildingImage from "../assets/images/building.jpg";
import officeImage from "../assets/images/office.jpg";
import treeArt from "../assets/images/white-tree.png";

const route = useRoute();
const company = computed(() => companyBySlug[route.meta.companySlug]);
const initials = computed(() =>
  company.value?.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join(""),
);
const groupSlug = computed(() =>
  company.value?.group
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
);
const officeLedGroups = ["Technology", "Financial Services", "Investment"];
const heroImage = computed(() =>
  officeLedGroups.includes(company.value?.group) ? officeImage : buildingImage,
);
</script>
