<template>
  <div class="about-page">
    <PageHero
      eyebrow="About Alphabomet"
      title="Built for Africa. Designed for lasting value."
      summary="A diversified investment holding company developing, investing in and managing businesses across the strategic sectors driving Africa's growth."
      index="01"
      :image="aboutImage"
    />

    <section class="about-page__intro">
      <div>
        <p class="eyebrow">Who we are</p>
        <h2>One group.<br />Boundless opportunity.</h2>
      </div>
      <div>
        <p>
          Alphabomet Holdings provides strategic leadership, governance, investment
          oversight, operational support and shared corporate services across a
          growing portfolio of subsidiaries.
        </p>
        <p>
          Through disciplined capital allocation and long-term planning, we build
          resilient businesses capable of competing in regional and international
          markets. Each subsidiary operates independently while benefiting from the
          Group's collaborative ecosystem.
        </p>
      </div>
    </section>

    <section class="about-page__purpose">
      <img :src="treeArt" class="about-page__tree" alt="" aria-hidden="true" />
      <article>
        <span>01</span>
        <p class="eyebrow">Our vision</p>
        <h2>To become Africa's leading diversified investment holding company.</h2>
        <p>
          Recognized globally for innovation, sustainable growth, operational
          excellence and transformational impact across strategic industries.
        </p>
      </article>
      <article>
        <span>02</span>
        <p class="eyebrow">Our mission</p>
        <h2>Build, invest in and grow world-class businesses.</h2>
        <p>
          Creating sustainable shareholder value, empowering communities,
          strengthening economies and addressing Africa's most pressing challenges.
        </p>
      </article>
    </section>

    <section class="about-page__philosophy">
      <img :src="treeArt" alt="" aria-hidden="true" />
      <div>
        <p class="eyebrow">Corporate philosophy</p>
        <h2>Prosperity through responsible investment and ethical leadership.</h2>
      </div>
      <p>
        We develop businesses that generate financial returns while contributing
        positively to society, protecting the environment and inspiring future
        generations. Innovation, disciplined execution and sustainability guide the
        way we create value.
      </p>
    </section>

    <section class="about-page__values">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Our values</p>
          <h2>The principles behind every decision.</h2>
        </div>
        <p>
          A common culture connects our people and companies while guiding how we
          build, partner and lead.
        </p>
      </div>
      <div class="about-page__value-grid">
        <article v-for="(value, index) in values" :key="value">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <h3>{{ value }}</h3>
        </article>
      </div>
    </section>

    <section class="about-page__strategy">
      <div class="about-page__strategy-heading">
        <p class="eyebrow">Group strategy</p>
        <h2>Consolidate. Expand. Mature.</h2>
      </div>
      <div class="about-page__strategy-grid">
        <article v-for="(phase, index) in strategy" :key="phase.title">
          <span>0{{ index + 1 }}</span>
          <h3>{{ phase.title }}</h3>
          <p>{{ phase.description }}</p>
        </article>
      </div>
    </section>

    <section class="about-page__pillars">
      <div>
        <p class="eyebrow">Strategic pillars</p>
        <h2>How we build enduring enterprises.</h2>
      </div>
      <div>
        <span v-for="pillar in pillars" :key="pillar">{{ pillar }}</span>
      </div>
    </section>

    <section class="page-cta">
      <p class="eyebrow">Our ecosystem</p>
      <h2>Explore the companies turning our ambition into action.</h2>
      <RouterLink to="/businesses" class="button-gold">
        Our businesses <ArrowRight :size="18" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight } from "@lucide/vue";
import PageHero from "../components/shared/PageHero.vue";
import { aboutValues as values, groupStrategy as strategy } from "../data/aboutContent";
import aboutImage from "../assets/slide-1.png";
import treeArt from "../assets/images/white-tree.png";

const pillars = [
  "Diversified Investments",
  "Innovation & Technology",
  "Sustainable Growth",
  "Infrastructure Development",
  "Operational Excellence",
  "Corporate Governance",
  "Strategic Partnerships",
  "Human Capital Development",
  "Digital Transformation",
  "ESG Leadership",
];
</script>

<style scoped>
.about-page__intro,
.about-page__pillars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem, 8vw, 8rem);
  width: min(100% - 3rem, 82rem);
  margin: 0 auto;
  padding: 7rem 0;
}

.about-page h2 {
  margin: 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: clamp(2.7rem, 5vw, 4.7rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}

.about-page__intro > div:last-child {
  align-self: end;
}

.about-page__intro > div:last-child p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.85;
}

.about-page__intro > div:last-child p + p {
  margin-top: 1.2rem;
}

.about-page__purpose {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--wine-deep);
  color: var(--cream);
}

.about-page__tree {
  position: absolute;
  right: -3rem;
  bottom: -5rem;
  z-index: 0;
  width: min(30rem, 45vw);
  opacity: 0.045;
  pointer-events: none;
}

.about-page__purpose article {
  z-index: 1;
}

.about-page__purpose article {
  position: relative;
  min-height: 32rem;
  padding: 5rem max(2rem, calc((100vw - 82rem) / 2));
  overflow: hidden;
  border-right: 1px solid rgba(220, 193, 144, 0.16);
}

.about-page__purpose article:last-child {
  border-right: 0;
}

.about-page__purpose article > span {
  position: absolute;
  right: 2rem;
  bottom: -4rem;
  color: rgba(220, 193, 144, 0.07);
  font-family: var(--font-heading);
  font-size: 16rem;
}

.about-page__purpose .eyebrow {
  color: var(--gold);
}

.about-page__purpose h2 {
  max-width: 32rem;
  color: var(--cream);
  font-size: clamp(2.4rem, 4vw, 3.8rem);
}

.about-page__purpose article > p:last-child {
  max-width: 30rem;
  margin-top: 1.5rem;
  color: rgba(248, 244, 238, 0.65);
  line-height: 1.8;
}

.about-page__values {
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  background: var(--surface-secondary);
}

.about-page__philosophy {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: clamp(3rem, 8vw, 8rem);
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  overflow: hidden;
  background: var(--wine-deep);
  color: var(--cream);
}

.about-page__philosophy > img {
  position: absolute;
  right: -6rem;
  bottom: -9rem;
  width: min(34rem, 48vw);
  opacity: .05;
}

.about-page__philosophy > div,
.about-page__philosophy > p { position: relative; z-index: 1; }
.about-page__philosophy .eyebrow { color: var(--gold); }
.about-page__philosophy h2 { color: var(--cream); }
.about-page__philosophy > p { align-self: end; margin: 0; color: rgba(248,244,238,.68); line-height: 1.85; }

.about-page__value-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid var(--border-subtle);
  border-left: 1px solid var(--border-subtle);
}

.about-page__value-grid article {
  min-height: 10rem;
  padding: 1.4rem;
  border-right: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.about-page__value-grid span {
  color: rgba(128, 20, 24, 0.48);
  font-size: 0.6rem;
  font-weight: 700;
}

.about-page__value-grid h3 {
  margin: 3.2rem 0 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: 1.35rem;
}

.about-page__strategy {
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  background: var(--surface-primary);
}

.about-page__strategy-heading {
  margin-bottom: 3.5rem;
}

.about-page__strategy-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.about-page__strategy-grid article {
  min-height: 19rem;
  padding: 2rem;
  border: 1px solid var(--border-subtle);
  border-right: 0;
}

.about-page__strategy-grid article:last-child {
  border-right: 1px solid var(--border-subtle);
}

.about-page__strategy-grid span {
  color: rgba(128, 20, 24, 0.5);
  font-size: 0.62rem;
  font-weight: 700;
}

.about-page__strategy-grid h3 {
  margin: 4rem 0 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: 2.2rem;
}

.about-page__strategy-grid p {
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.7;
}

.about-page__pillars > div:last-child {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-content: center;
}

.about-page__pillars > div:last-child span {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-subtle);
  color: var(--heading-color);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

@media (max-width: 760px) {
  .about-page__intro,
  .about-page__pillars,
  .about-page__purpose {
    grid-template-columns: 1fr;
  }
  .about-page__philosophy { grid-template-columns: 1fr; padding: 5rem 1.25rem; }
  .about-page__intro,
  .about-page__pillars { width: calc(100% - 2.5rem); padding: 5rem 0; }
  .about-page__purpose article { min-height: 26rem; padding: 4rem 1.25rem; border-right: 0; border-bottom: 1px solid rgba(220, 193, 144, 0.16); }
  .about-page__value-grid { grid-template-columns: repeat(2, 1fr); }
  .about-page__strategy-grid { grid-template-columns: 1fr; }
  .about-page__strategy-grid article { min-height: 15rem; border-right: 1px solid var(--border-subtle); border-bottom: 0; }
  .about-page__strategy-grid article:last-child { border-bottom: 1px solid var(--border-subtle); }
}
</style>
