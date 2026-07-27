<template>
  <section class="home-impact">
    <img :src="treeArt" class="home-impact__tree" alt="" aria-hidden="true" />
    <div class="home-impact__intro" data-home-reveal="left">
      <p class="home-impact__kicker">Our impact</p>
      <h2>Creating Value.<br /><span>Transforming Lives.</span></h2>
      <p>
        Our companies advance industrial development, energy and food security,
        digital transformation, infrastructure and financial inclusion.
      </p>
      <RouterLink to="/impact">
        Learn more about our impact <ArrowRight :size="15" />
      </RouterLink>
    </div>

    <div class="home-impact__metrics">
      <article
        v-for="(metric, index) in metrics"
        :key="metric.value"
        data-home-reveal="card"
        :style="{ '--reveal-order': index }"
      >
        <component :is="metric.icon" :size="30" stroke-width="1.35" />
        <strong>{{ metric.value }}</strong>
        <p>{{ metric.label }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, Building2, Layers3, Leaf, Map } from "@lucide/vue";
import treeArt from "../../assets/images/white-tree.png";

const metrics = [
  { icon: Building2, value: "16", label: "Portfolio companies" },
  { icon: Layers3, value: "8", label: "Strategic operating groups" },
  { icon: Map, value: "Africa", label: "Continental ambition" },
  { icon: Leaf, value: "ESG", label: "Responsible growth leadership" },
];
</script>

<style scoped>
.home-impact {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 2fr;
  gap: 2.5rem;
  padding: 5.5rem max(1.5rem, calc((100vw - 82rem) / 2));
  overflow: hidden;
  background:
    radial-gradient(circle at 95% 50%, rgba(220, 193, 144, 0.11), transparent 28%),
    linear-gradient(115deg, #130202, #260406 55%, #120d0d);
  color: #f8f4ee;
}

.home-impact__tree {
  position: absolute;
  right: -5rem;
  bottom: -8rem;
  width: min(34rem, 48vw);
  opacity: 0.04;
  pointer-events: none;
}

.home-impact__intro,
.home-impact__metrics {
  position: relative;
  z-index: 1;
}

.home-impact__kicker {
  margin: 0 0 0.8rem;
  color: #dcc190;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.home-impact h2 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 4vw, 3.8rem);
  font-weight: 500;
  line-height: 0.98;
}

.home-impact h2 span {
  color: #dcc190;
}

.home-impact__intro > p:not(.home-impact__kicker) {
  max-width: 28rem;
  margin: 1.25rem 0 0;
  color: rgba(248, 244, 238, 0.62);
  font-size: 0.78rem;
  line-height: 1.75;
}

.home-impact__intro > a {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(220, 193, 144, 0.55);
  color: #dcc190;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
}

.home-impact__metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-self: center;
  border-top: 1px solid rgba(220, 193, 144, 0.13);
  border-left: 1px solid rgba(220, 193, 144, 0.13);
}

.home-impact__metrics article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 13rem;
  padding: 1.5rem;
  border-right: 1px solid rgba(220, 193, 144, 0.13);
  border-bottom: 1px solid rgba(220, 193, 144, 0.13);
  background: rgba(255, 255, 255, 0.018);
}

.home-impact__metrics svg {
  margin-bottom: 1.6rem;
  color: #dcc190;
}

.home-impact__metrics strong {
  color: #dcc190;
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 2.5vw, 2.45rem);
  font-weight: 500;
  line-height: 1;
}

.home-impact__metrics p {
  max-width: 8rem;
  margin: 0.65rem 0 0;
  color: rgba(248, 244, 238, 0.58);
  font-size: 0.65rem;
  line-height: 1.5;
}

@media (max-width: 950px) {
  .home-impact { grid-template-columns: 1fr; }
}

@media (max-width: 650px) {
  .home-impact { padding-top: 5rem; padding-bottom: 5rem; }
  .home-impact__metrics { grid-template-columns: repeat(2, 1fr); }
  .home-impact__metrics article { min-height: 11rem; }
}
</style>
