<template>
  <section class="home-ecosystem">
    <div class="home-ecosystem__heading" data-home-reveal="left">
      <div>
        <p class="home-section-kicker">Our ecosystem</p>
        <h2>A Diverse Portfolio. <span>One Unified Vision.</span></h2>
      </div>
      <RouterLink to="/businesses">
        View all companies <ArrowRight :size="16" />
      </RouterLink>
    </div>

    <div class="home-ecosystem__filters" data-home-reveal aria-label="Filter portfolio companies">
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        :class="{ active: activeFilter === filter }"
        @click="activeFilter = filter"
      >
        {{ filter }}
      </button>
    </div>

    <TransitionGroup
      name="portfolio"
      tag="div"
      class="home-ecosystem__grid"
      data-home-reveal="card"
    >
      <RouterLink
        v-for="company in visibleCompanies"
        :key="company.slug"
        :to="companyPath(company)"
        class="home-company-card"
      >
        <div class="home-company-card__logo">
          <img v-if="company.logo" :src="company.logo" :alt="`${company.name} logo`" />
          <span v-else>{{ initials(company.name) }}</span>
        </div>
        <div class="home-company-card__footer">
          <p>{{ company.group }}</p>
          <span><ArrowUpRight :size="13" /></span>
        </div>
      </RouterLink>
    </TransitionGroup>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { ArrowRight, ArrowUpRight } from "@lucide/vue";
import { companyProfiles } from "../../data/companyProfiles";

const activeFilter = ref("All sectors");
const filters = ["All sectors", ...new Set(companyProfiles.map((company) => company.group))];
const visibleCompanies = computed(() =>
  activeFilter.value === "All sectors"
    ? companyProfiles
    : companyProfiles.filter((company) => company.group === activeFilter.value),
);

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const companyPath = (company) =>
  `/businesses/${slugify(company.group)}/${company.slug}`;
const initials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
</script>

<style scoped>
.home-ecosystem {
  margin: 0 auto;
  padding: 6.5rem max(1.5rem, calc((100vw - 82rem) / 2));
  background:
    radial-gradient(circle at 100% 0, rgba(128, 20, 24, 0.2), transparent 32%),
    #080707;
  color: #f8f4ee;
}

.home-ecosystem__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
}

.home-section-kicker {
  margin: 0 0 0.8rem;
  color: #dcc190;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.home-ecosystem h2 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(2.45rem, 4.5vw, 4rem);
  font-weight: 500;
  line-height: 1;
}

.home-ecosystem h2 span {
  color: #dcc190;
}

.home-ecosystem__heading > a {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  flex: none;
  min-height: 2.8rem;
  padding: 0 1rem;
  border: 1px solid rgba(220, 193, 144, 0.42);
  color: #dcc190;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: 200ms ease;
}

.home-ecosystem__heading > a:hover {
  background: #dcc190;
  color: #4a070b;
}

.home-ecosystem__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 2rem 0 1.4rem;
}

.home-ecosystem__filters button {
  min-height: 2rem;
  padding: 0 0.9rem;
  border: 1px solid rgba(248, 244, 238, 0.16);
  border-radius: 999px;
  background: transparent;
  color: rgba(248, 244, 238, 0.58);
  font-size: 0.58rem;
  cursor: pointer;
  transition: 180ms ease;
}

.home-ecosystem__filters button:hover,
.home-ecosystem__filters button.active {
  border-color: rgba(220, 193, 144, 0.55);
  background: rgba(128, 20, 24, 0.36);
  color: #dcc190;
}

.home-ecosystem__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.home-company-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 10.8rem;
  padding: 1rem;
  overflow: hidden;
  border: 1px solid rgba(220, 193, 144, 0.09);
  border-radius: 0.55rem;
  background:
    radial-gradient(circle at 50% 25%, rgba(128, 20, 24, 0.13), transparent 48%),
    linear-gradient(145deg, #171414, #0d0c0c);
  transition: 220ms ease;
}

.home-company-card::before {
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  transition: 200ms ease;
}

.home-company-card:hover {
  z-index: 1;
  transform: translateY(-0.25rem);
}

.home-company-card:hover::before {
  border-color: rgba(220, 193, 144, 0.38);
}

.home-company-card__logo {
  display: grid;
  flex: 1;
  place-items: center;
  padding: 0.5rem;
}

.home-company-card__logo img {
  display: block;
  max-width: 92%;
  max-height: 5.2rem;
  object-fit: contain;
  filter: drop-shadow(0 0.5rem 1rem rgba(0, 0, 0, 0.3));
}

.home-company-card__logo > span {
  color: #dcc190;
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
}

.home-company-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.home-company-card__footer p {
  margin: 0;
  color: #cda54f;
  font-size: 0.48rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.home-company-card__footer span {
  display: grid;
  width: 1.35rem;
  height: 1.35rem;
  place-items: center;
  border: 1px solid rgba(220, 193, 144, 0.42);
  border-radius: 50%;
  color: #dcc190;
}

.portfolio-enter-active,
.portfolio-leave-active {
  transition: 220ms ease;
}

.portfolio-enter-from,
.portfolio-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

@media (max-width: 1050px) {
  .home-ecosystem__grid { grid-template-columns: repeat(4, 1fr); }
}

@media (max-width: 760px) {
  .home-ecosystem { padding-top: 5rem; padding-bottom: 5rem; }
  .home-ecosystem__heading { align-items: flex-start; flex-direction: column; }
  .home-ecosystem__grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 540px) {
  .home-ecosystem__grid { grid-template-columns: repeat(2, 1fr); }
  .home-company-card { min-height: 9rem; padding: 0.75rem; }
  .home-company-card__logo img { max-height: 4.2rem; }
}
</style>
