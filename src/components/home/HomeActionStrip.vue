<template>
  <section class="home-actions">
    <RouterLink v-for="item in items" :key="item.title" :to="item.path">
      <component :is="item.icon" :size="35" stroke-width="1.25" />
      <div>
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <span>{{ item.label }} <ArrowRight :size="13" /></span>
      </div>
    </RouterLink>
  </section>
</template>

<script setup>
import { ArrowRight, Handshake, Newspaper, TrendingUp } from "@lucide/vue";

const items = [
  {
    icon: Newspaper,
    title: "Latest insights",
    description: "Follow Group updates, strategic perspectives and portfolio milestones.",
    label: "Explore insights",
    path: "/insights",
  },
  {
    icon: Handshake,
    title: "Partner with us",
    description: "Build high-impact enterprises and create lasting value alongside Alphabomet.",
    label: "Explore opportunities",
    path: "/contact/partner-with-us",
  },
  {
    icon: TrendingUp,
    title: "Investor relations",
    description: "Discover our portfolio, growth framework and investment approach.",
    label: "Visit investor centre",
    path: "/investors",
  },
];
</script>

<style scoped>
.home-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 max(1.5rem, calc((100vw - 82rem) / 2)) 5.5rem;
  background: #080707;
  color: #f8f4ee;
}

.home-actions > a {
  display: flex;
  gap: 1.3rem;
  min-height: 10rem;
  padding: 2rem;
  border-right: 1px solid rgba(220, 193, 144, 0.13);
  background: linear-gradient(135deg, #5a0a0e, #280507);
  transition: 220ms ease;
}

.home-actions > a:last-child {
  border-right: 0;
}

.home-actions > a:hover {
  background: linear-gradient(135deg, #751117, #360609);
}

.home-actions > a > svg {
  flex: none;
  color: #dcc190;
}

.home-actions h2 {
  margin: 0;
  color: #dcc190;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
}

.home-actions p {
  max-width: 17rem;
  margin: 0.55rem 0 0;
  color: rgba(248, 244, 238, 0.58);
  font-size: 0.67rem;
  line-height: 1.55;
}

.home-actions span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.7rem;
  color: #dcc190;
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
}

@media (max-width: 800px) {
  .home-actions { grid-template-columns: 1fr; padding-bottom: 4rem; }
  .home-actions > a { border-right: 0; border-bottom: 1px solid rgba(220, 193, 144, 0.13); }
}
</style>
