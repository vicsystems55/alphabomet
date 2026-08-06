<template>
  <div>
    <PageHero
      eyebrow="Our Businesses"
      title="One ecosystem. Many engines of growth."
      summary="From energy and infrastructure to technology and trade, our companies address the essential needs of growing economies."
      index="02"
    />

    <section class="businesses-intro">
      <div>
        <p class="eyebrow">The Alphabomet ecosystem</p>
        <h2>Built independently.<br />Stronger together.</h2>
      </div>
      <div>
        <p>
          Each Alphabomet company has the focus and autonomy to lead its market, supported
          by group-wide capital, governance, talent and strategic capabilities.
        </p>
        <RouterLink to="/businesses/explore-our-ecosystem">
          Explore our operating model <ArrowRight :size="18" />
        </RouterLink>
      </div>
    </section>

    <section class="business-sector-list">
      <RouterLink
        v-for="(group, index) in businessGroups"
        :key="group.title"
        :to="`/businesses/${slugify(group.title)}`"
        class="business-sector"
      >
        <span class="business-sector__number">0{{ index + 1 }}</span>
        <div class="business-sector__main">
          <component :is="icons[index]" :size="27" stroke-width="1.4" />
          <div>
            <h2>{{ group.title }}</h2>
            <p>{{ group.description }}</p>
          </div>
        </div>
        <div class="business-sector__companies">
          <span v-for="company in group.companies" :key="company.slug">
            {{ company.navigationName }}
          </span>
        </div>
        <ArrowUpRight class="business-sector__arrow" :size="24" />
      </RouterLink>
    </section>

    <section class="company-directory">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Portfolio companies</p>
          <h2>Meet the enterprises<br />in our ecosystem.</h2>
        </div>
        <p>
          A diversified portfolio united by shared governance, operating discipline
          and the ambition to build lasting value.
        </p>
      </div>

      <div class="company-directory__grid">
        <RouterLink
          v-for="company in companyProfiles"
          :key="company.slug"
          :to="companyPath(company)"
          class="company-directory__card"
        >
          <div class="company-directory__logo">
            <img v-if="company.logo" :src="company.logo" :alt="`${company.name} logo`" />
            <span v-else>{{ companyInitials(company.name) }}</span>
          </div>
          <div>
            <p>{{ company.sector }}</p>
            <h3>{{ company.name }}</h3>
          </div>
          <ArrowUpRight :size="18" />
        </RouterLink>
      </div>
    </section>

    <section class="page-cta">
      <p class="eyebrow">The full portfolio</p>
      <h2>Discover every company in the Alphabomet group.</h2>
      <RouterLink to="/businesses/all-companies" class="button-gold">
        View all companies <ArrowRight :size="18" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Factory,
  Gem,
  Landmark,
  Leaf,
  ShieldCheck,
  Truck,
  WalletCards,
  Zap,
} from "@lucide/vue";
import PageHero from "../components/shared/PageHero.vue";
import { businessGroups } from "../data/siteNavigation";
import { companyProfiles } from "../data/companyProfiles";

const icons = [Zap, Leaf, Factory, Gem, Truck, Cpu, Landmark, WalletCards, ShieldCheck];
const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const companyPath = (company) =>
  `/businesses/${slugify(company.group)}/${company.slug}`;
const companyInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
</script>
