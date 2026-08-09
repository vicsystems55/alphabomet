<template>
  <div v-if="page" class="about-detail">
    <PageHero
      :eyebrow="page.eyebrow"
      :title="page.title"
      :summary="page.summary"
      index="01"
      :image="aboutImage"
    />

    <section v-if="page.statements" class="about-detail__statements">
      <article v-for="(statement, index) in page.statements" :key="statement.label">
        <span>0{{ index + 1 }}</span>
        <p class="eyebrow">{{ statement.label }}</p>
        <h2>{{ statement.text }}</h2>
      </article>
    </section>

    <section v-if="page.strategy" class="about-detail__strategy">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Growth framework</p>
          <h2>Consolidate. Expand. Mature.</h2>
        </div>
        <p>A phased approach to building globally competitive enterprises.</p>
      </div>
      <div class="about-detail__strategy-grid">
        <article v-for="(phase, index) in page.strategy" :key="phase.title">
          <span>0{{ index + 1 }}</span>
          <h3>{{ phase.title }}</h3>
          <p>{{ phase.description }}</p>
        </article>
      </div>
    </section>

    <section v-if="page.items" class="about-detail__values">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Shared principles</p>
          <h2>Values in practice.</h2>
        </div>
        <p>One culture connecting every company in the Alphabomet ecosystem.</p>
      </div>
      <div class="about-detail__item-grid">
        <article v-for="(item, index) in page.items" :key="item">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <h3>{{ item }}</h3>
        </article>
      </div>
    </section>

    <template v-for="(section, index) in page.sections" :key="section.label">
      <section class="about-detail__section" :class="{ 'about-detail__section--dark': index % 2 }">
        <img v-if="index % 2" :src="treeArt" alt="" aria-hidden="true" />
        <div class="about-detail__section-heading">
          <p class="eyebrow">{{ section.label }}</p>
          <h2>{{ section.title }}</h2>
        </div>

        <div v-if="section.paragraphs" class="about-detail__prose">
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </div>

        <div v-if="section.facts" class="about-detail__facts">
          <article v-for="fact in section.facts" :key="fact[0]">
            <span>{{ fact[0] }}</span>
            <strong>{{ fact[1] }}</strong>
          </article>
        </div>

        <div v-if="section.items" class="about-detail__item-grid about-detail__item-grid--section">
          <article v-for="(item, itemIndex) in section.items" :key="item">
            <span>{{ String(itemIndex + 1).padStart(2, "0") }}</span>
            <h3>{{ item }}</h3>
          </article>
        </div>
      </section>
    </template>

    <section class="page-cta">
      <p class="eyebrow">Alphabomet Holdings</p>
      <h2>Building sustainable businesses. Transforming Africa.</h2>
      <RouterLink to="/businesses" class="button-gold">
        Explore our businesses <ArrowRight :size="18" />
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight } from "@lucide/vue";
import PageHero from "../components/shared/PageHero.vue";
import { aboutPages } from "../data/aboutContent";
import aboutImage from "../assets/slide-1.png";
import treeArt from "../assets/images/white-tree.png";

const route = useRoute();
const page = computed(() => aboutPages[route.meta.aboutPage]);
</script>

<style scoped>
.about-detail h2 {
  margin: 0;
  color: var(--heading-color);
  font-family: var(--font-heading);
  font-size: clamp(2.6rem, 5vw, 4.7rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}

.about-detail__statements {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--wine-deep);
  color: var(--cream);
}

.about-detail__statements article {
  position: relative;
  min-height: 35rem;
  padding: 6rem max(2rem, calc((100vw - 82rem) / 2));
  overflow: hidden;
  border-right: 1px solid rgba(220, 193, 144, 0.16);
}

.about-detail__statements article:last-child { border-right: 0; }
.about-detail__statements .eyebrow { color: var(--gold); }
.about-detail__statements h2 { max-width: 37rem; color: var(--cream); font-size: clamp(2.3rem, 3.7vw, 3.5rem); }
.about-detail__statements article > span { position: absolute; right: 2rem; bottom: -3rem; color: rgba(220,193,144,.06); font-family: var(--font-heading); font-size: 14rem; }

.about-detail__strategy,
.about-detail__values {
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  background: var(--surface-secondary);
}

.about-detail__strategy-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--border-subtle);
  border-left: 1px solid var(--border-subtle);
}

.about-detail__strategy-grid article,
.about-detail__item-grid article {
  min-height: 15rem;
  padding: 1.7rem;
  border-right: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.about-detail__strategy-grid span,
.about-detail__item-grid span { color: rgba(128,20,24,.48); font-size: .6rem; font-weight: 700; }
.about-detail__strategy-grid h3,
.about-detail__item-grid h3 { margin: 4rem 0 0; color: var(--heading-color); font-family: var(--font-heading); font-size: 1.75rem; line-height: 1.1; }
.about-detail__strategy-grid p { color: var(--text-secondary); font-size: .78rem; line-height: 1.7; }

.about-detail__item-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid var(--border-subtle);
  border-left: 1px solid var(--border-subtle);
}

.about-detail__item-grid article { min-height: 10.5rem; }
.about-detail__item-grid h3 { margin-top: 3rem; font-size: 1.3rem; }

.about-detail__section {
  position: relative;
  display: grid;
  grid-template-columns: .9fr 1.1fr;
  gap: clamp(3rem, 8vw, 8rem);
  padding: 7rem max(1.5rem, calc((100vw - 82rem) / 2));
  overflow: hidden;
  background: var(--surface-primary);
}

.about-detail__section--dark { background: var(--wine-deep); color: var(--cream); }
.about-detail__section--dark > img { position: absolute; right: -5rem; bottom: -8rem; width: min(34rem, 46vw); opacity: .045; }
.about-detail__section--dark .eyebrow { color: var(--gold); }
.about-detail__section--dark h2 { color: var(--cream); }

.about-detail__section-heading,
.about-detail__prose,
.about-detail__facts,
.about-detail__item-grid--section { position: relative; z-index: 1; }

.about-detail__prose { align-self: end; }
.about-detail__prose p { margin: 0; color: var(--text-secondary); line-height: 1.85; }
.about-detail__prose p + p { margin-top: 1.2rem; }
.about-detail__section--dark .about-detail__prose p { color: rgba(248,244,238,.68); }

.about-detail__facts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid var(--border-subtle);
  border-left: 1px solid var(--border-subtle);
}

.about-detail__facts article { min-height: 8rem; padding: 1.3rem; border-right: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); }
.about-detail__facts span,
.about-detail__facts strong { display: block; }
.about-detail__facts span { color: rgba(128,20,24,.58); font-size: .56rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.about-detail__facts strong { margin-top: 1rem; color: var(--heading-color); font-family: var(--font-heading); font-size: 1.2rem; }

.about-detail__item-grid--section { grid-column: 1 / -1; grid-template-columns: repeat(3, 1fr); }
.about-detail__section--dark .about-detail__item-grid { border-color: rgba(220,193,144,.18); }
.about-detail__section--dark .about-detail__item-grid article { border-color: rgba(220,193,144,.18); }
.about-detail__section--dark .about-detail__item-grid span { color: rgba(220,193,144,.6); }
.about-detail__section--dark .about-detail__item-grid h3 { color: var(--gold); }

@media (max-width: 760px) {
  .about-detail__statements,
  .about-detail__section { grid-template-columns: 1fr; }
  .about-detail__statements article { min-height: 28rem; padding: 4.5rem 1.25rem; border-right: 0; border-bottom: 1px solid rgba(220,193,144,.16); }
  .about-detail__strategy,
  .about-detail__values,
  .about-detail__section { padding: 5rem 1.25rem; }
  .about-detail__strategy-grid,
  .about-detail__item-grid,
  .about-detail__facts { grid-template-columns: 1fr; }
  .about-detail__item-grid--section { grid-column: auto; }
}
</style>
