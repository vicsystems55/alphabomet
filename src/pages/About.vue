<template>
  <div class="about-page">
    <PageHero
      eyebrow="About Alphabomet"
      title="Built for Africa. Designed for lasting value."
      summary="A diversified African holding company building, acquiring, operating and scaling high-impact businesses."
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
          Alphabomet Holdings is the strategic parent of a growing portfolio across
          energy, agriculture, infrastructure, mining, logistics, real estate,
          financial technology, artificial intelligence and enterprise innovation.
        </p>
        <p>
          Our companies operate independently while benefiting from shared direction,
          governance, investment capacity and cross-sector collaboration.
        </p>
      </div>
    </section>

    <section class="about-page__purpose">
      <img :src="treeArt" class="about-page__tree" alt="" aria-hidden="true" />
      <article>
        <span>01</span>
        <p class="eyebrow">Our vision</p>
        <h2>To become Africa's most respected and globally recognized holding company.</h2>
        <p>
          Building world-class enterprises that transform industries, empower
          communities and create sustainable economic prosperity.
        </p>
      </article>
      <article>
        <span>02</span>
        <p class="eyebrow">Our mission</p>
        <h2>Develop, invest in and manage exceptional businesses.</h2>
        <p>
          Delivering innovative solutions, operational excellence, long-term value
          creation and sustainable growth across diverse industries.
        </p>
      </article>
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
import aboutImage from "../assets/slide-1.png";
import treeArt from "../assets/images/white-tree.png";

const values = [
  "Integrity",
  "Excellence",
  "Innovation",
  "Accountability",
  "Sustainability",
  "Collaboration",
  "Customer Focus",
  "Leadership",
  "Safety",
  "Respect",
];

const strategy = [
  {
    title: "Consolidate",
    description:
      "Strengthen governance, improve operational excellence and build a resilient corporate foundation.",
  },
  {
    title: "Expand",
    description:
      "Scale high-performing subsidiaries, enter new markets and establish strategic partnerships.",
  },
  {
    title: "Mature",
    description:
      "Develop globally competitive enterprises delivering sustainable returns and long-term stakeholder value.",
  },
];

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
  color: var(--wine);
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
  color: #655a58;
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
  background: #efe7dc;
}

.about-page__value-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.about-page__value-grid article {
  min-height: 10rem;
  padding: 1.4rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.about-page__value-grid span {
  color: rgba(128, 20, 24, 0.48);
  font-size: 0.6rem;
  font-weight: 700;
}

.about-page__value-grid h3 {
  margin: 3.2rem 0 0;
  color: var(--wine);
  font-family: var(--font-heading);
  font-size: 1.35rem;
}

.about-page__strategy {
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  background: #fff;
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
  border: 1px solid var(--line);
  border-right: 0;
}

.about-page__strategy-grid article:last-child {
  border-right: 1px solid var(--line);
}

.about-page__strategy-grid span {
  color: rgba(128, 20, 24, 0.5);
  font-size: 0.62rem;
  font-weight: 700;
}

.about-page__strategy-grid h3 {
  margin: 4rem 0 0;
  color: var(--wine);
  font-family: var(--font-heading);
  font-size: 2.2rem;
}

.about-page__strategy-grid p {
  color: #6a5e5c;
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
  border: 1px solid var(--line);
  color: var(--wine);
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
  .about-page__intro,
  .about-page__pillars { width: calc(100% - 2.5rem); padding: 5rem 0; }
  .about-page__purpose article { min-height: 26rem; padding: 4rem 1.25rem; border-right: 0; border-bottom: 1px solid rgba(220, 193, 144, 0.16); }
  .about-page__value-grid { grid-template-columns: repeat(2, 1fr); }
  .about-page__strategy-grid { grid-template-columns: 1fr; }
  .about-page__strategy-grid article { min-height: 15rem; border-right: 1px solid var(--line); border-bottom: 0; }
  .about-page__strategy-grid article:last-child { border-bottom: 1px solid var(--line); }
}
</style>
